import { readFileSync, writeFileSync } from "node:fs";
import album from "./templates/album.mjs";
import cv from "./templates/cv.mjs";
import daveos from "./templates/daveos.mjs";

const content = JSON.parse(readFileSync(new URL("content.json", import.meta.url), "utf8"));

const pages = {
  "site/index.html": daveos,
  "site/cv/index.html": cv,
  "site/album/index.html": album,
};

for (const [path, render] of Object.entries(pages)) {
  writeFileSync(new URL(path, import.meta.url), render(content));
  console.log(`built ${path}`);
}
