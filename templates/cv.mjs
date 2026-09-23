import { blocks, contact, esc, indent, inline } from "./html.mjs";

const meta = (item) => {
  if (item.dates)
    return `<p class="meta"><span>${esc(item.dates)}</span>${item.company ? ` <span>${esc(item.company)}</span>` : ""}</p>`;
  if (item.links) return `<p class="meta">${item.links.map((l) => `<span>${inline(l)}</span>`).join(" ")}</p>`;
  return "";
};

const linksParagraph = (links) => `<p class="links">
  ${links.map((l) => inline(l)).join("<br>\n  ")}
</p>`;

const article = (item, head, tail) => `    <article>
      <h3>${esc(item.title)}</h3>
      ${indent([head, blocks(item.body), tail].filter(Boolean).join("\n"), 6)}
    </article>`;

const articles = (items) => items.map((item) => article(item, meta(item))).join("\n\n");

const personalArticles = (items) =>
  items.map((item) => article(item, "", item.links && linksParagraph(item.links))).join("\n\n");

export default (c) => `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(c.name)} ${esc(c.tagline)}</title>
<meta name="description" content="${esc(c.motto)}">
<link rel="icon" href="../assets/favicon.png">
<link rel="apple-touch-icon" href="../assets/favicon.png">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Newsreader:ital,opsz,wght@0,6..72,400;0,6..72,600;1,6..72,400&family=Space+Grotesk:wght@500;700&display=swap" rel="stylesheet">
<link rel="stylesheet" href="style.css">
</head>
<body>

<nav class="toolbar">
  <a href="../">← Other versions of this site</a>
  <button type="button" onclick="print()">Print / save as PDF</button>
</nav>

<main class="sheet">
  <header class="head">
    <img src="../assets/david-1.jpg" alt="David Novák smiling in a tree alley" width="1120" height="1400">
    <div>
      <h1>${esc(c.name)} <span>${esc(c.tagline)}</span></h1>
      <p class="roles">${c.roles.map(esc).join(" - ")}</p>
      <p class="motto">${esc(c.motto)}</p>
      <p><a href="mailto:${c.contact.email}">${c.contact.email}</a> · <a href="${c.contact.github.url}">${c.contact.github.label}</a></p>
    </div>
  </header>

  <section>
    <h2>${esc(c.experience.title)}</h2>

${articles(c.experience.items)}
  </section>

  <section>
    <h2>${esc(c.activeProjects.title)}</h2>

${articles(c.activeProjects.items)}
  </section>

  <section>
    <h2>${esc(c.archive.title)}</h2>
    <p>${esc(c.archive.intro)}</p>

${articles(c.archive.items)}
  </section>

  <section>
    <h2>${esc(c.howIWork.title)}</h2>
    ${indent(blocks(c.howIWork.body), 4)}
  </section>

  <section>
    <h2>${esc(c.personal.title)}</h2>
    <p>${esc(c.personal.intro)}</p>

${personalArticles(c.personal.items)}
  </section>

  <section>
    <h2>${esc(c.contact.title)}</h2>
    ${indent(contact(c.contact, ""), 4)}
  </section>
</main>

<script>
document.querySelectorAll("[data-copy]").forEach((button) =>
  button.addEventListener("click", async () => {
    await navigator.clipboard.writeText(button.dataset.copy);
    button.textContent = "Copied";
  }),
);
</script>
</body>
</html>
`;
