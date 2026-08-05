
## Deployment

This repo builds the site into `docs/` for GitHub Pages.

- The workflow at `.github/workflows/deploy.yml` runs on `main` pushes.
- It installs dependencies, runs `npm run build`, and commits `docs/` back to `main`.
- The build script also generates `public/planets.json` from the remote API using an API key.
