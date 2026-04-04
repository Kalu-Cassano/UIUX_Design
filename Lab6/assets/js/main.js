document.addEventListener("DOMContentLoaded", () => {
  const yearElement = document.getElementById("currentYear");
  if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
  }

  const currentFile = window.location.pathname.split("/").pop() || "index.html";
  document.querySelectorAll(".nav-link").forEach((link) => {
    const target = link.getAttribute("href");
    if (target === currentFile) {
      link.classList.add("active");
    }
  });

  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", (event) => {
      const selector = anchor.getAttribute("href");
      if (!selector || selector === "#") {
        return;
      }

      const destination = document.querySelector(selector);
      if (!destination) {
        return;
      }

      event.preventDefault();
      destination.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  });

  const topButton = document.getElementById("backToTop");
  if (topButton) {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 250) {
        topButton.classList.add("show");
      } else {
        topButton.classList.remove("show");
      }
    });

    topButton.addEventListener("click", () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

  const form = document.getElementById("contactForm");
  if (form) {
    const successModalEl = document.getElementById("successModal");
    const successModal = successModalEl ? new bootstrap.Modal(successModalEl) : null;

    form.addEventListener("submit", (event) => {
      event.preventDefault();
      if (!form.checkValidity()) {
        form.classList.add("was-validated");
        return;
      }

      form.classList.remove("was-validated");
      form.reset();
      if (successModal) {
        successModal.show();
      }
    });
  }
});
