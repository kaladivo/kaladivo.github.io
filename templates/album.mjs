import { blocks, contact, esc, indent, inline, linkWithoutVideo, media } from "./html.mjs";

const body = (item) => blocks(item.body, { renderLink: linkWithoutVideo, quote: (html) => `<blockquote><p>${html}</p></blockquote>` });

const counter = (side) => {
  let n = 0;
  return (item) => ({ ...item, no: `${side}${++n}` });
};

const anchor = (track) => `${track.no.toLowerCase()}-${track.id}`;

const roleItems = (roles) => roles.map((role) => `<li>${esc(role)}</li>`).join("\n");

const trackLink = (track) =>
  `<li><a href="#${anchor(track)}"><i>${track.no}</i><span class="t">${esc(track.title)}${track.dates ? ` <small>${esc(track.dates)}</small>` : ""}</span><span class="dur"></span></a></li>`;

const suite = (title) => `<li class="suite">${esc(title)}</li>`;

const track = (t, level, html, cls = "track") => `<article class="${cls}" id="${anchor(t)}" data-no="${t.no}">
  <header class="track__head"><span class="track__no">${t.no}</span><h${level} class="track__title">${esc(t.title)}</h${level}></header>
  ${indent(html, 2)}
</article>`;

const linksMeta = (item) => item.links && `<p class="track__meta">${item.links.map((l) => inline(l)).join("<br>")}</p>`;

const jobMeta = (item) =>
  `<p class="track__meta"><time>${esc(item.dates)}</time>${item.company ? `<br>${esc(item.company)}` : ""}</p>`;

const lines = (...parts) => parts.filter(Boolean).join("\n");

const VEXL_PHOTO = `<figure class="photo">
  <img src="../assets/btc-prague.jpg" alt="David taking a selfie with the Vexl mascot at BTC Prague" loading="lazy" width="1086" height="724">
  <figcaption>BTC Prague</figcaption>
</figure>`;

const FILLO_MOCKUP = `<figure class="browser" aria-label="FilloApp landing page as it looked">
  <div class="browser__bar"><i></i><i></i><i></i><span>filloapp.com</span></div>
  <div class="fillo">
    <div class="fillo__nav"><img src="../assets/filloapp/logo.png" alt="" width="28" height="28"><b>FilloApp</b><span>About</span><span>FAQ</span><span class="fillo__btn fillo__btn--outline">Enter app</span></div>
    <div class="fillo__hero">
      <div>
        <strong>Let your documents be filled</strong>
        <em>And get time for what really matters</em>
        <span class="fillo__btn">Create an account</span>
      </div>
      <img src="../assets/filloapp/hero.svg" alt="" loading="lazy">
    </div>
    <div class="fillo__steps">
      <div><img src="../assets/filloapp/expl1.svg" alt="" loading="lazy"><b>Select your document templates</b></div>
      <div><img src="../assets/filloapp/expl2.svg" alt="" loading="lazy"><b>Let the participants fill the fields</b></div>
      <div><img src="../assets/filloapp/expl3.svg" alt="" loading="lazy"><b>All documents get filled</b></div>
    </div>
  </div>
</figure>`;

const parked = (item) => `<section${item.id === "fillo" ? ' class="parked__fillo"' : ""}>
  <h4>${esc(item.title)}</h4>
  ${indent(lines(linksMeta(item), body(item), item.id === "fillo" && FILLO_MOCKUP), 2)}
</section>`;

const musicFigure = (text) => {
  const { name, id, youtube } = media(text);
  return youtube
    ? `<figure class="music__video">
  <figcaption>${inline(text)}</figcaption>
  <iframe src="https://www.youtube-nocookie.com/embed/${id}" title="YouTube video" loading="lazy" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
</figure>`
    : `<figure>
  <figcaption>${inline(text)}</figcaption>
  <iframe src="https://open.spotify.com/embed/artist/${id}?theme=0" title="${name} on Spotify" height="352" loading="lazy" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"></iframe>
</figure>`;
};

const personalTracks = {
  music: (t) => track(t, 4, lines(body(t), `<div class="music">\n  ${indent(t.links.map(musicFigure).join("\n"), 2)}\n</div>`), "track track--wide"),
  dancing: (t) =>
    track(t, 4, `<div class="dance">
  ${indent(body(t), 2)}
  <video src="../assets/dancing.mp4" muted loop playsinline controls preload="metadata" aria-label="David dancing with a partner"></video>
</div>`),
  fitness: (t) =>
    track(t, 4, `<div class="gym">
  <img src="../assets/gym.jpg" alt="David Novák taking a mirror selfie on a bench in the gym" loading="lazy" width="588" height="520">
  ${indent(body(t), 2)}
</div>`),
};

const personalTrack = (t) => (personalTracks[t.id] ?? ((t) => track(t, 4, body(t))))(t);

export default (c) => {
  const a = counter("A");
  const how = a(c.howIWork);
  const projects = c.activeProjects.items.map(a);
  const jobs = c.experience.items.map(a);
  const archive = a(c.archive);
  const b = counter("B");
  const personal = c.personal.items.map(b);
  const contactTrack = b(c.contact);

  return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(c.name)}</title>
<meta name="description" content="${esc(c.motto)}">
<link rel="icon" href="../assets/favicon.png">
<link rel="apple-touch-icon" href="../assets/favicon.png">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Archivo:wdth,wght@75..100,400..700&family=Doto:wght@700;900&family=Fraunces:ital,opsz,wght,SOFT@0,9..144,300..900,0..100;1,9..144,300..900,0..100&display=swap" rel="stylesheet">
<link rel="stylesheet" href="style.css">
</head>
<body>

