import { blocks, contact, esc, externalLink, indent, inline, media, musicLinks } from "./html.mjs";

const renderLink = (label, url) =>
  url.endsWith(".mp4") ? `<a class="play-link" href="${url}" data-open="win-dance">${label}</a>` : externalLink(label, url);

const roleItems = (roles) => roles.map((role) => `<li>${esc(role)}</li>`).join("");

const openButton = (win, label) =>
  `<button class="btn" type="button" data-open="${win}">Open ${label} <span aria-hidden="true">→</span></button>`;

const extras = { fillo: openButton("win-fillo", "FilloApp"), music: openButton("win-music", "Music") };

const linkLines = (item) => (item.links ?? []).map((l) => `<p class="meta">${inline(l, renderLink)}</p>`);

const metaLines = (item) =>
  item.dates
    ? [`<p class="meta"><span>${esc(item.dates)}</span>${item.company ? ` <span>${esc(item.company)}</span>` : ""}</p>`]
    : linkLines(item);

const job = (item, head, tail) => `<section class="job">
  <h2>${esc(item.title)}</h2>
  ${indent([...head, blocks(item.body, { renderLink }), ...tail].filter(Boolean).join("\n"), 2)}
</section>`;

const jobs = (items) => items.map((item) => job(item, metaLines(item), [extras[item.id]])).join("\n\n");

const historyDoc = (c) => `<h1>${esc(c.experience.title)}</h1>

${jobs(c.experience.items)}`;

const activeDoc = (c) => `<h1>${esc(c.activeProjects.title)}</h1>

${jobs(c.activeProjects.items)}`;

const archiveDoc = (c) => `<h1>${esc(c.archive.title)}</h1>
<p>${esc(c.archive.intro)}</p>

${jobs(c.archive.items)}`;

const howDoc = (c) => `<h1>${esc(c.howIWork.title)}</h1>
${blocks(c.howIWork.body)}`;

const contactDoc = (c) => `<h1>${esc(c.contact.title)}</h1>
${contact(c.contact, ' class="btn"')}`;

const personalDoc = (c) => `<h1>${esc(c.personal.title)}</h1>
<p>${esc(c.personal.intro)}</p>

${c.personal.items.map((item) => job(item, [], [...linkLines(item), extras[item.id]])).join("\n\n")}`;

const musicEmbed = (text) => {
  const { name, id, youtube } = media(text);
  return youtube
    ? `<iframe class="yt" src="https://www.youtube.com/embed/${id}" title="YouTube video" loading="lazy" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`
    : `<iframe src="https://open.spotify.com/embed/artist/${id}" title="Spotify: ${name}" height="152" loading="lazy" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"></iframe>`;
};

