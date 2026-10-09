
document.addEventListener("DOMContentLoaded", () => {
  // ELEMENTOS DEL INTRO
  const intro = document.getElementById("intro");
  const sorpresa = document.getElementById("sorpresa");
  const stars = document.getElementById("stars");
  const timer = document.getElementById("timer");
  const loadingBar = document.getElementById("loadingBar");
  const loadingText = document.getElementById("loadingText");
  const loadingSub = document.getElementById("loadingSub");
  const enterBtn = document.getElementById("enterBtn");

  // CREAR ESTRELLAS
  if (stars) {
    for (let i = 0; i < 65; i++) {
      const star = document.createElement("span");
      star.className = "star";
      star.textContent = Math.random() > 0.5 ? "✦" : "·";

      star.style.left = `${Math.random() * 100}%`;
      star.style.top = `${Math.random() * 100}%`;
      star.style.fontSize = `${8 + Math.random() * 13}px`;
      star.style.animationDelay = `${Math.random() * 2}s`;
      star.style.animationDuration = `${1.5 + Math.random() * 3}s`;

      stars.appendChild(star);
    }
  }

  // INTRO DE 10 SEGUNDOS
  let secondsLeft = 10;
  let introFinished = false;

  const countdownInterval = window.setInterval(() => {
    secondsLeft = Math.max(0, secondsLeft - 1);

    if (timer) {
      timer.textContent = secondsLeft;
    }

    if (loadingBar) {
      loadingBar.style.width = `${(10 - secondsLeft) * 10}%`;
    }

    if (secondsLeft <= 0) {
      window.clearInterval(countdownInterval);
      introFinished = true;

      if (loadingText) {
        loadingText.textContent = "¡Tu sorpresa está lista! 💗";
      }

      if (loadingSub) {
        loadingSub.textContent = "Una historia hecha con cariño para ti.";
      }

      if (enterBtn) {
        enterBtn.classList.remove("hidden");
      }

      // Mostrar automáticamente la página cuando termina la cuenta.
      showSurprise();
    }
  }, 1000);

  function showSurprise() {
    if (sorpresa) {
      sorpresa.classList.remove("hidden");
    }

    if (intro) {
      intro.classList.add("fade-out");

      window.setTimeout(() => {
        intro.classList.add("hidden");
      }, 850);
    }
  }

  if (enterBtn) {
    enterBtn.addEventListener("click", () => {
      // Permite entrar antes si el botón está disponible.
      if (!introFinished) {
        window.clearInterval(countdownInterval);
        introFinished = true;
      }

      showSurprise();
    });
  }

  // TARJETAS DE RECUERDOS
  const memoryCards = document.querySelectorAll(".memory");

  memoryCards.forEach((card) => {
    card.addEventListener("click", () => {
      const isOpen = card.classList.toggle("is-open");
      card.setAttribute("aria-expanded", String(isOpen));
    });
  });

  // AVISAR SI FALTA UNA IMAGEN
  const memoryImages = document.querySelectorAll(".memory-reveal img");

  memoryImages.forEach((img) => {
    img.addEventListener("error", () => {
      img.alt = "No se encontró la imagen. Revisa el nombre del archivo.";
      img.style.minHeight = "220px";
      img.style.objectFit = "contain";
      img.style.padding = "20px";
    });
  });

  // REGALO DE DIAMANTES
  const diamondBtn = document.getElementById("diamondBtn");
  const diamondMessage = document.getElementById("diamondMessage");

  if (diamondBtn && diamondMessage) {
    diamondBtn.addEventListener("click", () => {
      const isHidden = diamondMessage.classList.contains("hidden");

      diamondMessage.classList.toggle("hidden", !isHidden);
      diamondBtn.textContent = isHidden
        ? "Regalito descubierto 💜"
        : "Abrir mi regalito 💎";

      diamondBtn.setAttribute("aria-expanded", String(isHidden));
    });
  }

  // CARTA FINAL
  const letterBtn = document.getElementById("letterBtn");
  const letterContent = document.getElementById("letterContent");

  if (letterBtn && letterContent) {
    letterBtn.addEventListener("click", () => {
      const isHidden = letterContent.classList.contains("hidden");

      letterContent.classList.toggle("hidden", !isHidden);
      letterBtn.textContent = isHidden
        ? "Cerrar mi carta 💗"
        : "Abrir mi carta 💌";

      letterBtn.setAttribute("aria-expanded", String(isHidden));

      if (isHidden) {
        window.setTimeout(() => {
          letterContent.scrollIntoView({
            behavior: "smooth",
            block: "center"
          });
        }, 100);
      }
    });
  }
});
