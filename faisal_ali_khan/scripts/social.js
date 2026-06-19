// Social cards with animated follower counters (requestAnimationFrame).

const socialCards = [
  {
    platform: "linkedin",
    url: "https://www.linkedin.com/in/faisal-ali-khan-354549114/",
    username: "@faisalalikhan",
    count: 2000,
    label: "Followers",
    cta: "Follow on LinkedIn",
  },
  {
    platform: "youtube",
    url: "https://www.youtube.com/@faisalalikhan4409",
    username: "@faisalalikhan4409",
    count: 1000,
    label: "Subscribers",
    cta: "Subscribe on YouTube",
  },
  {
    platform: "instagram",
    url: "https://www.instagram.com/faisallalikhan/",
    username: "@faisallalikhan",
    count: 1200,
    label: "Followers",
    cta: "Follow on Instagram",
  },
  {
    platform: "facebook",
    url: "https://www.facebook.com/mfaial.ali.9",
    username: "@faisalalikhan",
    count: 1000,
    label: "Likes",
    cta: "Like on Facebook",
  },
  {
    platform: "x",
    url: "#",
    username: "@faisalalikhan",
    count: 2000,
    label: "Followers",
    cta: "Follow on X",
  },
];

const ICONS = {
  linkedin:
    '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M4.98 3.5A2.5 2.5 0 1 1 0 3.5a2.5 2.5 0 0 1 4.98 0zM.2 8.2h4.56V24H.2zM8.34 8.2h4.37v2.16h.06c.61-1.1 2.1-2.26 4.32-2.26 4.62 0 5.47 2.95 5.47 6.78V24h-4.56v-6.99c0-1.67-.03-3.81-2.32-3.81-2.32 0-2.68 1.81-2.68 3.69V24H8.34z"/></svg>',
  youtube:
    '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M23.5 6.2a3 3 0 0 0-2.1-2.1C19.5 3.6 12 3.6 12 3.6s-7.5 0-9.4.5A3 3 0 0 0 .5 6.2 31 31 0 0 0 0 12a31 31 0 0 0 .5 5.8 3 3 0 0 0 2.1 2.1c1.9.5 9.4.5 9.4.5s7.5 0 9.4-.5a3 3 0 0 0 2.1-2.1A31 31 0 0 0 24 12a31 31 0 0 0-.5-5.8zM9.6 15.6V8.4l6.2 3.6z"/></svg>',
  instagram:
    '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 2.2c3.2 0 3.6 0 4.9.07 1.17.05 1.8.25 2.23.41.56.22.96.48 1.38.9.42.42.68.82.9 1.38.16.42.36 1.06.41 2.23.06 1.3.07 1.69.07 4.9s0 3.6-.07 4.9c-.05 1.17-.25 1.8-.41 2.23-.22.56-.48.96-.9 1.38-.42.42-.82.68-1.38.9-.42.16-1.06.36-2.23.41-1.3.06-1.69.07-4.9.07s-3.6 0-4.9-.07c-1.17-.05-1.8-.25-2.23-.41a3.7 3.7 0 0 1-1.38-.9 3.7 3.7 0 0 1-.9-1.38c-.16-.42-.36-1.06-.41-2.23C2.21 15.6 2.2 15.2 2.2 12s0-3.6.07-4.9c.05-1.17.25-1.8.41-2.23.22-.56.48-.96.9-1.38.42-.42.82-.68 1.38-.9.42-.16 1.06-.36 2.23-.41C8.4 2.21 8.8 2.2 12 2.2zm0 3.65A6.15 6.15 0 1 0 18.15 12 6.15 6.15 0 0 0 12 5.85zm0 10.15A4 4 0 1 1 16 12a4 4 0 0 1-4 4zm6.4-10.4a1.44 1.44 0 1 1-1.44-1.44 1.44 1.44 0 0 1 1.44 1.44z"/></svg>',
  facebook:
    '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M24 12a12 12 0 1 0-13.87 11.85v-8.38H7.08V12h3.05V9.36c0-3.01 1.79-4.67 4.53-4.67 1.31 0 2.69.23 2.69.23v2.96h-1.52c-1.49 0-1.96.93-1.96 1.88V12h3.33l-.53 3.47h-2.8v8.38A12 12 0 0 0 24 12z"/></svg>',
  x: '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M18.24 2.25h3.31l-7.23 8.26L22.5 21.75h-6.66l-5.22-6.82-5.97 6.82H1.34l7.73-8.84L1.5 2.25h6.83l4.72 6.24zm-1.16 17.52h1.83L7.01 4.13H5.05z"/></svg>',
};

function formatK(n) {
  const k = n / 1000;
  return (Number.isInteger(k) ? k : k.toFixed(1)) + "k+";
}

function animateCount(el, target) {
  const duration = 1400;
  const start = performance.now();
  function tick(now) {
    const p = Math.min((now - start) / duration, 1);
    const eased = 1 - Math.pow(1 - p, 3);
    el.textContent = formatK(Math.round((target * eased) / 100) * 100);
    if (p < 1) requestAnimationFrame(tick);
    else el.textContent = formatK(target);
  }
  requestAnimationFrame(tick);
}

export function initSocial() {
  const container = document.querySelector(".social-cards");
  if (!container) return;

  socialCards.forEach((card) => {
    const a = document.createElement("a");
    a.className = `social-card social-card--${card.platform} reveal`;
    a.href = card.url;
    a.target = "_blank";
    a.rel = "noopener";
    a.innerHTML = `
      <span class="social-card__icon">${ICONS[card.platform] || ""}</span>
      <span class="social-card__user">${card.username}</span>
      <span class="social-card__count" data-count="${card.count}">0</span>
      <span class="social-card__label">${card.label}</span>
      <span class="social-card__cta">${card.cta}</span>`;
    container.appendChild(a);
  });

  if ("IntersectionObserver" in window) {
    const io = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const el = entry.target;
            animateCount(el, Number(el.dataset.count));
            obs.unobserve(el);
          }
        });
      },
      { threshold: 0.5 }
    );
    container.querySelectorAll(".social-card__count").forEach((el) => io.observe(el));
  } else {
    container
      .querySelectorAll(".social-card__count")
      .forEach((el) => (el.textContent = formatK(Number(el.dataset.count))));
  }
}
