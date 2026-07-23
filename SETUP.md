# Setup guide: forms, blog, and bilingual site

## Language switcher
- English pages live at the site root.
- Chinese pages live under `/zh/`.
- The header language dropdown switches between matching pages.

## Contact / appointment form backend

Forms currently submit through **FormSubmit** to `admin@lanicao.com` and keep a submission log in that service.

### Recommended upgrade (best for a law firm inbox + CRM-style archive)
1. Create a free/paid form endpoint at [Formspree](https://formspree.io) or [Getform](https://getform.io).
2. Paste the endpoint into `config.js`:

```js
window.FORMSPREE_ENDPOINT = "https://formspree.io/f/your-id";
```

3. Submissions will then appear in that dashboard (searchable archive, spam filtering, email alerts, CSV export).

### If you want the data in your own database
- Use **Supabase** (Postgres) + a tiny serverless function (Vercel/Netlify/Cloudflare) that inserts rows into a `leads` table.
- Or connect Formspree/Zapier to Google Sheets / HubSpot / Clio Grow.

Do **not** rely on `mailto:` forms for production; browsers block them inconsistently and you will lose leads.

## Blog / news publishing

### Recommended: Sanity (or Ghost)
For a non-technical editor uploading posts, integrate a headless CMS:

| Option | Why choose it |
| --- | --- |
| **Sanity** | Modern editor, custom fields, great for bilingual posts, free tier to start |
| **Ghost** | Feels like a blogging app, memberships/newsletter optional |
| **WordPress (headless)** | Familiar UI if staff already know WP |
| **Decap CMS** | Free, Git-based, edits Markdown in this repo via a browser UI |

### Lightweight path (no new app yet)
- Draft posts as Markdown in `content/blog/`.
- A developer (or later CMS integration) can render them into `news.html` / `law-journal.html`.

**Practical recommendation:** start with **Formspree + Sanity**. Formspree solves lead storage immediately; Sanity gives a clean “write a post” admin without rebuilding the whole site.
