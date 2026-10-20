
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

// Direct image URLs
const imageUrl = id => `https://i.imgur.com/${id}.jpg`;

const profile = document.getElementById("profile");
const galleryImage = document.getElementById("galleryImage");
const galleryCounter = document.getElementById("galleryCounter");
const galleryDots = document.getElementById("galleryDots");
const galleryThumbs = document.getElementById("galleryThumbs");
const prevPhoto = document.getElementById("prevPhoto");
const nextPhoto = document.getElementById("nextPhoto");

if (profile) {
  profile.src = "https://i.imgur.com/NKLT7OX.jpg";
}

let currentPhoto = 0;
let slideTimer;

function showPhoto(index) {
  currentPhoto = (index + imageIds.length) % imageIds.length;

  if (galleryImage) {
    galleryImage.src = imageUrl(imageIds[currentPhoto]);
  }

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
}

function restartAutoSlide() {
  clearInterval(slideTimer);
  slideTimer = setInterval(() => {
    showPhoto(currentPhoto + 1);
  }, 4000);
}

if (galleryDots && galleryThumbs) {
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

    const img = document.createElement("img");
    img.src = imageUrl(id);
    img.alt = `Gallery photo ${index + 1}`;
    img.loading = "lazy";

    thumb.appendChild(img);
    thumb.addEventListener("click", () => {
      showPhoto(index);
      restartAutoSlide();
    });

    galleryThumbs.appendChild(thumb);
  });

  showPhoto(0);
  restartAutoSlide();
}

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

const galleryFrame = document.querySelector(".gallery-frame");

if (galleryFrame) {
  galleryFrame.addEventListener("mouseenter", () => {
    clearInterval(slideTimer);
  });

  galleryFrame.addEventListener("mouseleave", restartAutoSlide);
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
          "Please add your real email address in script.js first.";
      }
      return;
    }

    window.location.href =
      `mailto:${recipient}?subject=${subject}&body=${body}`;
  });
}
