document.addEventListener("DOMContentLoaded", () => {
  // --- MENU BURGER ---
  const menuToggle = document.getElementById("menuToggle");
  const menu = document.getElementById("menu");

  if (menuToggle && menu) {
    // Initialise menu fermé
    menu.style.maxHeight = "0";
    menu.style.opacity = "0";
    menu.style.overflow = "hidden";
    menu.style.transition = "max-height 0.4s ease, opacity 0.4s ease";

    // Toggle menu au clic sur bouton
    menuToggle.addEventListener("click", (e) => {
      e.stopPropagation();
      const isClosed = menu.style.maxHeight === "0px" || menu.style.maxHeight === "0";
      if (isClosed) {
        menu.style.maxHeight = menu.scrollHeight + "px";
        menu.style.opacity = "1";
        menuToggle.setAttribute("aria-expanded", "true");
        menu.setAttribute("aria-hidden", "false");
      } else {
        menu.style.maxHeight = "0";
        menu.style.opacity = "0";
        menuToggle.setAttribute("aria-expanded", "false");
        menu.setAttribute("aria-hidden", "true");
      }
    });

    // Ferme menu au clic en dehors
    document.addEventListener("click", (e) => {
      if (!menu.contains(e.target) && !menuToggle.contains(e.target) && menu.style.maxHeight !== "0px") {
        menu.style.maxHeight = "0";
        menu.style.opacity = "0";
        menuToggle.setAttribute("aria-expanded", "false");
        menu.setAttribute("aria-hidden", "true");
      }
    });

    // Ferme menu à la touche Échap
    window.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && menu.style.maxHeight !== "0px") {
        menu.style.maxHeight = "0";
        menu.style.opacity = "0";
        menuToggle.setAttribute("aria-expanded", "false");
        menu.setAttribute("aria-hidden", "true");
        menuToggle.focus();
      }
    });
  }

  // --- ANIMATION TITRE AU CHARGEMENT ---
  const titre = document.getElementById("titre");
  if (titre) {
    titre.style.opacity = 0;
    titre.style.transform = "scale(0.8)";
    titre.style.transition = "opacity 0.8s ease, transform 0.8s ease";

    setTimeout(() => {
      titre.style.opacity = 1;
      titre.style.transform = "scale(1)";
    }, 200);
  }

  // --- ANIMATION AU SCROLL (fade + slide) ---
  const elementsToAnimate = document.querySelectorAll(
    "section, h1, h2, h3, h4, p, img, video, button, a.btn"
  );

  // Initialise tous invisibles et déplacés vers le bas
  elementsToAnimate.forEach((el) => {
    el.style.opacity = 0;
    el.style.transform = "translateY(30px)";
    el.style.transition = "opacity 0.7s ease-out, transform 0.7s ease-out";
  });

  function revealOnScroll() {
    const windowHeight = window.innerHeight;

    elementsToAnimate.forEach((el) => {
      const top = el.getBoundingClientRect().top;
      if (top < windowHeight - 100) {
        el.style.opacity = 1;
        el.style.transform = "translateY(0)";
      }
    });
  }

  window.addEventListener("scroll", revealOnScroll);
  revealOnScroll(); // pour afficher au chargement si visible

  // --- EFFET "LIFT" AU HOVER (cartes, boutons, images, vidéos) ---
  const liftElements = document.querySelectorAll(".card, button, a.btn, img, video");

  liftElements.forEach((el) => {
    el.style.transition = "transform 0.3s ease, box-shadow 0.3s ease";

    el.addEventListener("mouseenter", () => {
      el.style.transform = "translateY(-10px) scale(1.03)";
      el.style.boxShadow = "0 12px 28px rgba(0,0,0,0.25)";
    });

    el.addEventListener("mouseleave", () => {
      el.style.transform = "translateY(0) scale(1)";
      el.style.boxShadow = "0 4px 12px rgba(0,0,0,0.1)";
    });
  });

  // --- Fonctions lecture vocale ---
  window.lireTexte = function(id) {
    const el = document.getElementById(id);
    if (!el) return alert("Élément non trouvé");
    const utterance = new SpeechSynthesisUtterance(el.innerText);
    speechSynthesis.speak(utterance);
  };

  window.lireTout = function() {
    const text = document.body.innerText;
    const utterance = new SpeechSynthesisUtterance(text);
    speechSynthesis.speak(utterance);
  };
});
