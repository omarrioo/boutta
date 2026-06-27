// =====================================
// Project Boutta
// Version 1
// =====================================

// Screens
const lockScreen = document.getElementById("lock-screen");
const faceScreen = document.getElementById("face-screen");
const helloScreen = document.getElementById("hello-screen");

// Time & Date
const timeElement = document.getElementById("time");
const dateElement = document.getElementById("date");
const faceStatus = document.getElementById("face-status");
const helloMessage = document.getElementById("hello-message");
const identityConfirmed = document.getElementById("identity-confirmed");

// -------------------------------------
// Update Lock Screen Clock
// -------------------------------------

function updateClock() {
  const now = new Date();

  const time = now.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });

  const date = now.toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
  });

  timeElement.textContent = time.replace(" AM", "").replace(" PM", "");
  dateElement.textContent = date;
}

updateClock();

setInterval(updateClock, 1000);

// -------------------------------------
// Change Screen
// -------------------------------------

function showScreen(screen) {
  document.querySelectorAll(".screen").forEach((s) => {
    s.classList.remove("active");
  });

  screen.classList.add("active");
}

// -------------------------------------
// Unlock
// -------------------------------------

let startY = 0;

lockScreen.addEventListener("touchstart", (e) => {
  startY = e.touches[0].clientY;
});

lockScreen.addEventListener("touchend", (e) => {
  const endY = e.changedTouches[0].clientY;
  const distance = startY - endY;

  if (distance < 80) return;

  showScreen(faceScreen);

  faceStatus.textContent = "Scanning...";

  setTimeout(() => {
    faceStatus.textContent = "Matching...";
  }, 1000);

  setTimeout(() => {
    showScreen(helloScreen);

    identityConfirmed.style.display = "flex";
    helloMessage.classList.remove("show");
  }, 2200);

  setTimeout(() => {
    identityConfirmed.style.display = "none";
    helloMessage.classList.add("show");
  }, 3700);
});
