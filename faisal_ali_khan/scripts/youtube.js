// Lite YouTube facade: shows a thumbnail; loads the iframe only on click.
export function initYouTube() {
  const players = document.querySelectorAll(".yt-lite[data-id]");
  if (!players.length) return;

  players.forEach((el) => {
    const id = el.dataset.id;
    el.style.backgroundImage = `url(https://i.ytimg.com/vi/${id}/hqdefault.jpg)`;
    el.setAttribute("role", "button");
    el.setAttribute("tabindex", "0");

    const load = () => {
      if (el.classList.contains("is-loaded")) return;
      const iframe = document.createElement("iframe");
      iframe.src = `https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0`;
      iframe.title = "YouTube video player";
      iframe.allow =
        "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture";
      iframe.allowFullscreen = true;
      el.innerHTML = "";
      el.appendChild(iframe);
      el.classList.add("is-loaded");
    };

    el.addEventListener("click", load);
    el.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        load();
      }
    });
  });
}
