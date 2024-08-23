// Toggle hamburger menu
function toggleMenu() {
  const menu = document.getElementById("menu");
  menu.classList.toggle("active"); // Dodajemo ili uklanjamo klasu "active"
}

// Smooth scroll to section when clicking a nav link
document.querySelectorAll("nav ul li a").forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const targetId = this.getAttribute("href");
    const targetSection = document.querySelector(targetId);

    // Glatko skrolanje do sekcije koristeći scrollIntoView
    targetSection.scrollIntoView({
      behavior: "smooth",
    });

    // Zatvaranje hamburger menija nakon klika na link (za mobilne uređaje)
    const menu = document.getElementById("menu");
    if (menu.classList.contains("active")) {
      menu.classList.remove("active");
    }
  });
});

// Dodaj event listener za hamburger meni
document.querySelector(".hamburger").addEventListener("click", toggleMenu);

// Promjena veličine loga tijekom skrolanja
window.addEventListener("scroll", function () {
  const logo = document.querySelector(".logo");
  const scrollPosition = window.scrollY;

  if (scrollPosition > 50) {
    logo.style.maxHeight = "75px"; // Smanjite veličinu loga kad se skroluje
  } else {
    logo.style.maxHeight = "100px"; // Povratak na početnu veličinu
  }
});

document.querySelectorAll(".product-card").forEach((card) => {
  card.addEventListener("click", () => {
    document.querySelectorAll(".product-card").forEach((c) => {
      if (c !== card) {
        c.classList.remove("active");
      }
    });
    card.classList.toggle("active");
  });
});

document.querySelectorAll(".close-btn").forEach((button) => {
  button.addEventListener("click", (e) => {
    e.stopPropagation(); // Spriječava da klik na gumb zatvori cijelu karticu
    button.closest(".product-card").classList.remove("active");
  });
});

document.querySelectorAll(".gallery-img").forEach((img, index) => {
  img.addEventListener("click", () => {
    const modal = document.getElementById("gallery-modal");
    const modalImg = document.getElementById("modal-img");
    const slides = document.querySelectorAll(".gallery-img");

    modal.style.display = "flex";
    modalImg.src = img.src;
    modalImg.dataset.index = index;

    // Update modal with the first image
    updateModal(index);

    // Close modal
    document.querySelector(".close").addEventListener("click", () => {
      modal.style.display = "none";
    });

    // Navigate images
    document.querySelector(".prev").addEventListener("click", () => {
      navigate(-1);
    });

    document.querySelector(".next").addEventListener("click", () => {
      navigate(1);
    });

    function updateModal(index) {
      modalImg.src = slides[index].src;
      modalImg.dataset.index = index;
    }

    function navigate(direction) {
      let currentIndex = parseInt(modalImg.dataset.index);
      let newIndex = (currentIndex + direction + slides.length) % slides.length;
      updateModal(newIndex);
    }
  });
});

// Funkcija za otvaranje modala i prikaz slike
function openModal(index) {
  const modal = document.querySelector(".gallery-modal");
  const images = document.querySelectorAll(".gallery-img");
  const modalImg = document.querySelector(".modal-image");
  const prev = document.querySelector(".prev");
  const next = document.querySelector(".next");

  modal.style.display = "flex";
  modalImg.src = images[index].src;

  // Funkcija za prikaz prethodne slike
  function showPrevImage() {
    index = (index - 1 + images.length) % images.length;
    modalImg.src = images[index].src;
  }

  // Funkcija za prikaz sljedeće slike
  function showNextImage() {
    index = (index + 1) % images.length;
    modalImg.src = images[index].src;
  }

  // Event listener za tipke lijevo/desno
  function handleKeydown(event) {
    if (event.key === "ArrowLeft") {
      showPrevImage();
    } else if (event.key === "ArrowRight") {
      showNextImage();
    } else if (event.key === "Escape") {
      closeModal();
    }
  }

  document.addEventListener("keydown", handleKeydown);

  // Funkcija za zatvaranje modala
  function closeModal() {
    modal.style.display = "none";
    document.removeEventListener("keydown", handleKeydown);
  }
  prev.addEventListener("click", showPrevImage);
  next.addEventListener("click", showNextImage);
  document.querySelector(".close").addEventListener("click", closeModal);
}

// Funkcija za dodavanje event listenera na slike
document.querySelectorAll(".gallery-img").forEach((img, index) => {
  img.addEventListener("click", () => openModal(index));
});
