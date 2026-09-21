# CINI State Registration

Static, mobile-first registration website for the CINI consultation in association with NASCOM Foundation.

## Run locally

This is a plain static site. Open `index.html` directly, or run `npx serve .` from the project folder and open the URL shown in the terminal.

## Structure

- `index.html` - single-page accessible form and event content
- `src/` - validation, signature capture, API adapter, and styles
- `assets/` - local logo and interface icon assets
- `.github/workflows/deploy.yml` - automatic GitHub Pages deployment

## Configure the future API

Edit `src/api.js` and set `API_BASE_URL` to the HTTPS server origin, for example `https://api.example.org`. The adapter then sends a `POST /api/registrations` request. Until configured, the page clearly reports that the registration service is being connected and does not claim to store data.

Expected payload fields are `fullName`, `designation`, `organisation`, `organisationType`, `state`, `district`, `block`, `email`, `mobile`, `alternateContact`, `documentationConsent`, `digitalSignature`, and `submittedAt` (ISO timestamp). The expected response may include `referenceId`.

## GitHub Pages

Create a repository named `CINI-state-registration`, push this project to its `main` branch, and enable **Settings > Pages > GitHub Actions**. The workflow will publish the site at `https://USERNAME.github.io/CINI-state-registration/`. Use that final URL, not a local development URL, to create the QR code.

No registration data is stored in localStorage, committed to the repository, or placed in URL parameters. Do not commit secrets or `.env` files.