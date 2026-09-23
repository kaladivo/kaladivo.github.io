export const esc = (text) => text.replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;");

export const indent = (html, spaces) => html.replace(/\n(?=.)/g, "\n" + " ".repeat(spaces));

export const link = (label, url) => `<a href="${url}">${label}</a>`;

// For pages that don't link to the dancing video: the album embeds it, the CV skips it.
export const linkWithoutVideo = (label, url) => (url.endsWith(".mp4") ? label : link(label, url));

export const externalLink = (label, url) => `<a href="${url}" target="_blank" rel="noopener">${label}</a>`;

const LINK = /\[([^\]]+)\]\(([^)]+)\)/g;

// Content strings are plain text with markdown-style [label](url) links.
export const inline = (text, renderLink = link) =>
  esc(text).replace(LINK, (_, label, url) => renderLink(label, url));

// "my band: [label](https://open.spotify.com/artist/ID)" → { name: "my band", id: "ID", youtube: false }
export const media = (text) => {
  const url = new URL(text.match(/\]\(([^)]+)\)/)[1]);
  return {
    name: text.slice(0, text.indexOf("[")).trim().replace(/:$/, ""),
    id: url.pathname.split("/").pop(),
    youtube: url.hostname.includes("youtu"),
  };
};

export const musicLinks = (c) => c.personal.items.find((item) => item.id === "music").links;

// A body block is a paragraph, a "> " quote or an array of list items.
export const blocks = (body, { renderLink = link, quote = (html) => `<blockquote>${html}</blockquote>` } = {}) =>
  body
    .map((block) => {
      if (Array.isArray(block))
        return `<ul>\n${block.map((item) => `  <li>${inline(item, renderLink)}</li>`).join("\n")}\n</ul>`;
      if (block.startsWith("> ")) return quote(inline(block.slice(2), renderLink));
      return `<p>${inline(block, renderLink)}</p>`;
    })
    .join("\n");

const NOSTR_ICON = `<svg class="contact-icon" viewBox="36 36 190 190" aria-hidden="true"><path fill="currentColor" d="M210.8 199.4c0 3.1-2.5 5.7-5.7 5.7h-68c-3.1 0-5.7-2.5-5.7-5.7v-15.5c.3-19 2.3-37.2 6.5-45.5 2.5-5 6.7-7.7 11.5-9.1 9.1-2.7 24.9-.9 31.7-1.2 0 0 20.4.8 20.4-10.7s-9.1-8.6-9.1-8.6c-10 .3-17.7-.4-22.6-2.4-8.3-3.3-8.6-9.2-8.6-11.2-.4-23.1-34.5-25.9-64.5-20.1-32.8 6.2.4 53.3.4 116.1v8.4c0 3.1-2.6 5.6-5.7 5.6H57.7c-3.1 0-5.7-2.5-5.7-5.7v-144c0-3.1 2.5-5.7 5.7-5.7h31.7c3.1 0 5.7 2.5 5.7 5.7 0 4.7 5.2 7.2 9 4.5 11.4-8.2 26-12.5 42.4-12.5 36.6 0 64.4 21.4 64.4 68.7v83.2ZM150 99.3c0-6.7-5.4-12.1-12.1-12.1s-12.1 5.4-12.1 12.1 5.4 12.1 12.1 12.1S150 106 150 99.3Z"/></svg>`;
const EMAIL_ICON = `<svg class="contact-icon" viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round"><rect x="2.5" y="5" width="19" height="14" rx="2"/><path d="m3 7 9 7 9-7"/></svg>`;
const GITHUB_ICON = `<svg class="contact-icon" viewBox="0 0 16 16" aria-hidden="true"><path fill="currentColor" d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"/></svg>`;
const INSTAGRAM_ICON = `<svg class="contact-icon" viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.2" cy="6.8" r="1.2" fill="currentColor" stroke="none"/></svg>`;

export const contact = (c, btn) => `<p>${esc(c.intro)}</p>
<ul class="contact">
  <li>
    ${NOSTR_ICON}
    <p><span class="contact-label">${esc(c.nostrLabel)}</span> <span class="contact-value">${c.npub}</span></p>
    <p class="contact-actions"><a${btn} href="nostr:${c.npub}">Open in Nostr app</a> <button${btn} type="button" data-copy="${c.npub}">Copy npub</button></p>
  </li>
  <li>
    ${EMAIL_ICON}
    <p><span class="contact-label">${esc(c.emailLabel)}</span> <span class="contact-value">${c.email}</span></p>
    <p class="contact-actions"><a${btn} href="mailto:${c.email}">Write an email</a> <button${btn} type="button" data-copy="${c.email}">Copy address</button></p>
  </li>
</ul>
<p class="contact-label contact-group">${esc(c.socialLabel)}</p>
<ul class="contact">
  <li>
    ${GITHUB_ICON}
    <p><span class="contact-value">${c.github.label}</span></p>
    <p class="contact-actions"><a${btn} href="${c.github.url}" target="_blank" rel="noopener">Open GitHub</a></p>
  </li>
  <li>
    ${INSTAGRAM_ICON}
    <p><span class="contact-value">${c.instagram.label}</span></p>
    <p class="contact-actions"><a${btn} href="${c.instagram.url}" target="_blank" rel="noopener">Open Instagram</a></p>
  </li>
</ul>`;
