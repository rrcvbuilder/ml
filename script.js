
const menuToggle = document.getElementById("menuToggle");
const mainNav = document.getElementById("mainNav");

if (menuToggle && mainNav) {
  menuToggle.addEventListener("click", () => {
    mainNav.classList.toggle("open");
  });

  mainNav.querySelectorAll("a").forEach(link => {
    link.addEventListener("click", () => {
      mainNav.classList.remove("open");
    });
  });
}

// Gallery image IDs
const imageIds = [
  "fKD3Y3d",
  "YbDA23y",
  "ILvdGcn",
  "239k37O",
  "jxBClDA",
  "rCtDvxb"
];

// Try different image formats
function setImageWithFallback(img, id, onLoaded) {
  const extensions = ["jpg", "png", "jpeg", "webp"];
  let index = 0;

  img.onerror = function () {
    index++;

    if (index < extensions.length) {
      img.src = `https://i.imgur.com/${id}.${extensions[index]}`;
    } else {
      img.alt = "ছবিটি পাওয়া যায়নি";
      img.classList.remove("fade-out");
      if (onLoaded) onLoaded(false);
    }
  };

  img.onload = function () {
    img.classList.remove("fade-out");
    if (onLoaded) onLoaded(true);
  };

  img.src = `https://i.imgur.com/${id}.${extensions[0]}`;
}

// Profile photo
const profile = document.getElementById("profile");

if (profile) {
  setImageWithFallback(profile, "NKLT7OX");
}

// Gallery elements
const galleryImage = document.getElementById("galleryImage");
const galleryCounter = document.getElementById("galleryCounter");
const galleryDots = document.getElementById("galleryDots");
const galleryThumbs = document.getElementById("galleryThumbs");
const prevPhoto = document.getElementById("prevPhoto");
const nextPhoto = document.getElementById("nextPhoto");
const galleryFrame = document.querySelector(".gallery-frame");

let currentPhoto = 0;
let slideTimer = null;
let isChangingPhoto = false;

function showPhoto(index) {
  if (!galleryImage || imageIds.length === 0) return;

  currentPhoto = (index + imageIds.length) % imageIds.length;

  // Fade out the current image
  galleryImage.classList.add("fade-out");
  isChangingPhoto = true;

  // Wait for fade-out before loading the next image
  setTimeout(() => {
    const id = imageIds[currentPhoto];

    if (galleryCounter) {
      galleryCounter.textContent =
        `${String(currentPhoto + 1).padStart(2, "0")} / ${String(imageIds.length).padStart(2, "0")}`;
    }

    document.querySelectorAll(".gallery-dot").forEach((dot, i) => {
      dot.classList.toggle("active", i === currentPhoto);
    });

    document.querySelectorAll(".gallery-thumb").forEach((thumb, i) => {
      thumb.classList.toggle("active", i === currentPhoto);
    });

    setImageWithFallback(galleryImage, id, () => {
      isChangingPhoto = false;
    });
  }, 450);
}

function restartAutoSlide() {
  clearInterval(slideTimer);

  slideTimer = setInterval(() => {
    if (!isChangingPhoto) {
      showPhoto(currentPhoto + 1);
    }
  }, 4500);
}

// Build gallery dots and thumbnails
if (galleryDots && galleryThumbs) {
  galleryDots.innerHTML = "";
  galleryThumbs.innerHTML = "";

  imageIds.forEach((id, index) => {
    const dot = document.createElement("button");
    dot.type = "button";
    dot.className = "gallery-dot";
    dot.setAttribute("aria-label", `Show photo ${index + 1}`);

    dot.addEventListener("click", () => {
      showPhoto(index);
      restartAutoSlide();
    });

    galleryDots.appendChild(dot);

    const thumb = document.createElement("button");
    thumb.type = "button";
    thumb.className = "gallery-thumb";
    thumb.setAttribute("aria-label", `Open photo ${index + 1}`);

    const thumbImage = document.createElement("img");
    thumbImage.alt = `Gallery photo ${index + 1}`;
    thumbImage.loading = "lazy";

    setImageWithFallback(thumbImage, id);

    thumb.appendChild(thumbImage);

    thumb.addEventListener("click", () => {
      showPhoto(index);
      restartAutoSlide();
    });

    galleryThumbs.appendChild(thumb);
  });

  showPhoto(0);
  restartAutoSlide();
}

// Previous and next buttons
if (nextPhoto) {
  nextPhoto.addEventListener("click", () => {
    showPhoto(currentPhoto + 1);
    restartAutoSlide();
  });
}

if (prevPhoto) {
  prevPhoto.addEventListener("click", () => {
    showPhoto(currentPhoto - 1);
    restartAutoSlide();
  });
}

// Pause slideshow while hovering over gallery
if (galleryFrame) {
  galleryFrame.addEventListener("mouseenter", () => {
    clearInterval(slideTimer);
  });

  galleryFrame.addEventListener("mouseleave", () => {
    restartAutoSlide();
  });
}

// Contact form
const contactForm = document.getElementById("contactForm");
const formNote = document.getElementById("formNote");

if (contactForm) {
  contactForm.addEventListener("submit", event => {
    event.preventDefault();

    const name = document.getElementById("visitorName").value.trim();
    const email = document.getElementById("visitorEmail").value.trim();
    const message = document.getElementById("visitorMessage").value.trim();

    const subject = encodeURIComponent(`Website message from ${name}`);
    const body = encodeURIComponent(
      `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`
    );

    const recipient = "your-email@example.com";

    if (recipient === "your-email@example.com") {
      if (formNote) {
        formNote.textContent =
          "Please replace your-email@example.com with your real email in script.js.";
      }
      return;
    }

    window.location.href =
      `mailto:${recipient}?subject=${subject}&body=${body}`;
  });
             }
