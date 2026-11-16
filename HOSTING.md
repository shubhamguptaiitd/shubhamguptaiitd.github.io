# Moving drshubhamgupta.com to Cloudflare

Today the site is served by **GitHub Pages**. After this move, **Cloudflare Workers** builds and serves it for free:
every push to `main` rebuilds it in a couple of minutes, the same way networkeffectlabs.com works. The domain stays
registered at **Squarespace**; only its nameservers point to Cloudflare. Cloudflare can later also run a Q&A box or
an agent on the same account (server code added to `wrangler.jsonc`).

The order below keeps the site online the whole time: Cloudflare serves a copy on a `workers.dev` address first,
and the domain only switches once that copy is checked. Steps marked **(you)** need your own logins.

## 1. Merge the Eleventy site into `main`

Merging removes the old GitHub Pages workflow, so GitHub stops rebuilding the site. The last GitHub Pages
deployment stays online, so drshubhamgupta.com keeps working unchanged until step 5.

## 2. Create the Workers project (you)

1. In Cloudflare: **Workers & Pages** → **Create** → **Import a repository** (Connect to Git) → GitHub.
2. When GitHub asks which repositories Cloudflare may see, choose **Only select repositories** and add
   `shubhamguptaiitd.github.io` (keep `networkeffectlabs.com` selected too).
3. Settings:
   - Project name: `drshubhamgupta` (must match `name` in `wrangler.jsonc`)
   - Build command: `npm run build`
   - Deploy command: `npx wrangler deploy`
   - Preview builds: off is fine
   - API token: let Cloudflare create one automatically
   - Node version comes from `.nvmrc` (24)
4. **Deploy.** The site then works at `https://drshubhamgupta.<your-subdomain>.workers.dev`. Click through it.

## 3. Add the domain to Cloudflare (you)

1. Cloudflare → **Add a domain** → `drshubhamgupta.com` → **Free** plan.
2. Cloudflare scans the current DNS records. Before continuing:
   - **Delete** the four `A` records for `drshubhamgupta.com` pointing at GitHub (`185.199.108.153`,
     `185.199.109.153`, `185.199.110.153`, `185.199.111.153`) and any `www` record (usually a `CNAME` to
     `shubhamguptaiitd.github.io`). Step 5 adds the new ones.
   - **Keep** any `MX` and `TXT` records (email, Google verification). If you don't use email on this domain,
     there may be none.
3. Cloudflare shows **two nameservers**, like `xxx.ns.cloudflare.com`. Keep that page open.

## 4. Point Squarespace at Cloudflare (you)

1. Squarespace → **Domains** → `drshubhamgupta.com` → **DNS** → **Domain nameservers** → **Use custom
   nameservers**.
2. Replace the four `ns-cloud-c*.googledomains.com` entries with the two Cloudflare nameservers and save. If
   Squarespace says **DNSSEC** is on, turn it off first (you can turn it on again later from Cloudflare).
3. Back in Cloudflare, click **Check nameservers**. The domain usually becomes **Active** within an hour, sometimes up
   to a day. Cloudflare emails you when it does.

Keep **auto-renew** on at Squarespace; the registration itself stays there.

## 5. Connect the domain to the Workers project (you)

1. Workers project → **Settings** → **Domains & Routes** → **Add** → **Custom domain** → `drshubhamgupta.com`.
   Repeat for `www.drshubhamgupta.com`. Cloudflare adds the DNS records and the HTTPS certificate itself.
2. **www → main domain:** **Rules** → **Redirect Rules** → **Create rule** → template **Redirect from WWW to root**
   → deploy.
3. **HTTPS everywhere:** **SSL/TLS** → **Edge Certificates** → turn on **Always Use HTTPS**.
4. **Visitor stats (optional):** **Analytics & Logs** → **Web Analytics** → **Add a site** → `drshubhamgupta.com`.
   Free, no cookies, no consent banner, no code changes.

Check it worked:

```bash
curl -sI https://drshubhamgupta.com | grep -iE "^(HTTP|server)"
```

You should see `HTTP/2 200` and `server: cloudflare`.

## 6. Keep the old github.io address redirecting

Google still lists `shubhamguptaiitd.github.io` in some results. GitHub keeps redirecting it to
drshubhamgupta.com as long as GitHub Pages stays **enabled** with the custom domain set, so:

- In the repository's **Settings** → **Pages**, leave Pages on and leave the custom domain as `drshubhamgupta.com`.
  GitHub may show a DNS warning once the domain points at Cloudflare; that is expected and harmless here.
- Check it still redirects:

```bash
curl -sI https://shubhamguptaiitd.github.io/ | grep -iE "^(HTTP|location)"
```

You should see a `301` to `https://drshubhamgupta.com/`. If GitHub ever stops redirecting, ask for a small
redirect-only Pages site to be set up instead.

## 7. Tell Google (you)

1. [Search Console](https://search.google.com/search-console) → **Add property** → **Domain** → `drshubhamgupta.com`.
   Google offers to add its `TXT` record to Cloudflare for you; otherwise add it under Cloudflare → **DNS**.
2. **Sitemaps** → submit `https://drshubhamgupta.com/sitemap.xml`.
3. **URL Inspection** → `https://drshubhamgupta.com/` → **Request indexing**.
4. Put drshubhamgupta.com as the website on Google Scholar, LinkedIn, X and GitHub.

## Day-to-day

Edit locally, check with `npm start`, commit and push. Cloudflare rebuilds in about two minutes. Each deployment is
listed in the Workers project and can be rolled back with one click.
