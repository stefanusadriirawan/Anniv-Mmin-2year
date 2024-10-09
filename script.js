// Slideshow Functionality
let slideIndex = 0;
const slides = document.getElementsByClassName("slide");

// Function to show a specific slide
function showSlide(index) {
  if (index >= slides.length) {
    slideIndex = 0;
  } else if (index < 0) {
    slideIndex = slides.length - 1;
  } else {
    slideIndex = index;
  }

  for (let i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }
  slides[slideIndex].style.display = "block";
}

// Functions to navigate slides
function showNextSlide() {
  showSlide(slideIndex + 1);
}
function showPrevSlide() {
  showSlide(slideIndex - 1);
}

// Music Control
const music = document.getElementById("background-music");
let musicPlayed = false;

function playMusicIfNeeded() {
  if (!musicPlayed) {
    music
      .play()
      .then(() => {
        console.log("Background music is playing.");
        musicPlayed = true;
      })
      .catch((error) => {
        console.log(
          "Autoplay was prevented. Music will start on user interaction."
        );
      });
  }
}

// Instruction Overlay Control
const instructionOverlay = document.getElementById("instruction-overlay");
const closeInstruction = document.getElementById("close-instruction");

function closeOverlayAndPlayMusic() {
  instructionOverlay.style.display = "none";
  playMusicIfNeeded();
}

closeInstruction.addEventListener("click", () => {
  closeOverlayAndPlayMusic();
});

// Slideshow Container Click Events
const slideshowContainer = document.getElementById("slideshow-container");

function getClickSide(event) {
  const x = event.clientX;
  const width = window.innerWidth;
  return x < width / 2 ? "left" : "right";
}

slideshowContainer.addEventListener("click", (event) => {
  const side = getClickSide(event);
  if (side === "left") {
    showPrevSlide();
  } else {
    showNextSlide();
  }

  if (instructionOverlay.style.display !== "none") {
    closeOverlayAndPlayMusic();
  }
});

// Initialize Slideshow
document.addEventListener("DOMContentLoaded", () => {
  showSlide(slideIndex);
});
