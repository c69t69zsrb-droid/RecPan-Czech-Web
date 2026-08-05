# AGENTS.md

## Project Context

This is a Base44 app repository. Treat it as user-owned application code, keep changes focused on the user's request, and preserve existing project conventions.

Start with `README.md` for local setup, environment variables, and publish workflow.

## Base44 References

- CLI overview: https://docs.base44.com/developers/references/cli/get-started/overview.md
- Agent skills: https://docs.base44.com/developers/backend/overview/skills.md

If your agent supports Agent Skills, install or update Base44 skills before Base44-specific work:

```bash
npx skills add base44/skills
```

## Key Files

- `src/`: frontend application source.
- `src/api/base44Client.js`: frontend Base44 SDK client.
- `vite.config.js`: Vite config and Base44 Vite plugin setup.
- `.env.local`: local-only environment values; never commit secrets.

## Working Notes

- Use `base44 dev` as the default local development command when you need the local Base44 backend. It can run the backend and frontend together.
- When docs or code mention the frontend being started automatically, that usually means the Base44 project config includes `site.serveCommand`, for example `"serveCommand": "npm run dev"` in `base44/config.jsonc`.
- Use `npm run dev` only for frontend-only work against the hosted Base44 backend.
- Prefer the existing Base44 CLI workflow over adding new npm scripts for Base44-specific tasks.
- Reuse the existing SDK client and Vite plugin patterns before adding new Base44 integration paths.
- Run the relevant checks from `package.json` before finishing code changes.

## PERMANENT ASSET — Email Signature Logo (DO NOT REMOVE)

The file `/public/recpan-email-logo.png` is a permanent public asset used in the company email signatures. This is a backwards-compatibility requirement: existing emails may reference its URL for years.

**Rules that apply to ALL future changes, refactors, regenerations, and exports — regardless of whether the change is related to the email signature:**

- NEVER delete, rename, move, hash, or replace `/public/recpan-email-logo.png`.
- NEVER convert it into a dynamically generated asset or make it dependent on authentication.
- The exact public URL must remain permanently valid and served directly as the PNG file: `https://rec-pan.eu/recpan-email-logo.png`
- The URL must be accessible without authentication, cookies, or redirects to a webpage/route — it must return the PNG via a normal HTTP GET (compatible with Gmail and other email clients).
- The `vercel.json` rewrite rule already excludes dotfile extensions (`.png`), so this static file is served directly. Do not add any rewrite/route that would shadow `/recpan-email-logo.png`.
- If the project structure is regenerated or `public/` is reorganized, this file and path MUST be preserved exactly.