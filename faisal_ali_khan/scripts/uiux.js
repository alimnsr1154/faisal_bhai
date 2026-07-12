// UI/UX project tab switcher
export function initUiuxProjects() {
  const tabs = document.querySelectorAll(".proj-tab");
  const slides = document.querySelectorAll(".proj-slide");
  if (!tabs.length) return;

  // Show first slide on init
  slides[0]?.classList.add("proj-slide--active");

  tabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      const idx = Number(tab.dataset.proj);

      tabs.forEach((t) => t.classList.remove("proj-tab--active"));
      slides.forEach((s) => s.classList.remove("proj-slide--active"));

      tab.classList.add("proj-tab--active");
      slides[idx]?.classList.add("proj-slide--active");
    });
  });
}
