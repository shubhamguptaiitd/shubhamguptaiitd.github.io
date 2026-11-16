// Reads papers.bib and shapes each entry for the publication templates.
// Paste new BibTeX from Google Scholar or DBLP into papers.bib, then add any of these fields:
//   abbr     = {ICML}     venue badge (linked through venues.js)
//   selected = {true}     also list it under "Selected Publications" on the home page
//   arxiv    = {2306.03447}, code, pdf, html, slides, poster, website, talk = {url}
//   abstract = {...}      shown behind an "Abs" toggle
import { readFileSync } from "node:fs";

import { parse } from "@retorquere/bibtex-parser";

import coauthors from "./coauthors.js";
import venues from "./venues.js";

const SELF = { lastName: "Gupta", firstName: "Shubham" };
const LINKS = [
  ["arxiv", "arXiv", (id) => `https://arxiv.org/abs/${id}`],
  ["html", "HTML"],
  ["pdf", "PDF"],
  ["supp", "Supp"],
  ["blog", "Blog"],
  ["code", "Code"],
  ["poster", "Poster"],
  ["slides", "Slides"],
  ["website", "Website"],
  ["talk", "Talk"],
];

function author(creator) {
  const name = [creator.firstName, creator.lastName].filter(Boolean).join(" ") || creator.name;
  const isSelf = creator.lastName === SELF.lastName && (creator.firstName || "").startsWith(SELF.firstName[0]);
  return { name, isSelf, url: isSelf ? null : coauthors[creator.lastName] || null };
}

function shape(entry, index) {
  const f = entry.fields;
  return {
    key: entry.key,
    order: index,
    type: entry.type,
    title: f.title,
    authors: (f.author || []).map(author),
    venue: entry.type === "article" ? f.journal : f.booktitle ? `In ${f.booktitle}` : f.school || "",
    year: Number(f.year),
    abbr: f.abbr || null,
    abbrUrl: f.abbr ? venues[f.abbr] || null : null,
    award: f.award || null,
    selected: f.selected === "true",
    abstract: f.abstract || null,
    links: LINKS.filter(([field]) => f[field]).map(([field, label, toUrl]) => ({
      label,
      url: toUrl ? toUrl(f[field]) : f[field].includes("://") ? f[field] : `/assets/pdf/${f[field]}`,
    })),
  };
}

export default function () {
  const source = readFileSync(new URL("./papers.bib", import.meta.url), "utf8");
  const library = parse(source, { sentenceCase: false });
  if (library.errors.length) {
    throw new Error(`papers.bib: ${library.errors.map((e) => e.error).join("; ")}`);
  }
  const all = library.entries.map(shape);
  // Newest year first; within a year, the order of papers.bib.
  const years = [...new Set(all.map((p) => p.year))].sort((a, b) => b - a);
  return {
    all,
    selected: all.filter((p) => p.selected),
    byYear: years.map((year) => ({ year, papers: all.filter((p) => p.year === year) })),
  };
}
