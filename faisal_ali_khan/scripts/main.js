// Single bundle entry. Each init is guarded, so it's safe on every page.
import { initReveal, initHeader, initLazyVideo } from "./reveal.js";
import { initNav } from "./nav.js";
import { initServices } from "./services.js";
import { initTestimonials } from "./testimonials.js";
import { initSocial } from "./social.js";
import { initYouTube } from "./youtube.js";

function boot() {
  initHeader();
  initNav();
  initServices();
  initTestimonials();
  initSocial();
  initYouTube();
  initLazyVideo();
  // Reveal runs last so dynamically-added .reveal elements are observed too.
  initReveal();
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", boot);
} else {
  boot();
}
