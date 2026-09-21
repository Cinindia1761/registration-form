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

Expected payload fields are `fullName`, `designation`, `organisation`, `organisationType`, `otherOrganisationType` (when `organisationType` is `Other`), `state`, `district`, `block`, `email`, `mobile`, `alternateContact`, `documentationConsent`, `digitalSignature`, and `submittedAt` (ISO timestamp). The expected response may include `referenceId`.

## GitHub Pages

Create a public GitHub repository, push this project to its `main` branch, and enable **Settings > Pages > GitHub Actions**. The included workflow publishes the site at:

`https://USERNAME.github.io/REPOSITORY-NAME/`

Use the published HTTPS URL, not a local `file://` or `localhost` URL, to create the QR code. GitHub Pages hosts the static form only; it does not store registrations by itself.

The header keeps the CINI and NASCOM Foundation logos in one flex container. Both use proportional sizing at `64px` on desktop and `48px` on mobile, with responsive adjustments for narrow screens.

## Registration storage

The browser submits registrations to `POST /api/registrations` when `API_BASE_URL` in `src/api.js` is configured. Connect that endpoint to a backend and database before collecting real submissions. The backend should validate the payload, store the fields in explicit database columns, and keep secrets out of this repository.

No registration data is stored in localStorage, committed to the repository, or placed in URL parameters. Do not commit secrets or `.env` files.