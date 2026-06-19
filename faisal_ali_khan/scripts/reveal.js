// Scroll-reveal, sticky-header condense, and lazy video playback.

export function initReveal() {
  const els = document.querySelectorAll(".reveal");
  if (!els.length) return;

  if (!("IntersectionObserver" in window)) {
    els.forEach((el) => el.classList.add("in-view"));
    return;
  }

  const io = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("in-view");
          obs.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15, rootMargin: "0px 0px -8% 0px" }
  );

  els.forEach((el) => io.observe(el));
}

export function initHeader() {
  const header = document.querySelector(".site-header");
  if (!header) return;
  const onScroll = () => {
    header.classList.toggle("is-scrolled", window.scrollY > 20);
  };
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });
}

// Play videos only while visible; pause off-screen. Keeps data + CPU down.
export function initLazyVideo() {
  const vids = document.querySelectorAll("video[data-lazy]");
  if (!vids.length) return;

  if (!("IntersectionObserver" in window)) {
    vids.forEach((v) => v.play?.().catch(() => {}));
    return;
  }

  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        const v = entry.target;
        if (entry.isIntersecting) {
          v.play?.().catch(() => {});
        } else {
          v.pause?.();
        }
      });
    },
    { threshold: 0.25 }
  );

  vids.forEach((v) => io.observe(v));
}
