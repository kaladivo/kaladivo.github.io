const reducedMotion = matchMedia("(prefers-reduced-motion: reduce)");

const revealObserver = new IntersectionObserver(
  (entries) =>
    entries
      .filter((entry) => entry.isIntersecting)
      .forEach((entry) => {
        entry.target.classList.add("in");
        revealObserver.unobserve(entry.target);
      }),
  { threshold: 0.15 },
);
document.querySelectorAll(".reveal").forEach((el) => revealObserver.observe(el));

const marquee = document.querySelector(".marquee");
if (!reducedMotion.matches) {
  for (let i = 0; i < 3; i++) {
    const clone = marquee.firstElementChild.cloneNode(true);
    clone.setAttribute("aria-hidden", "true");
    marquee.append(clone);
  }
} else {
  document.querySelector("video").removeAttribute("autoplay");
  document.querySelector("video").controls = true;
}

const timeline = document.querySelector(".timeline");
const track = timeline.querySelector(".track");
const canPin = matchMedia("(min-width: 900px) and (min-height: 700px) and (prefers-reduced-motion: no-preference)");

function layoutTimeline() {
  timeline.classList.toggle("pinned", canPin.matches);
  timeline.style.height = canPin.matches ? `${track.scrollWidth - innerWidth + innerHeight}px` : "";
  track.style.transform = "";
  onScroll();
}

const heroName = document.querySelector(".hero .name");
const numbers = document.querySelectorAll(".spread .num");

function onScroll() {
  if (timeline.classList.contains("pinned")) {
    const maxShift = timeline.offsetHeight - innerHeight;
    const shift = Math.min(Math.max(-timeline.getBoundingClientRect().top, 0), maxShift);
    track.style.transform = `translateX(${-shift}px)`;
  }
  if (reducedMotion.matches) return;
  heroName.style.setProperty("--shift", `${scrollY * -0.25}px`);
  numbers.forEach((num) => {
    const offset = num.parentElement.getBoundingClientRect().top - innerHeight / 2;
    num.style.setProperty("--drift", `${offset * 0.12}px`);
  });
}

addEventListener("scroll", onScroll, { passive: true });
addEventListener("resize", layoutTimeline);
addEventListener("load", layoutTimeline);
layoutTimeline();

document.querySelectorAll(".sticker").forEach((sticker) => {
  let origin = { x: 0, y: 0 };
  const position = { x: 0, y: 0 };
  sticker.addEventListener("pointerdown", (event) => {
    if (event.pointerType !== "mouse") return;
    sticker.setPointerCapture(event.pointerId);
    origin = { x: event.clientX - position.x, y: event.clientY - position.y };
  });
  sticker.addEventListener("pointermove", (event) => {
    if (!sticker.hasPointerCapture(event.pointerId)) return;
    position.x = event.clientX - origin.x;
    position.y = event.clientY - origin.y;
    sticker.style.setProperty("--dx", `${position.x}px`);
    sticker.style.setProperty("--dy", `${position.y}px`);
  });
});
