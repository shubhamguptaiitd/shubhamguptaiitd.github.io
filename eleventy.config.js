import { readFileSync } from "node:fs";

import site from "./src/_data/site.js";

// Self-hosted Roboto: only the weights the site uses, latin and latin-ext. latin-ext is fetched by the
// browser only when a page uses a character in its unicode-range.
const FONT_FILES = [100, 300, 400, 700].flatMap((weight) => [
  `roboto-latin-${weight}-normal.woff2`,
  `roboto-latin-ext-${weight}-normal.woff2`,
]);

// Icons are Font Awesome Free 6.7.2 SVGs (CC BY 4.0), inlined so the page needs no icon font.
const iconCache = new Map();
function icon(name, label) {
  if (!iconCache.has(name)) {
    const svg = readFileSync(`src/assets/icons/${name}.svg`, "utf8").replace(/<!--[\s\S]*?-->/g, "");
    iconCache.set(name, svg);
  }
  const svg = iconCache.get(name);
  const a11y = label ? `role="img" aria-label="${label}"` : `aria-hidden="true"`;
  return svg.replace("<svg ", `<svg class="icon icon-${name}" ${a11y} focusable="false" `);
}

export default function (eleventyConfig) {
  // Static files.
  eleventyConfig.addPassthroughCopy({ "src/assets/css": "assets/css" });
  eleventyConfig.addPassthroughCopy({ "src/assets/img": "assets/img" });
  eleventyConfig.addPassthroughCopy({ "src/_redirects": "_redirects" });
  eleventyConfig.addPassthroughCopy({ "src/assets/favicon.svg": "favicon.svg" });
  for (const file of FONT_FILES) {
    eleventyConfig.addPassthroughCopy({ [`node_modules/@fontsource/roboto/files/${file}`]: `assets/fonts/${file}` });
  }
  eleventyConfig.addWatchTarget("./src/_data/papers.bib");

  // News items are short Markdown files shown inline on the home page; they get no page of their own.
  eleventyConfig.addCollection("news", (api) =>
    api.getFilteredByGlob("./src/news/*.md").sort((a, b) => b.date - a.date),
  );

  eleventyConfig.addShortcode("icon", icon);
  eleventyConfig.addFilter("displayDate", (date) =>
    new Date(date).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric", timeZone: "UTC" }),
  );
  eleventyConfig.addFilter("isoDate", (date) => new Date(date).toISOString().slice(0, 10));
  eleventyConfig.addFilter("absolute", (url) => new URL(url, site.url).href);
  eleventyConfig.addFilter("json", (value) => JSON.stringify(value));
  // Pages for the sitemap: everything with an HTML URL that is not marked noindex.
  eleventyConfig.addFilter("sitemapPages", (items) =>
    (items || []).filter((i) => i.url && i.url.endsWith("/") && !i.data.noindex && i.data.sitemap !== false),
  );

  return {
    dir: { input: "src", output: "_site", includes: "_includes", data: "_data" },
    templateFormats: ["md", "njk"],
    markdownTemplateEngine: "njk",
    htmlTemplateEngine: "njk",
  };
}
