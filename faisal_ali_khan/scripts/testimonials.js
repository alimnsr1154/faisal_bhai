// Testimonials — vanilla scroll-snap carousel with arrows + infinite loop.
// Videos load only when their card scrolls into view.

const cards = [
  {
    src: "assets/testimonails/4",
    message:
      "Faisal has a great visual skill for technology and start ups when it comes to marketing and sales. He helped both of our companies get great attention in B2B and B2C markets. His ability to connect a brand with customers is really impressive — we are 100% satisfied and always love to get his services.",
    name: "Louis",
    designation: "Co-founder, PromoML — Netherlands",
  },
  {
    src: "assets/testimonails/5",
    message:
      "UNDP knows the importance of content creation in the modern digital world and Faisal helped us a lot with communication and video content for our initiatives and programs. His devotion to climate-change projects and documentaries is extraordinary, and the way he crafts storytelling and makes content engaging is impressive. We're looking forward to more collaborations!",
    name: "Ammara Durrani",
    designation: "Assistant Resident Representative — UNDP, Pakistan",
  },
  {
    src: "assets/testimonails/2",
    message:
      "We were launching our app and needed a high-end, celebrity-included marketing campaign and Faisal did amazing work — way beyond our expectations. Later, for Project Lambo, a crypto and blockchain project, he again helped us with branding and high-quality visuals and video. I definitely recommend him!",
    name: "Iqbal Ullah",
    designation: "OUI SELECT LTD — London, UK",
  },
  {
    src: "assets/testimonails/1",
    message:
      "We were launching our app and needed a high-end, celebrity-included marketing campaign and Faisal did amazing work — way beyond our expectations. His branding and video creation are top quality. I definitely recommend him!",
    name: "Emman Ali",
    designation: "OUI SELECT LTD — London, UK",
  },
  {
    src: "assets/testimonails/3",
    message:
      "NGOs and international organizations are always a tricky field for documentaries and agenda-based films, and Faisal always did a great job working for UNDP, USIP and now UN Migration. His storytelling is mature and emotional — exactly what these initiatives need. I hope he keeps serving humanity through his artistic branding, web development and video creation.",
    name: "Suzana Paklar",
    designation: "Senior Program Coordinator — UN Migration",
  },
];

function makeCard(card) {
  const item = document.createElement("article");
  item.className = "t-card reveal";

  const video = document.createElement("video");
  video.className = "t-card__media";
  video.muted = true;
  video.loop = true;
  video.playsInline = true;
  video.preload = "none";
  video.poster = `${card.src}.poster.jpg`;
  const source = document.createElement("source");
  source.dataset.src = `${card.src}.opt.mp4`;
  source.type = "video/mp4";
  video.appendChild(source);

  const body = document.createElement("div");
  body.className = "t-card__body";
  body.innerHTML = `
    <p class="t-card__quote">${card.message}</p>
    <p class="t-card__name">${card.name}</p>
    <p class="t-card__role">${card.designation}</p>`;

  item.append(video, body);
  return item;
}

export function initTestimonials() {
  const track = document.getElementById("testimonial-track");
  if (!track) return;

  // Build real cards
  cards.forEach((card) => track.appendChild(makeCard(card)));

  // Clone first and last for infinite loop
  const realCards = Array.from(track.querySelectorAll(".t-card"));
  const firstClone = realCards[0].cloneNode(true);
  const lastClone = realCards[realCards.length - 1].cloneNode(true);
  firstClone.classList.add("clone");
  lastClone.classList.add("clone");
  track.appendChild(firstClone);
  track.insertBefore(lastClone, realCards[0]);

  // Start positioned at real first card (index 1 due to prepended clone)
  const allCards = () => Array.from(track.querySelectorAll(".t-card"));

  let currentIdx = 1;

  const scrollToCard = (idx, smooth = true) => {
    const card = allCards()[idx];
    if (!card) return;
    const gap = parseFloat(getComputedStyle(track).gap) || 0;
    const left = card.offsetLeft - track.offsetLeft - gap / 2;
    track.scrollTo({ left: Math.max(0, left), behavior: smooth ? "smooth" : "instant" });
  };

  const onScrollEnd = () => {
    const total = allCards().length;
    if (currentIdx === 0) {
      currentIdx = total - 2;
      scrollToCard(currentIdx, false);
    } else if (currentIdx === total - 1) {
      currentIdx = 1;
      scrollToCard(currentIdx, false);
    }
  };

  if ("onscrollend" in window) {
    track.addEventListener("scrollend", onScrollEnd);
  } else {
    let t;
    track.addEventListener("scroll", () => {
      clearTimeout(t);
      t = setTimeout(onScrollEnd, 120);
    });
  }

  // Keep currentIdx in sync during manual swipes
  let raf;
  track.addEventListener("scroll", () => {
    cancelAnimationFrame(raf);
    raf = requestAnimationFrame(() => {
      const cards = allCards();
      let closest = 0;
      let minDist = Infinity;
      cards.forEach((c, i) => {
        const dist = Math.abs(c.getBoundingClientRect().left - track.getBoundingClientRect().left);
        if (dist < minDist) { minDist = dist; closest = i; }
      });
      currentIdx = closest;
    });
  });

  // Arrow buttons
  const prevBtn = document.getElementById("testimonial-prev");
  const nextBtn = document.getElementById("testimonial-next");
  if (prevBtn) {
    prevBtn.addEventListener("click", () => {
      currentIdx -= 1;
      scrollToCard(currentIdx);
    });
  }
  if (nextBtn) {
    nextBtn.addEventListener("click", () => {
      currentIdx += 1;
      scrollToCard(currentIdx);
    });
  }

  // Start at real first card
  scrollToCard(currentIdx, false);

  // Lazy-load + play each card's video only when visible.
  if ("IntersectionObserver" in window) {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const v = entry.target;
          const source = v.querySelector("source[data-src]");
          if (entry.isIntersecting) {
            if (source && !source.src) {
              source.src = source.dataset.src;
              v.load();
            }
            v.play?.().catch(() => {});
          } else {
            v.pause?.();
          }
        });
      },
      { threshold: 0.4 }
    );
    track.querySelectorAll("video").forEach((v) => io.observe(v));
  }
}
