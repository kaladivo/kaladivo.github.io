const desktop = document.getElementById("desktop");
const loginBtn = document.getElementById("login-btn");
const wins = [...document.querySelectorAll(".win")];
const mobile = matchMedia("(max-width: 760px)");
const menubarHeight = 44;
let topZ = 10;

const clamp = (value, min, max) => Math.min(Math.max(value, min), max);
const openWins = () => wins.filter((win) => !win.hidden);
const focusedWin = () => wins.find((win) => !win.hidden && win.classList.contains("is-focused"));

function syncChrome() {
  const open = new Set(openWins().map((win) => win.id));
  for (const button of document.querySelectorAll(".dock [data-open]"))
    button.classList.toggle("is-open", open.has(button.dataset.open));
  document.body.classList.toggle("has-sheet", open.size > 0);
}

function focusWin(win) {
  win.style.zIndex = ++topZ;
  for (const other of wins) other.classList.toggle("is-focused", other === win);
}

function openWin(id, opener) {
  const win = document.getElementById(id);
  win.hidden = false;
  if (opener) win.opener = opener;
  focusWin(win);
  win.focus({ preventScroll: true });
  win.querySelector("video")?.play().catch(() => {});
  syncChrome();
}

function closeWin(win) {
  win.hidden = true;
  win.querySelector("video")?.pause();
  // reloading the embed is the only way to stop its playback
  for (const iframe of win.querySelectorAll("iframe")) iframe.src = iframe.src;
  const next = openWins().sort((a, b) => b.style.zIndex - a.style.zIndex)[0];
  if (next) focusWin(next);
  (win.opener?.isConnected && win.opener.offsetParent ? win.opener : next)?.focus({ preventScroll: true });
  syncChrome();
}

function startDrag(event) {
  if (mobile.matches || event.target.closest("button")) return;
  const bar = event.currentTarget;
  const win = bar.parentElement;
  const rect = win.getBoundingClientRect();
  const grabX = event.clientX - rect.left;
  const grabY = event.clientY - rect.top;
  bar.setPointerCapture(event.pointerId);

  const move = ({ clientX, clientY }) => {
    win.style.right = win.style.bottom = "auto";
    win.style.left = `${clamp(clientX - grabX, 80 - rect.width, innerWidth - 80)}px`;
    win.style.top = `${clamp(clientY - grabY, menubarHeight, innerHeight - 60)}px`;
  };
  const stop = () => {
    bar.removeEventListener("pointermove", move);
    bar.removeEventListener("pointerup", stop);
    bar.removeEventListener("pointercancel", stop);
  };
  bar.addEventListener("pointermove", move);
  bar.addEventListener("pointerup", stop);
  bar.addEventListener("pointercancel", stop);
}

for (const win of wins) {
  win.addEventListener("pointerdown", () => focusWin(win), true);
  win.addEventListener("focusin", () => focusWin(win));
  win.querySelector(".win-bar").addEventListener("pointerdown", startDrag);
  win.querySelector(".win-close").addEventListener("click", () => closeWin(win));
}

document.addEventListener("click", (event) => {
  const opener = event.target.closest("[data-open]");
  if (!opener) return;
  event.preventDefault();
  openWin(opener.dataset.open, opener);
});

document.addEventListener("keydown", (event) => {
  if (event.key !== "Escape") return;
  const win = focusedWin();
  if (win) closeWin(win);
});

const photoMain = document.getElementById("photo-main");
const thumbs = [...document.querySelectorAll(".photo-thumbs button")];
for (const thumb of thumbs)
  thumb.addEventListener("click", () => {
    const { src, alt } = thumb.querySelector("img");
    Object.assign(photoMain, { src, alt });
    for (const other of thumbs) other.setAttribute("aria-pressed", other === thumb);
  });

const clock = document.getElementById("clock");
const tick = () => {
  const now = new Date();
  clock.dateTime = now.toISOString();
  clock.textContent = now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
};
tick();
setInterval(tick, 30_000);

function setLoggedIn(loggedIn) {
  document.body.classList.toggle("logged-in", loggedIn);
  desktop.inert = !loggedIn;
  if (!loggedIn) loginBtn.focus();
}

loginBtn.addEventListener("click", () => {
  setLoggedIn(true);
  if (openWins().length === 0 && !mobile.matches)
    for (const id of ["win-history", "win-how", "win-contact"]) openWin(id);
});
document.getElementById("logout-btn").addEventListener("click", () => setLoggedIn(false));

setLoggedIn(false);
const linkedWin = wins.find((win) => `#${win.id}` === location.hash);
if (linkedWin || new URLSearchParams(location.search).has("desktop")) loginBtn.click();
if (linkedWin) openWin(linkedWin.id);

document.querySelectorAll("[data-copy]").forEach((button) =>
  button.addEventListener("click", async () => {
    await navigator.clipboard.writeText(button.dataset.copy);
    button.textContent = "Copied";
  }),
);