<header class="hero" id="top">
  <div class="hero__stage">
    <div class="cover">
      <div class="record record--hero" aria-hidden="true">
        <div class="record__disc">
          <div class="record__label"><span data-label-side>Side A</span><b data-label-no>A1</b></div>
        </div>
      </div>
      <figure class="sleeve">
        <img src="../assets/david-2.jpg" alt="David Novák smiling in a floral shirt, shot on film" width="1400" height="1400">
        <span class="sleeve__mark" aria-hidden="true">Stereo</span>
        <span class="sleeve__cat" aria-hidden="true">DN&nbsp;001</span>
      </figure>
    </div>
    <div class="hero__title">
      <h1>${esc(c.name)} <span>${esc(c.tagline)}</span></h1>
      <p class="hero__motto">${esc(c.motto)}</p>
      <p class="hero__links">
        <a class="btn" href="#tracklist">Tracklist <span aria-hidden="true">↓</span></a>
        <a class="btn" href="${c.contact.github.url}" target="_blank" rel="noopener">${c.contact.github.label} <span aria-hidden="true">↗</span></a>
      </p>
    </div>
  </div>

  <div class="ticker">
    <div class="ticker__run">
      <ul>
        ${indent(roleItems(c.roles), 8)}
      </ul>
      <ul aria-hidden="true">
        ${indent(roleItems(c.roles), 8)}
      </ul>
    </div>
  </div>
</header>

<main>
<nav class="tracklist" id="tracklist" aria-label="Tracklist">
  <div class="tracklist__side">
    <h2><span>Side</span> A</h2>
    <ol>
      ${indent(lines(
        trackLink(how),
        suite(c.activeProjects.title),
        ...projects.map(trackLink),
        suite(c.experience.title),
        ...jobs.map(trackLink),
        `<li class="suite" aria-hidden="true">&nbsp;</li>`,
        trackLink(archive),
      ), 6)}
    </ol>
  </div>
  <div class="tracklist__side">
    <h2><span>Side</span> B</h2>
    <ol>
      ${indent(lines(suite(c.personal.title), ...personal.map(trackLink), trackLink(contactTrack)), 6)}
    </ol>
    <figure class="inner-sleeve">
      <img src="../assets/david-1.jpg" alt="Portrait of David Novák in a tree alley" loading="lazy" width="1106" height="1400">
    </figure>
  </div>
</nav>

<div class="liner">
  <aside class="deck" aria-hidden="true">
    <div class="deck__plinth">
      <div class="record">
        <div class="record__disc">
          <div class="record__label"><span data-label-side>Side A</span><b data-label-no>A1</b></div>
        </div>
      </div>
      <div class="deck__arm"></div>
      <span class="deck__led"></span>
    </div>
    <p class="deck__now"><span data-now-no>A1</span><strong data-now-title>${esc(how.title)}</strong></p>
  </aside>

  <div class="notes">
    <section class="side" aria-labelledby="side-a">
      <h2 class="side__title" id="side-a"><span>Side</span> A</h2>

      ${indent(track(how, 3, body(how)), 6)}

      <h3 class="suite-title">${esc(c.activeProjects.title)}</h3>

      ${indent(projects.map((p) => track(p, 4, lines(linksMeta(p), body(p), p.id === "vexl" && VEXL_PHOTO))).join("\n\n"), 6)}

      <h3 class="suite-title">${esc(c.experience.title)}</h3>

      ${indent(jobs.map((job) => track(job, 4, lines(jobMeta(job), body(job)))).join("\n\n"), 6)}

      ${indent(track(archive, 3, `<p>${esc(archive.intro)}</p>

<div class="parked">
  ${indent(archive.items.map(parked).join("\n"), 2)}
</div>`), 6)}
    </section>

    <section class="side side--b" aria-labelledby="side-b">
      <h2 class="side__title" id="side-b"><span>Side</span> B</h2>
      <h3 class="suite-title">${esc(c.personal.title)}</h3>
      <p class="side__intro">${esc(c.personal.intro)}</p>

      ${indent(personal.map(personalTrack).join("\n\n"), 6)}

      ${indent(track(contactTrack, 4, contact(c.contact, ' class="btn"')), 6)}
    </section>
  </div>
</div>
</main>

<footer class="runout">
  <span>DN 001 · B</span>
  <a href="${c.contact.github.url}" target="_blank" rel="noopener">${c.contact.github.label}</a>
  <a href="../">Other versions of this site</a>
  <a href="#top">Side A <span aria-hidden="true">↑</span></a>
</footer>

<div class="player" role="region" aria-label="Now playing">
  <div class="player__progress"><i></i></div>
  <div class="player__disc" aria-hidden="true"></div>
  <p class="player__track"><span data-now-no>A1</span><strong data-now-title>${esc(how.title)}</strong></p>
  <span class="player__dur" data-now-dur></span>
  <button type="button" data-go="-1" aria-label="Previous track"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6 5h2v14H6zM20 5v14L9 12z"/></svg></button>
  <button type="button" data-go="1" aria-label="Next track"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M16 5h2v14h-2zM4 5v14l11-7z"/></svg></button>
  <a href="#tracklist" aria-label="Tracklist"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 6h16v2H4zM4 11h16v2H4zM4 16h16v2H4z"/></svg></a>
</div>

<script src="script.js"></script>
</body>
</html>
`;
};
