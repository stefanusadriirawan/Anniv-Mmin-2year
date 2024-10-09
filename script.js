// Slideshow Functionality
let slideIndex = 0;
const slides = document.getElementsByClassName("slide");

// Function to show a specific slide
function showSlide(index) {
  // Ensure the index wraps around
  if (index >= slides.length) {
    slideIndex = 0;
  } else if (index < 0) {
    slideIndex = slides.length - 1;
  } else {
    slideIndex = index;
  }

  // Hide all slides and show the current one
  for (let i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }
  slides[slideIndex].style.display = "block";
}

// Function to show the next slide
function showNextSlide() {
  showSlide(slideIndex + 1);
}

// Function to show the previous slide
function showPrevSlide() {
  showSlide(slideIndex - 1);
}

// Clickable Screen for Navigation and Closing Overlay
const slideshowContainer = document.getElementById("slideshow-container");

// Function to determine click side
function getClickSide(event) {
  const x = event.clientX;
  const width = window.innerWidth;
  return x < width / 2 ? "left" : "right";
}

// Music Control Functionality
const music = document.getElementById("background-music");
let musicPlayed = false;

// Function to attempt playing music
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
          "Autoplay was prevented by the browser. Music will start when the user interacts with the page."
        );
      });
  }
}

// Instruction Overlay Control
const instructionOverlay = document.getElementById("instruction-overlay");
const closeInstruction = document.getElementById("close-instruction");

// Function to close the instruction overlay and start music
function closeOverlayAndPlayMusic() {
  instructionOverlay.style.display = "none";
  playMusicIfNeeded();
}

// Close instruction overlay when close button is clicked
closeInstruction.addEventListener("click", () => {
  closeOverlayAndPlayMusic();
});

// Event Listener for Clicks on Slideshow Container
slideshowContainer.addEventListener("click", (event) => {
  const side = getClickSide(event);
  if (side === "left") {
    showPrevSlide();
  } else {
    showNextSlide();
  }
  // Close the overlay if it's still visible
  if (instructionOverlay.style.display !== "none") {
    closeOverlayAndPlayMusic();
  }
});

// Initialize Slideshow when DOM is ready
document.addEventListener("DOMContentLoaded", () => {
  showSlide(slideIndex);
});
