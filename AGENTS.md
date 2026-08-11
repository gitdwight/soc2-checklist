# AGENTS.md

## Cursor Cloud specific instructions

This repository is a **fully static website** — the SOC 2 Type II Readiness Checklist. It is plain HTML (`index.html`), CSS (`style.css`), and vanilla JavaScript (`script.js`). There is no package manager, no build step, no backend, no database, and no automated tests or lint config. State is persisted client-side via browser `localStorage`.

### Running the app (dev)

There is nothing to install. Serve the static files from the repo root with any static HTTP server, e.g.:

```
python3 -m http.server 8000
```

Then open `http://localhost:8000/`. Serving over HTTP (rather than opening the `file://` path) is preferred so browser behavior matches a real deployment.

### Lint / Test / Build

- **Build:** none — assets are served as-is.
- **Lint:** none configured.
- **Test:** none configured. Verify changes manually in the browser (fill the Organization/Prepared By fields, toggle checklist checkboxes, and confirm the Readiness Score/progress bar update and that state persists across a page reload via `localStorage`).