export default (c) => `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(c.name)} ${esc(c.tagline)}</title>
<meta name="description" content="${esc(c.motto)}">
<link rel="icon" href="/assets/favicon.png">
<link rel="apple-touch-icon" href="/assets/favicon.png">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@500;700&family=Newsreader:ital,opsz,wght@0,6..72,400;0,6..72,600;1,6..72,400&family=Roboto:wght@400;500&family=Space+Grotesk:wght@500;700&display=swap" rel="stylesheet">
<link rel="stylesheet" href="/style.css">
<noscript><style>
  .login { display: none }
  .desktop { position: static; overflow: visible }
  .win[hidden] { display: flex; position: static; width: auto; height: auto; margin: 24px }
</style></noscript>
</head>
<body>

<svg class="sprite" aria-hidden="true">
  <symbol id="i-doc" viewBox="0 0 48 48">
    <path d="M9 4h21l10 10v30H9z" fill="var(--tint)" stroke="currentColor" stroke-width="3" stroke-linejoin="round"/>
    <path d="M30 4v10h10" fill="#fff7e8" stroke="currentColor" stroke-width="3" stroke-linejoin="round"/>
    <path d="M16 24h17M16 31h17M16 38h10" stroke="currentColor" stroke-width="3" stroke-linecap="round"/>
  </symbol>
  <symbol id="i-music" viewBox="0 0 48 48">
    <circle cx="24" cy="24" r="20" fill="currentColor"/>
    <circle cx="24" cy="24" r="13" fill="none" stroke="#fff7e8" stroke-width="1.5" opacity=".5"/>
    <circle cx="24" cy="24" r="8" fill="var(--tint)"/>
    <circle cx="24" cy="24" r="2" fill="currentColor"/>
  </symbol>
  <symbol id="i-photos" viewBox="0 0 48 48">
    <rect x="4" y="8" width="40" height="32" rx="3" fill="var(--tint)" stroke="currentColor" stroke-width="3"/>
    <circle cx="16" cy="19" r="4" fill="#fff7e8" stroke="currentColor" stroke-width="2.5"/>
    <path d="M6 38l12-12 8 8 6-6 10 10z" fill="currentColor"/>
  </symbol>
  <symbol id="i-video" viewBox="0 0 48 48">
    <rect x="11" y="4" width="26" height="40" rx="4" fill="var(--tint)" stroke="currentColor" stroke-width="3"/>
    <path d="M20 17v14l12-7z" fill="currentColor"/>
  </symbol>
  <symbol id="i-web" viewBox="0 0 48 48">
    <rect x="4" y="7" width="40" height="34" rx="3" fill="#fff7e8" stroke="currentColor" stroke-width="3"/>
    <path d="M4 17h40" stroke="currentColor" stroke-width="3"/>
    <circle cx="10" cy="12" r="1.8" fill="currentColor"/><circle cx="16" cy="12" r="1.8" fill="currentColor"/>
    <path d="M18 23h13M18 23v13M18 29h10" stroke="var(--tint)" stroke-width="3.5" stroke-linecap="square"/>
  </symbol>
</svg>

<section class="login" id="login" aria-label="David Novák at a waterfall">
  <h1>${esc(c.name)}</h1>
  <div class="marquee marquee-band">
    <ul class="marquee-track">
      ${roleItems(c.roles)}
    </ul>
    <ul class="marquee-track" aria-hidden="true">
      ${roleItems(c.roles)}
    </ul>
  </div>
  <p class="login-motto">${esc(c.motto)}</p>
  <nav class="modes" aria-label="Pick how you want to read this">
    <h2 class="modes-title">Pick how you want to read this</h2>
    <button class="mode mode-main" id="login-btn" type="button" style="--tint:var(--yellow)">
      <span class="mode-for">for the curious</span>
      <span class="mode-name">DaveOS</span>
      <span class="mode-text">A desktop you can click around. Docs open as files, music has a player.</span>
      <span class="mode-go">Log in <span aria-hidden="true">→</span></span>
    </button>
    <a class="mode" href="/album/" style="--tint:var(--orange)">
      <span class="mode-for">for music people</span>
      <span class="mode-name">The album</span>
      <span class="mode-text">The same CV pressed as a vinyl record. Scroll it track by track.</span>
      <span class="mode-go">Play <span aria-hidden="true">→</span></span>
    </a>
    <a class="mode" href="/cv/" style="--tint:var(--paper)">
      <span class="mode-for">for people in a hurry</span>
      <span class="mode-name">Plain CV</span>
      <span class="mode-text">One page, top to bottom. Prints to PDF.</span>
      <span class="mode-go">Read <span aria-hidden="true">→</span></span>
    </a>
  </nav>
</section>

<div class="desktop" id="desktop">
  <header class="menubar">
    <span class="menubar-brand">DaveOS</span>
    <span class="menubar-title">${esc(c.name)} ${esc(c.tagline)}</span>
    <time class="menubar-clock" id="clock"></time>
    <a class="menubar-link" href="${c.contact.github.url}" target="_blank" rel="noopener">${c.contact.github.label}</a>
    <button class="menubar-btn" id="logout-btn" type="button">Log out</button>
  </header>

  <aside class="profile" aria-label="Profile">
    <img class="profile-photo" src="/assets/david-2.jpg" alt="David Novák in a floral shirt, smiling" width="1400" height="1400" loading="lazy">
    <p class="profile-name">${esc(c.name)}</p>
    <div class="marquee">
      <ul class="marquee-track">
        ${roleItems(c.roles)}
      </ul>
      <ul class="marquee-track" aria-hidden="true">
        ${roleItems(c.roles)}
      </ul>
    </div>
    <p class="profile-motto">${esc(c.motto)}</p>
    <a class="profile-link" href="${c.contact.github.url}" target="_blank" rel="noopener">${c.contact.github.label} ↗</a>
  </aside>

  <nav class="icons" aria-label="Desktop">
    <button type="button" data-open="win-history" style="--tint:var(--yellow)"><svg><use href="#i-doc"/></svg><span>PROFESSIONAL_<wbr>HISTORY.md</span></button>
    <button type="button" data-open="win-active" style="--tint:var(--green)"><svg><use href="#i-doc"/></svg><span>ACTIVE_<wbr>PROJECTS.md</span></button>
    <button type="button" data-open="win-archive" style="--tint:var(--orange)"><svg><use href="#i-doc"/></svg><span>PROJECT_<wbr>ARCHIVE.md</span></button>
    <button type="button" data-open="win-how" style="--tint:var(--pink)"><svg><use href="#i-doc"/></svg><span>HOW_I_<wbr>WORK.md</span></button>
    <button type="button" data-open="win-personal" style="--tint:var(--sky)"><svg><use href="#i-doc"/></svg><span>PERSONAL_<wbr>LIFE.md</span></button>
    <button type="button" data-open="win-music" style="--tint:var(--pink)"><svg><use href="#i-music"/></svg><span>Music</span></button>
    <button type="button" data-open="win-photos" style="--tint:var(--green)"><svg><use href="#i-photos"/></svg><span>Photos</span></button>
    <button type="button" data-open="win-dance" style="--tint:var(--orange)"><svg><use href="#i-video"/></svg><span>dancing.mp4</span></button>
    <button type="button" data-open="win-contact" style="--tint:var(--yellow)"><svg><use href="#i-doc"/></svg><span>CONTACT.md</span></button>
  </nav>

  <main class="windows">

    <section class="win win-doc" id="win-history" style="--tint:var(--yellow)" aria-labelledby="t-history" tabindex="-1" hidden>
      <header class="win-bar"><h2 class="win-title" id="t-history">PROFESSIONAL_HISTORY.md</h2><button class="win-close" type="button" aria-label="Close">✕</button></header>
      <article class="win-body doc">
        ${indent(historyDoc(c), 8)}
      </article>
      <footer class="win-status"><span>docs/PROFESSIONAL_HISTORY.md</span><span>typed by David, not by AI</span></footer>
    </section>

    <section class="win win-doc" id="win-active" style="--tint:var(--green)" aria-labelledby="t-active" tabindex="-1" hidden>
      <header class="win-bar"><h2 class="win-title" id="t-active">ACTIVE_PROJECTS.md</h2><button class="win-close" type="button" aria-label="Close">✕</button></header>
      <article class="win-body doc">
        ${indent(activeDoc(c), 8)}
      </article>
      <footer class="win-status"><span>docs/ACTIVE_PROJECTS.md</span><span>typed by David, not by AI</span></footer>
    </section>

    <section class="win win-doc" id="win-archive" style="--tint:var(--orange)" aria-labelledby="t-archive" tabindex="-1" hidden>
      <header class="win-bar"><h2 class="win-title" id="t-archive">PROJECT_ARCHIVE.md</h2><button class="win-close" type="button" aria-label="Close">✕</button></header>
      <article class="win-body doc">
        ${indent(archiveDoc(c), 8)}
      </article>
      <footer class="win-status"><span>docs/PROJECT_ARCHIVE.md</span><span>typed by David, not by AI</span></footer>
    </section>

    <section class="win win-doc" id="win-how" style="--tint:var(--pink)" aria-labelledby="t-how" tabindex="-1" hidden>
      <header class="win-bar"><h2 class="win-title" id="t-how">HOW_I_WORK.md</h2><button class="win-close" type="button" aria-label="Close">✕</button></header>
      <article class="win-body doc">
        ${indent(howDoc(c), 8)}
      </article>
      <footer class="win-status"><span>docs/HOW_I_WORK.md</span><span>typed by David, not by AI</span></footer>
    </section>

    <section class="win win-doc" id="win-contact" style="--tint:var(--yellow)" aria-labelledby="t-contact" tabindex="-1" hidden>
      <header class="win-bar"><h2 class="win-title" id="t-contact">CONTACT.md</h2><button class="win-close" type="button" aria-label="Close">✕</button></header>
      <article class="win-body doc">
        ${indent(contactDoc(c), 8)}
      </article>
      <footer class="win-status"><span>docs/CONTACT.md</span><span>typed by David, not by AI</span></footer>
    </section>

    <section class="win win-doc" id="win-personal" style="--tint:var(--sky)" aria-labelledby="t-personal" tabindex="-1" hidden>
      <header class="win-bar"><h2 class="win-title" id="t-personal">PERSONAL_LIFE.md</h2><button class="win-close" type="button" aria-label="Close">✕</button></header>
      <article class="win-body doc">
        ${indent(personalDoc(c), 8)}
      </article>
      <footer class="win-status"><span>docs/PERSONAL_LIFE.md</span><span>typed by David, not by AI</span></footer>
    </section>

    <section class="win win-music" id="win-music" style="--tint:var(--pink)" aria-labelledby="t-music" tabindex="-1" hidden>
      <header class="win-bar"><h2 class="win-title" id="t-music">Music</h2><button class="win-close" type="button" aria-label="Close">✕</button></header>
      <div class="win-body music">
        ${indent(musicLinks(c).map(musicEmbed).join("\n"), 8)}
      </div>
    </section>

    <section class="win win-photos" id="win-photos" style="--tint:var(--green)" aria-labelledby="t-photos" tabindex="-1" hidden>
      <header class="win-bar"><h2 class="win-title" id="t-photos">Photos</h2><button class="win-close" type="button" aria-label="Close">✕</button></header>
      <div class="win-body photos">
        <img class="photo-main" id="photo-main" src="/assets/btc-prague.jpg" alt="David taking a selfie with the Vexl mascot at BTC Prague" loading="lazy">
        <div class="photo-thumbs">
          <button type="button" aria-label="Show BTC Prague photo" aria-pressed="true"><img src="/assets/btc-prague.jpg" alt="David taking a selfie with the Vexl mascot at BTC Prague" loading="lazy"></button>
          <button type="button" aria-label="Show portrait in a tree alley" aria-pressed="false"><img src="/assets/david-1.jpg" alt="David Novák smiling in a tree alley" loading="lazy"></button>
          <button type="button" aria-label="Show portrait in a floral shirt" aria-pressed="false"><img src="/assets/david-2.jpg" alt="David Novák in a floral shirt, smiling" loading="lazy"></button>
        </div>
      </div>
    </section>

    <section class="win win-dance" id="win-dance" style="--tint:var(--orange)" aria-labelledby="t-dance" tabindex="-1" hidden>
      <header class="win-bar"><h2 class="win-title" id="t-dance">dancing.mp4</h2><button class="win-close" type="button" aria-label="Close">✕</button></header>
      <div class="win-body dance">
        <video src="/assets/dancing.mp4" muted loop playsinline controls preload="none" aria-label="Dancing at a dance party"></video>
      </div>
    </section>

    <section class="win win-fillo" id="win-fillo" style="--tint:var(--sky)" aria-labelledby="t-fillo" tabindex="-1" hidden>
      <header class="win-bar"><h2 class="win-title" id="t-fillo">FilloApp</h2><button class="win-close" type="button" aria-label="Close">✕</button></header>
      <div class="win-url"><span aria-hidden="true">← →</span><span class="win-url-field">filloapp.com</span></div>
      <div class="win-body fillo">
        <div class="fillo-bar">
          <img src="/assets/filloapp/logo.png" alt="" width="32" height="32">
          <strong>FilloApp</strong>
          <span>About</span><span>FAQ</span><span class="fillo-btn">Enter app</span>
        </div>
        <div class="fillo-hero">
          <div>
            <p class="fillo-h1">Let your documents be filled</p>
            <p class="fillo-sub">And get time for what really matters</p>
            <span class="fillo-btn">Create an account</span>
          </div>
          <img src="/assets/filloapp/hero.svg" alt="FilloApp hero illustration" loading="lazy">
        </div>
        <div class="fillo-steps">
          <div><img src="/assets/filloapp/expl1.svg" alt="" loading="lazy"><p class="fillo-h2">Select your document templates</p><p>Mark all field by puting them between curly brackets {{}}. For example {{name}} will be changed to Paul, Kate and other participants.</p></div>
          <div><img src="/assets/filloapp/expl2.svg" alt="" loading="lazy"><p class="fillo-h2">Let the participants fill the fields</p><p>Fill in your fields and start the magic.</p></div>
          <div><img src="/assets/filloapp/expl3.svg" alt="" loading="lazy"><p class="fillo-h2">All documents get filled</p><p>All documents will be created and filled with the requested fields</p></div>
        </div>
        <div class="fillo-drive">
          <p class="fillo-h2">Works best on your Google Drive</p>
          <img src="/assets/filloapp/drive.svg" alt="Google Drive" loading="lazy"><img src="/assets/filloapp/docs.svg" alt="Google Docs" loading="lazy"><img src="/assets/filloapp/sheets.svg" alt="Google Sheets" loading="lazy"><img src="/assets/filloapp/pdf.svg" alt="PDF" loading="lazy">
        </div>
      </div>
    </section>

  </main>

  <nav class="dock" aria-label="Dock">
    <button type="button" data-open="win-history" aria-label="PROFESSIONAL_HISTORY.md" title="PROFESSIONAL_HISTORY.md" style="--tint:var(--yellow)"><svg><use href="#i-doc"/></svg></button>
    <button type="button" data-open="win-active" aria-label="ACTIVE_PROJECTS.md" title="ACTIVE_PROJECTS.md" style="--tint:var(--green)"><svg><use href="#i-doc"/></svg></button>
    <button type="button" data-open="win-archive" aria-label="PROJECT_ARCHIVE.md" title="PROJECT_ARCHIVE.md" style="--tint:var(--orange)"><svg><use href="#i-doc"/></svg></button>
    <button type="button" data-open="win-how" aria-label="HOW_I_WORK.md" title="HOW_I_WORK.md" style="--tint:var(--pink)"><svg><use href="#i-doc"/></svg></button>
    <button type="button" data-open="win-personal" aria-label="PERSONAL_LIFE.md" title="PERSONAL_LIFE.md" style="--tint:var(--sky)"><svg><use href="#i-doc"/></svg></button>
    <button type="button" data-open="win-contact" aria-label="CONTACT.md" title="CONTACT.md" style="--tint:var(--yellow)"><svg><use href="#i-doc"/></svg></button>
    <span class="dock-sep" aria-hidden="true"></span>
    <button type="button" data-open="win-music" aria-label="Music" title="Music" style="--tint:var(--pink)"><svg><use href="#i-music"/></svg></button>
    <button type="button" data-open="win-photos" aria-label="Photos" title="Photos" style="--tint:var(--green)"><svg><use href="#i-photos"/></svg></button>
    <button type="button" data-open="win-dance" aria-label="dancing.mp4" title="dancing.mp4" style="--tint:var(--orange)"><svg><use href="#i-video"/></svg></button>
  </nav>
</div>

<script src="/script.js"></script>
</body>
</html>
`;
