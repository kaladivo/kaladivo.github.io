const tracks = [...document.querySelectorAll(".track")];
const links = tracks.map((track) => document.querySelector(`.tracklist a[href="#${track.id}"]`));
const progress = document.querySelector(".player__progress i");
const reducedMotion = matchMedia("(prefers-reduced-motion: reduce)");
const setText = (selector, text) =>
  document.querySelectorAll(selector).forEach((el) => (el.textContent = text));

// "duration" of a track = time it takes to read its liner notes at 200 wpm
const durations = tracks.map((track) => {
  const seconds = Math.round((track.textContent.trim().split(/\s+/).length / 200) * 60);
  return `${Math.floor(seconds / 60)}:${String(seconds % 60).padStart(2, "0")}`;
});
links.forEach((link, i) => (link.querySelector(".dur").textContent = durations[i]));

let current = -1;
let dropTimer;

function show(index) {
  const track = tracks[Math.max(index, 0)];
  setText("[data-now-no]", track.dataset.no);
  setText("[data-label-no]", track.dataset.no);
  setText("[data-label-side]", `Side ${track.dataset.no[0]}`);
  setText("[data-now-title]", track.querySelector(".track__title").textContent);
  setText("[data-now-dur]", durations[Math.max(index, 0)]);
  document.body.classList.toggle("side-b", track.dataset.no[0] === "B");
  tracks.forEach((t, i) => t.classList.toggle("is-current", i === index));
  links.forEach((link, i) => (i === index ? link.setAttribute("aria-current", "true") : link.removeAttribute("aria-current")));
}

function dropNeedle() {
  document.body.classList.add("is-dropping");
  document.body.classList.remove("is-playing");
  clearTimeout(dropTimer);
  dropTimer = setTimeout(() => {
    document.body.classList.remove("is-dropping");
    document.body.classList.add("is-playing");
  }, 450);
}

function sync() {
  const needle = innerHeight * 0.4;
  const index = tracks.findLastIndex((track) => track.getBoundingClientRect().top <= needle);
  const rect = tracks[Math.max(index, 0)].getBoundingClientRect();
  const ended = tracks.at(-1).getBoundingClientRect().bottom < 0;
  const playing = index >= 0 && !ended;

  progress.style.width = playing ? `${Math.min((needle - rect.top) / rect.height, 1) * 100}%` : "0";
  if (index === current) return;
  current = index;
  show(index);
  if (!playing) return document.body.classList.remove("is-playing", "is-dropping");
  dropNeedle();
  history.replaceState(null, "", `#${tracks[index].id}`);
}

function go(step) {
  const target = tracks[Math.min(Math.max(current + step, 0), tracks.length - 1)];
  target.scrollIntoView({ behavior: reducedMotion.matches ? "auto" : "smooth" });
}

let ticking = false;
addEventListener("scroll", () => {
  if (ticking) return;
  ticking = true;
  requestAnimationFrame(() => {
    const video = document.querySelector("video");
new IntersectionObserver(([entry]) => {
  if (entry.isIntersecting && !reducedMotion.matches) video.play().catch(() => {});
  else video.pause();
}).observe(video);

sync();
    ticking = false;
  });
}, { passive: true });
addEventListener("resize", sync);

document.querySelectorAll("[data-go]").forEach((button) =>
  button.addEventListener("click", () => go(Number(button.dataset.go))),
);

addEventListener("keydown", (event) => {
  if (event.metaKey || event.ctrlKey || event.altKey || event.target.closest("input, textarea, video")) return;
  if (event.key === "ArrowRight") go(1);
  if (event.key === "ArrowLeft") go(-1);
});

const video = document.querySelector("video");
new IntersectionObserver(([entry]) => {
  if (entry.isIntersecting && !reducedMotion.matches) video.play().catch(() => {});
  else video.pause();
}).observe(video);

sync();

document.querySelectorAll("[data-copy]").forEach((button) =>
  button.addEventListener("click", async () => {
    await navigator.clipboard.writeText(button.dataset.copy);
    button.textContent = "Copied";
  }),
);
