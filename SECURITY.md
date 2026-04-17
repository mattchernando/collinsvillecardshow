# Security Policy

## Reporting a Vulnerability

If you discover a security vulnerability in this project, please report it
responsibly. **Do not open a public GitHub issue.**

Email: **security@collinsvillecardshow.com** *(placeholder — update with a real
monitored address before publicizing this repo)*

We will acknowledge your report within 48 hours and aim to provide a fix or
mitigation plan within 7 days for confirmed issues.

## Security Posture

This is a **static site** with the following characteristics:

- Built with Astro and deployed to Cloudflare Pages.
- No server-side code, no database, no user authentication.
- No user data is collected — there are no forms, login flows, or analytics
  that capture PII.
- Third-party embeds are limited to:
  - **Google Maps** (iframe embed for venue location)
  - **Google Fonts** (Inter typeface loaded from fonts.googleapis.com /
    fonts.gstatic.com)
- A strict Content-Security-Policy header is enforced via Cloudflare Pages
  `_headers` file, restricting script sources, frame sources, and other
  resource origins.
- HSTS, X-Content-Type-Options, X-Frame-Options, Referrer-Policy, and
  Permissions-Policy headers are also set.

## Scope

The following are **in scope** for reports:

- CSP bypasses or header misconfigurations
- Dependency vulnerabilities in the build toolchain
- Exposed secrets or credentials in the repository

The following are **out of scope**:

- Vulnerabilities in third-party services (Google Maps, Google Fonts,
  Cloudflare) — report those to the respective vendors
- Social engineering attacks
- Denial-of-service attacks against Cloudflare's CDN
