# drshubhamgupta.com

Source for [drshubhamgupta.com](https://drshubhamgupta.com), the personal site of Shubham Gupta: research,
industry work and writing.

It is a static site built with [Eleventy](https://www.11ty.dev/) and served by Cloudflare (see `HOSTING.md`).
Pages are plain HTML and CSS with self-hosted fonts; the only JavaScript is a few lines for the phone menu and the email link.
The look follows the earlier [al-folio](https://github.com/alshedivat/al-folio) Jekyll theme.

## Run it locally

You need Node 24 (`nvm use` picks it up from `.nvmrc`).

```bash
npm install
npm start
```

Then open http://localhost:8080. The page reloads as you edit.

## Where things live

| To change | Edit |
|---|---|
| Home page text | `src/index.md` |
| Writing page intro | `src/writing.md` |
| Essays listed on Writing and the home page | `src/_data/writing.js` |
| News on the home page | one Markdown file per item in `src/news/` |
| Publications | `src/_data/papers.bib` |
| Name, description, social links, nav | `src/_data/site.js` |
| Co-author and venue links in publications | `src/_data/coauthors.js`, `src/_data/venues.js` |
| Styles | `src/assets/css/site.css` |
| Photo | `src/assets/img/prof_pic.jpg` |
| Redirects from old addresses | `src/_redirects` |

## Add an essay

Add an entry at the top of `essays` in `src/_data/writing.js`:

```js
{
  title: "Density beats size",
  url: "https://networkeffectlabs.com/essays/density-beats-size/",
  date: "2026-11-23",
  description: "One or two sentences, the same as the essay's own description.",
},
```

It appears on the Writing page, and under "Latest writing" on the home page if it is among the newest two
(`latestWriting` in `src/index.md` sets how many).

## Add a news item

Create `src/news/YYYY-MM-DD-short-name.md`:

```markdown
---
date: 2026-11-23
---

Gave a talk on temporal graph learning at [Venue](https://example.com).
```

## Add a publication

Paste the BibTeX entry (from Google Scholar, DBLP or the publisher) into `src/_data/papers.bib`, then add any of:

- `abbr = {ICML}`: the venue badge. Add the venue's site to `src/_data/venues.js` to make the badge a link.
- `selected = {true}`: also list it under "Selected Publications" on the home page.
- `arxiv = {2306.03447}`, `code = {https://...}`, `pdf`, `html`, `slides`, `poster`, `website`, `talk`: buttons
  under the entry.
- `abstract = {...}`: shown behind an "Abs" button.

Within a year, entries appear in the order they are in the file. Your own name is underlined automatically.

## Publish

Commit and push to `main`. Cloudflare rebuilds and deploys in about two minutes.
