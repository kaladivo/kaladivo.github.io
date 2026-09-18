// Verifies every line Dave wrote in ../docs appears unchanged on each page.
// Usage: node check-verbatim.mjs
import { readFileSync, readdirSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const here = dirname(fileURLToPath(import.meta.url));
const docsDir = join(here, "../docs");

const normalize = (text) => text.replace(/\s+/g, " ").trim();

const decodeEntities = (text) =>
  text
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;|&apos;/g, "'")
    .replace(/&nbsp;/g, " ");

const htmlToText = (html) =>
  normalize(
    decodeEntities(
      html
        .replace(/<(script|style)[\s\S]*?<\/\1>/gi, " ")
        .replace(/<!--[\s\S]*?-->/g, " ")
        .replace(/<[^>]+>/g, " "),
    ),
  );

const isAgentNote = (line) => /^>\s*for agents:/i.test(line);
const isEmbeddedLink = (line) => /^(video|my band|my own project)\b/i.test(line);
const stripMarkdownMarker = (line) => line.replace(/^(#+|-|>)\s*/, "");

const expectedSnippets = readdirSync(docsDir)
  .filter((file) => file.endsWith(".md"))
  .flatMap((file) =>
    readFileSync(join(docsDir, file), "utf8")
      .split("\n")
      .map((line) => line.trim())
      .filter((line) => line && !isAgentNote(line) && !isEmbeddedLink(line))
      // the looping tagline is rendered item by item
      .flatMap((line) => (file === "INDEX.md" ? line.split(" - ") : [line]))
      .map((line) => ({ file, snippet: normalize(stripMarkdownMarker(line)) })),
  );

const pages = ["index.html", "album/index.html", "cv/index.html"];
// left out on purpose at Dave's request
const omitted = { "cv/index.html": ["gym bro"] };

let failed = false;
for (const page of pages) {
  const text = htmlToText(readFileSync(join(here, page), "utf8"));
  const missing = expectedSnippets.filter(
    ({ snippet }) => !text.includes(snippet) && !omitted[page]?.includes(snippet),
  );
  console.log(`${page}: ${missing.length === 0 ? "OK" : `${missing.length} missing`}`);
  for (const { file, snippet } of missing) console.log(`  [${file}] ${snippet}`);
  failed ||= missing.length > 0;
}
process.exit(failed ? 1 : 0);
