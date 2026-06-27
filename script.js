/* ==========================================
   PROJECT BOUTTA
   VERSION 2
========================================== */

/* ==========================================
   DOM
========================================== */

const screens = document.querySelectorAll(".screen");

const lockScreen = document.getElementById("lock-screen");
const faceScreen = document.getElementById("face-screen");
const helloScreen = document.getElementById("hello-screen");
const questionScreen = document.getElementById("question-screen");
const timerScreen = document.getElementById("timer-screen");
const memoryScreen = document.getElementById("memory-screen");
const envelopeScreen = document.getElementById("envelope-screen");
const dateScreen = document.getElementById("date-screen");
const notificationScreen = document.getElementById("notification-screen");

const timeElement = document.getElementById("time");
const dateElement = document.getElementById("date");

const faceStatus = document.getElementById("face-status");
const identityConfirmed = document.getElementById("identity-confirmed");
const helloMessage = document.getElementById("hello-message");

const relationshipTimer = document.getElementById("relationship-timer");

/* ==========================================
   STATE
========================================== */

let startY = 0;

/* ==========================================
   HELPERS
========================================== */

function showScreen(screen) {
  screens.forEach((s) => {
    s.classList.remove("active");
  });

  screen.classList.add("active");
}

/* ==========================================
   LOCK CLOCK
========================================== */

function updateClock() {
  const now = new Date();

  timeElement.textContent = now
    .toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
    })
    .replace(" AM", "")
    .replace(" PM", "");

  dateElement.textContent = now.toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
  });
}

updateClock();

setInterval(updateClock, 1000);
/* ==========================================
   SWIPE TO UNLOCK
========================================== */

lockScreen.addEventListener("touchstart", (e) => {
  startY = e.touches[0].clientY;
});

lockScreen.addEventListener("touchend", (e) => {
  const endY = e.changedTouches[0].clientY;

  const distance = startY - endY;

  if (distance < 80) return;

  startFaceID();
});

/* ==========================================
   FACE ID FLOW
========================================== */

function startFaceID() {
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
  }, 3600);

  setTimeout(() => {
    startMemoryOne();
  }, 5600);
}
/* ==========================================
   MEMORY #1
========================================== */

const questionTitle = document.getElementById("question-title");
const questionSubtitle = document.getElementById("question-subtitle");
const questionContent = document.getElementById("question-content");
const continueBtn = document.getElementById("continue-btn");

let selectedAnswer = null;

function startMemoryOne() {
  showScreen(questionScreen);

  questionTitle.textContent = "What is your name?";

  questionSubtitle.textContent = "Choose one answer.";

  continueBtn.style.display = "block";

  continueBtn.disabled = true;

  const options = [
    "Shahd",

    "Debbo",

    "Boutta",

    "Dabdooba",

    "Batates",

    "Dabadeebo",

    "All of the above ❤️",
  ];

  questionContent.innerHTML = "";

  options.forEach((option) => {
    const item = document.createElement("div");

    item.className = "choice";

    item.textContent = option;

    item.addEventListener("click", () => {
      document.querySelectorAll(".choice").forEach((choice) => {
        choice.classList.remove("selected");
      });

      item.classList.add("selected");

      selectedAnswer = option;

      continueBtn.disabled = false;
    });

    questionContent.appendChild(item);
  });
}

continueBtn.onclick = () => {
  if (!selectedAnswer) return;

  if (document.getElementById("memory-number").textContent.includes("#1")) {
    showMemoryMessage(
      "😂❤️",
      "Exactly!",
      "You are all of them.",
      startRelationshipTimer,
    );

    return;
  }

  if (document.getElementById("memory-number").textContent.includes("#3")) {
    if (selectedAnswer !== "Thursday") {
      showMemoryMessage("🤭", "Almost...", "The correct answer is Thursday ❤️");

      return;
    }

    startMeetingDate();
  }
};

/* ==========================================
   MEMORY MESSAGE
========================================== */

function showMemoryMessage(emoji, title, message, nextAction = null) {
  showScreen(memoryScreen);

  document.getElementById("memory-title").textContent = "Memory ❤️";

  document.getElementById("memory-heading").textContent = title;

  document.getElementById("memory-content").innerHTML = `
        <div style="text-align:center;padding:20px 0;">
            <div style="font-size:56px;margin-bottom:16px;">
                ${emoji}
            </div>

            <p style="font-size:22px;color:white;">
                ${message}
            </p>
        </div>
    `;

  memoryNext.onclick = () => {
    if (nextAction) {
      nextAction();
    }
  };
}

const memoryNext = document.getElementById("memory-next");

memoryNext.onclick = null;
/* ==========================================
   RELATIONSHIP TIMER
========================================== */

const firstMeeting = new Date("2025-11-06T14:00:00");

function startRelationshipTimer() {
  showScreen(timerScreen);

  updateRelationshipTimer();

  clearInterval(window.relationshipInterval);

  window.relationshipInterval = setInterval(updateRelationshipTimer, 1000);
}

function updateRelationshipTimer() {
  const now = new Date();

  const diff = now - firstMeeting;

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));

  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);

  const minutes = Math.floor((diff / (1000 * 60)) % 60);

  const seconds = Math.floor((diff / 1000) % 60);

  relationshipTimer.innerHTML = `
        ${days} Days<br>
        ${hours} Hours<br>
        ${minutes} Minutes<br>
        ${seconds} Seconds
    `;
}

document.getElementById("timer-next").addEventListener("click", () => {
  clearInterval(window.relationshipInterval);

  // هنبدأ Memory #3 هنا
  startMemoryThree();
});
/* ==========================================
   MEMORY #3
========================================== */

function startMemoryThree() {
  showScreen(questionScreen);

  document.getElementById("memory-number").textContent = "Memory #3 ❤️";

  questionTitle.textContent = "Do you remember our first meeting? 🥹";

  questionSubtitle.textContent = "Choose the day.";

  continueBtn.disabled = true;

  continueBtn.style.display = "block";

  selectedAnswer = null;

  const days = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];

  questionContent.innerHTML = "";

  days.forEach((day) => {
    const item = document.createElement("div");

    item.className = "choice";

    item.textContent = day;

    item.onclick = () => {
      document
        .querySelectorAll(".choice")
        .forEach((c) => c.classList.remove("selected"));

      item.classList.add("selected");

      selectedAnswer = day;

      continueBtn.disabled = false;
    };

    questionContent.appendChild(item);
  });
}
function startMeetingDate() {
  showMemoryMessage(
    "🥹",

    "Exactly ❤️",

    "06 / 11 / 2025",
  );
}
