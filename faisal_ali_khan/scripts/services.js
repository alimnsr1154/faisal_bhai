// Services slider — full-width slides, dots, prev/next arrows, infinite loop.
export function initServices() {
  const track = document.getElementById("services-track");
  if (!track) return;
  const slides = Array.from(track.querySelectorAll(".service-slide"));
  if (slides.length < 2) return;

  // Clone first and last slides for seamless infinite loop
  const firstClone = slides[0].cloneNode(true);
  const lastClone = slides[slides.length - 1].cloneNode(true);
  firstClone.classList.add("clone");
  lastClone.classList.add("clone");
  track.appendChild(firstClone);
  track.insertBefore(lastClone, slides[0]);

  // All slides including clones
  const allSlides = () => Array.from(track.querySelectorAll(".service-slide"));

  // Start at real first slide (index 1 because clone is at 0)
  let i = 1;
  let isTransitioning = false;

  // Build dot controls (only for real slides)
  const dotsContainer = document.getElementById("services-dots");
  const dotEls = [];
  if (dotsContainer) {
    slides.forEach((_, idx) => {
      const b = document.createElement("button");
      b.type = "button";
      b.setAttribute("aria-label", `Go to slide ${idx + 1}`);
      b.addEventListener("click", () => goTo(idx + 1));
      dotsContainer.appendChild(b);
      dotEls.push(b);
    });
  }

  const setDot = () => {
    const realIdx = i - 1;
    dotEls.forEach((d, idx) => d.setAttribute("aria-current", String(idx === realIdx)));
  };

  const scrollToIndex = (idx, smooth = true) => {
    const s = allSlides()[idx];
    if (!s) return;
    const left =
      s.getBoundingClientRect().left -
      track.getBoundingClientRect().left +
      track.scrollLeft;
    track.scrollTo({ left, behavior: smooth ? "smooth" : "instant" });
  };

  const goTo = (idx) => {
    if (isTransitioning) return;
    i = idx;
    scrollToIndex(i);
    setDot();
  };

  // After scrolling to a clone, silently jump to the real slide
  const onScrollEnd = () => {
    const total = allSlides().length;
    if (i === 0) {
      i = total - 2;
      scrollToIndex(i, false);
    } else if (i === total - 1) {
      i = 1;
      scrollToIndex(i, false);
    }
    setDot();
  };
  // Use scrollend if available, otherwise fall back to scroll + timeout
  if ("onscrollend" in window) {
    track.addEventListener("scrollend", onScrollEnd);
  } else {
    let scrollEndTimer;
    track.addEventListener("scroll", () => {
      clearTimeout(scrollEndTimer);
      scrollEndTimer = setTimeout(onScrollEnd, 120);
    });
  }

  // Arrow buttons
  const prevBtn = document.getElementById("services-prev");
  const nextBtn = document.getElementById("services-next");
  if (prevBtn) prevBtn.addEventListener("click", () => goTo(i - 1));
  if (nextBtn) nextBtn.addEventListener("click", () => goTo(i + 1));

  const advance = () => goTo(i + 1);
  let timer;
  const start = () => { stop(); timer = setInterval(advance, 3000); };
  const stop = () => clearInterval(timer);

  // Sync dots on manual swipe
  let raf;
  track.addEventListener("scroll", () => {
    cancelAnimationFrame(raf);
    raf = requestAnimationFrame(() => {
      const idx = Math.round(track.scrollLeft / track.clientWidth);
      if (idx !== i) {
        i = idx;
        setDot();
      }
    });
  });

  track.addEventListener("pointerenter", stop);
  track.addEventListener("pointerleave", start);

  // Jump to real first slide without animation on init
  scrollToIndex(i, false);
  setDot();

  if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    if ("IntersectionObserver" in window) {
      const io = new IntersectionObserver(
        (entries) => entries.forEach((e) => (e.isIntersecting ? start() : stop())),
        { threshold: 0.2 }
      );
      io.observe(track);
    } else {
      start();
    }
  }
}
