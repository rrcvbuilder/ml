
const menuToggle = document.getElementById("menuToggle");
const mainNav = document.getElementById("mainNav");

menuToggle.addEventListener("click", () => {
  mainNav.classList.toggle("open");
});

mainNav.querySelectorAll("a").forEach(link => {
  link.addEventListener("click", () => mainNav.classList.remove("open"));
});

// Your six gallery image IDs
const imageIds = [
  "fKD3Y3d",
  "YbDA23y",
  "ILvdGcn",
  "239k37O",
  "jxBClDA",
  "rCtDvxb"
];

// Try common image formats because Imgur formats may differ.
function imageCandidates(id) {
  return [
    `https://i.imgur.com/${id}.jpg`,
    `https://i.imgur.com/${id}.png`,
    `https://i.imgur.com/${id}.jpeg`,
    `https://i.imgur.com/${id}.webp`
  ];
}

function setImageWithFallback(img, id) {
  const candidates = imageCandidates(id);
  let index = 0;

  img.onerror = () => {
    index++;
    if (index < candidates.length) {
      img.src = candidates[index];
    } else {
      img.alt = "Image could not be loaded. Please check the direct Imgur image URL.";
      img.style.objectFit = "contain";
    }
  };

  img.src = candidates[0];
}

// Profile photo: tries the album ID first, then uses a gallery image if unavailable.
const profile = document.getElementById("profile");
const profileCandidates = [
  ...imageCandidates("3OqxDhs"),
  ...imageCandidates("fKD3Y3d")
];
let profileIndex = 0;

 = () => {
  profileIndex++;
  if (profileIndex < profileCandidates.length) {
    profile.src = profileCandidates[profileIndex];
  } else {
    profile.alt = "Please add the direct URL of your profile photo.";
  }
};
profile.src = profileCandidates[0];

// Gallery slider
const galleryImage = document.getElementById("galleryImage");
const galleryCounter = document.getElementById("galleryCounter");
const galleryDots = document.getElementById("galleryDots");
const galleryThumbs = document.getElementById("galleryThumbs");
const prevPhoto = document.getElementById("prevPhoto");
const nextPhoto = document.getElementById("nextPhoto");

let currentPhoto = 0;
let slideTimer;

function showPhoto(index) {
  currentPhoto = (index + imageIds.length) % imageIds.length;

  setImageWithFallback(galleryImage, imageIds[currentPhoto]);

  galleryCounter.textContent =
    `${String(currentPhoto + 1).padStart(2, "0")} / ${String(imageIds.length).padStart(2, "0")}`;

  document.querySelectorAll(".gallery-dot").forEach((dot, i) => {
    dot.classList.toggle("active", i === currentPhoto);
    dot.setAttribute("aria-label", `Show photo ${i + 1}`);
  });

  document.querySelectorAll(".gallery-thumb").forEach((thumb, i) => {
    thumb.classList.toggle("active", i === currentPhoto);
  });
}

function buildGalleryControls() {
  galleryDots.innerHTML = "";
  galleryThumbs.innerHTML = "";

  imageIds.forEach((id, index) => {
    const dot = document.createElement("button");
    dot.className = "gallery-dot";
    dot.type = "button";
    dot.addEventListener("click", () => {
      showPhoto(index);
      restartAutoSlide();
    });
    galleryDots.appendChild(dot);

    const thumb = document.createElement("button");
    thumb.className = "gallery-thumb";
    thumb.type = "button";
    thumb.setAttribute("aria-label", `Open photo ${index + 1}`);

    const thumbImage = document.createElement("img");
    thumbImage.alt = `Gallery thumbnail ${index + 1}`;
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
}

function next() {
  showPhoto(currentPhoto + 1);
}

function previous() {
  showPhoto(currentPhoto - 1);
}

function restartAutoSlide() {
  clearInterval(slideTimer);
  slideTimer = setInterval(next, 4000);
}

nextPhoto.addEventListener("click", () => {
  next();
  restartAutoSlide();
});

prevPhoto.addEventListener("click", () => {
  previous();
  restartAutoSlide();
});

buildGalleryControls();
restartAutoSlide();

// Pause automatic movement while the pointer is over the gallery.
const galleryFrame = document.querySelector(".gallery-frame");

galleryFrame.addEventListener("mouseenter", () => {
  clearInterval(slideTimer);
});

galleryFrame.addEventListener("mouseleave", restartAutoSlide);

// Contact form: opens the visitor's email application.
const contactForm = document.getElementById("contactForm");
const formNote = document.getElementById("formNote");

contactForm.addEventListener("submit", event => {
  event.preventDefault();

  const name = document.getElementById("visitorName").value.trim();
  const email = document.getElementById("visitorEmail").value.trim();
  const message = document.getElementById("visitorMessage").value.trim();

  const subject = encodeURIComponent(`Website message from ${name}`);
  const body = encodeURIComponent(
    `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`
  );

  // Replace this example address with your real email.
  const recipient = "your-email@example.com";

  if (recipient === "your-email@example.com") {
    formNote.textContent =
      "Please replace your-email@example.com in the JS code with your real email address.";
    return;
  }

  window.location.href = `mailto:${recipient}?subject=${subject}&body=${body}`;
  formNote.textContent = "Your email application should open with the message ready.";
});
