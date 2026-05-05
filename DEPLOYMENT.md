# Deployment

This portfolio is configured as a static Vite site.

## Build settings

Use these settings on Cloudflare Pages, Netlify, or Vercel:

```txt
Build command: npm run build
Publish/output directory: dist/client
Node version: 22
```

`netlify.toml` and `public/_redirects` are included so client-side routes fall
back to `index.html`.

## Cloudflare Pages

Recommended first deploy path if the Pages UI is available:

1. Push the project to GitHub.
2. Cloudflare Dashboard > Workers & Pages > Create application > Pages.
3. Connect the GitHub repo.
4. Set the build settings:

```txt
Framework preset: Vite
Build command: npm run build
Build output directory: dist/client
Root directory: /
Node version: 22
```

5. Add the EmailJS variables below under Settings > Environment variables.
6. Deploy.

If Cloudflare shows the newer Workers deploy form instead, use this:

```txt
Project name: portfolio
Build command: npm run build
Deploy command: npx wrangler deploy
Builds for non-production branches: off, unless you want preview deploys
Non-production branch deploy command: blank, or leave default
Path: /
API token: Create new token
API token name: portfolio-deploy-token
```

This repo includes `wrangler.jsonc`, so `npx wrangler deploy` uploads the static
Vite build from `dist/client` and serves React routes with SPA fallback.

## EmailJS

The contact form reads EmailJS settings from Vite environment variables:

```env
VITE_EMAILJS_SERVICE_ID=your_emailjs_service_id
VITE_EMAILJS_TEMPLATE_ID=your_emailjs_template_id
VITE_EMAILJS_PUBLIC_KEY=your_emailjs_public_key
```

For local development, keep the values in `.env.local`. For hosted deploys, add
the same variables in the hosting provider's environment variable settings.

The EmailJS template should include these fields:

```txt
from_name
from_email
reply_to
time
message
```

Set the template recipient to `sarthakrajvanshi124@gmail.com` in the EmailJS
dashboard.
