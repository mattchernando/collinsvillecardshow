# Collinsville Card Show

Marketing site for the **Collinsville Card Show** — a recurring sports-card
and collectibles show in Collinsville, Illinois. The site lists upcoming show
dates, vendor information, venue details, and a call-to-action for table
reservations.

## Stack

- [Astro](https://astro.build/) (static output)
- [React](https://react.dev/) islands for interactive components
- [Tailwind CSS v4](https://tailwindcss.com/) via `@tailwindcss/vite`
- Deployed to [Cloudflare Pages](https://pages.cloudflare.com/)

## Directory Layout

```
├── astro/              ← Active Astro project (all development happens here)
│   ├── src/
│   │   ├── components/
│   │   ├── data/
│   │   │   └── shows.json   ← Upcoming show dates
│   │   ├── layouts/
│   │   ├── pages/
│   │   └── styles/
│   ├── public/
│   └── dist/           ← Build output (gitignored)
├── .github/
│   └── dependabot.yml
├── README.md
└── SECURITY.md
```

> **Note:** The legacy Vite project files in the repo root will be removed
> after cutover to Cloudflare Pages is verified. Do not add new code to the
> root-level project.

## Development

```bash
cd astro
npm install
npm run dev       # local dev server at localhost:4321
npm run build     # production build → astro/dist/
npm run preview   # preview the production build locally
```

## Updating Upcoming Shows

Edit `astro/src/data/shows.json`. Each entry has a `date` (display string) and
`day` field:

```json
[
  { "date": "May 3, 2026", "day": "Saturday" },
  { "date": "June 7, 2026", "day": "Saturday" }
]
```

Commit and push to `main` — the site will redeploy automatically.

## Deployment

The site auto-deploys to **Cloudflare Pages** on every push to `main` via
Cloudflare's native Git integration — Pages watches the GitHub repo directly
and rebuilds whenever new commits land. There is no GitHub Actions workflow
and no `CLOUDFLARE_API_TOKEN` secret stored in this repo; the integration is
authorized via the Cloudflare Pages GitHub App on the Cloudflare side.

PRs and pushes to non-`main` branches produce **preview deployments** at a
per-branch URL — useful for reviewing visual changes before merging.

Build settings (build command, output directory, root directory, Node
version) are configured in the Cloudflare Pages dashboard under the project's
**Settings → Builds & deployments**, not in this repo. To change them, edit
them there.

## Go-Live Checklist

Before switching production traffic from the old host to Cloudflare Pages:

- [ ] Verify the Astro build on the Cloudflare Pages preview URL
- [ ] Transfer domain to Cloudflare Registrar (or point DNS to Pages)
- [ ] Update `site` in `astro/astro.config.mjs` to the final production URL
- [ ] Submit the sitemap (`/sitemap-index.xml`) to Google Search Console
- [ ] Verify Google Business Profile listing and update website URL
- [ ] Update the Planning Center registration/reservation URL if applicable
- [ ] Replace the placeholder OG image (`astro/public/og-image.png`) with a
  real card-show photo
- [ ] Remove legacy Vite project files from the repo root
- [ ] Delete the old GitHub Pages site / disable old hosting

## Security

See [SECURITY.md](SECURITY.md) for the vulnerability reporting process and
security posture overview.

### Account-Level Security Checklist

These are manual, human tasks — not automated. Review periodically.

- [ ] **2FA enabled** on all accounts with access to infrastructure:
  GitHub, Cloudflare, domain registrar, Planning Center, email provider,
  and any service with push access to this repo.
- [ ] **GitHub branch protection on `main`**: require PR review, require
  status checks to pass, no force push, no deletion.
- [ ] **Cloudflare: enable DNSSEC** once the domain is transferred to
  Cloudflare Registrar (or via the current registrar if supported).
- [ ] **Cloudflare: add CAA DNS records** restricting certificate issuance to
  `letsencrypt.org` and `pki.goog` (Google Trust Services) — these are the
  CAs Cloudflare uses for edge certificates.
- [ ] **Registrar: enable registrar lock** and **WHOIS privacy**.
- [ ] **All accounts: unique passwords** managed via a password manager (e.g.,
  1Password, Bitwarden).
- [ ] **Quarterly review**: audit third-party GitHub Apps and OAuth grants;
  remove anything no longer needed.

### Uptime Monitoring

Set up basic uptime monitoring with
[UptimeRobot](https://uptimerobot.com/) (free tier):

1. Create an account at uptimerobot.com.
2. Add an **HTTP(s)** monitor pointing to the production URL
   (e.g., `https://collinsvillecardshow.com`).
3. Set the check interval to **5 minutes** (free tier default).
4. Configure **email alerts** to go to the site owner's address.
5. Optionally add a second monitor for a key subpage (e.g., `/404`) to verify
   the Cloudflare Pages deployment is serving content.
