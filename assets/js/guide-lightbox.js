(function () {
  "use strict";

  function isDesktopViewport() {
    return window.matchMedia("(min-width: 901px)").matches;
  }

  function initCredentialRotationLightbox() {
    var stepImages = Array.prototype.slice.call(
      document.querySelectorAll(
        ".credential-rotation-step img, .guide-shot-card--step img"
      )
    );

    if (!stepImages.length) {
      return;
    }

    stepImages.forEach(function (img) {
      img.classList.add("credential-rotation-zoomable");
      img.setAttribute("role", "button");
      img.setAttribute("tabindex", "0");
      img.setAttribute("aria-label", "Open image preview");
    });

    var overlay = document.createElement("div");
    overlay.className = "guide-lightbox";
    overlay.setAttribute("aria-hidden", "true");

    var panel = document.createElement("div");
    panel.className = "guide-lightbox__panel";
    panel.setAttribute("role", "dialog");
    panel.setAttribute("aria-modal", "true");
    panel.setAttribute("aria-label", "Image preview");

    var closeBtn = document.createElement("button");
    closeBtn.className = "guide-lightbox__close";
    closeBtn.type = "button";
    closeBtn.setAttribute("aria-label", "Close image preview");
    closeBtn.textContent = "Close";

    var preview = document.createElement("img");
    preview.className = "guide-lightbox__image";
    preview.alt = "";
    preview.decoding = "async";

    panel.appendChild(closeBtn);
    panel.appendChild(preview);
    overlay.appendChild(panel);
    document.body.appendChild(overlay);

    var lastTrigger = null;

    function closeLightbox() {
      overlay.classList.remove("is-open");
      overlay.setAttribute("aria-hidden", "true");
      document.body.classList.remove("guide-lightbox-open");
      if (lastTrigger) {
        lastTrigger.focus();
      }
    }

    function openLightbox(img) {
      if (!isDesktopViewport()) {
        return;
      }
      preview.src = img.currentSrc || img.src;
      preview.alt = img.alt || "Image preview";
      lastTrigger = img;
      overlay.classList.add("is-open");
      overlay.setAttribute("aria-hidden", "false");
      document.body.classList.add("guide-lightbox-open");
      closeBtn.focus();
    }

    stepImages.forEach(function (img) {
      img.addEventListener("click", function () {
        openLightbox(img);
      });
      img.addEventListener("keydown", function (event) {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          openLightbox(img);
        }
      });
    });

    closeBtn.addEventListener("click", closeLightbox);
    overlay.addEventListener("click", function (event) {
      if (event.target === overlay) {
        closeLightbox();
      }
    });
    document.addEventListener("keydown", function (event) {
      if (event.key === "Escape" && overlay.classList.contains("is-open")) {
        closeLightbox();
      }
    });

    window.addEventListener("resize", function () {
      if (!isDesktopViewport() && overlay.classList.contains("is-open")) {
        closeLightbox();
      }
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initCredentialRotationLightbox);
  } else {
    initCredentialRotationLightbox();
  }
})();
