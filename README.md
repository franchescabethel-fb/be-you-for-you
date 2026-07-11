# Be You For You — Website

A multi-page static site for Be You For You (BYFY), styled in an original design
inspired by the *type* of experience wsc.club offers (video-style hero, scroll
animations, membership pitch, founder story, subscribe form) — rebuilt from
scratch with BYFY's own brand, copy, and content. No code, copy, images, or
video from wsc.club were copied.

## Pages

- `index.html` — Home: hero, mission, events highlight, collaborate callout, founder teaser, subscribe
- `about.html` — Franchesca's story, BYFY history/timeline, values
- `membership.html` — BFF community pitch, ways to belong, join form
- `events.html` — What's next + full Year 1–2 recap timeline (Peru retreat intentionally excluded)
- `collaborate.html` — Brand/vendor/sponsor partnerships, current collaborators, inquiry form
- `get-involved.html` — Founders Council explainer + application form
- `contact.html` — Contact info + general inquiry form
- `terms.html` / `privacy.html` — placeholder legal pages (replace with real copy before launch)

## Structure

```
site/
├── index.html
├── about.html
├── membership.html
├── events.html
├── collaborate.html
├── get-involved.html
├── contact.html
├── terms.html
├── privacy.html
├── README.md
└── assets/
    ├── css/style.css     ← shared design system (colors, type, animations)
    └── js/main.js        ← nav scroll state, mobile menu, scroll-reveal, form handling
```

Plain static HTML/CSS/JS — no build step required. This matches your existing
Netlify + Formspree + Zapier stack.

## Before you launch — 3 things to swap in

1. **Fonts.** Perandory Condensed and Hero Light are licensed fonts, not on
   Google Fonts, so `assets/css/style.css` currently substitutes **Oswald**
   (headlines) and **Jost** (body copy) as close stand-ins. Alex Brush (the
   script accent) is a real Google Font and is already wired up correctly.
   Once you have the licensed font files, add them to `assets/fonts/` and
   uncomment the `@font-face` block at the top of `style.css`.

2. **Images & video.** Every photo right now is a placeholder from Unsplash
   so the layout and animations can be reviewed. Swap the `<img>` `src`
   attributes (and optionally the hero on `index.html`) for your own event
   photography — a muted autoplay looping `<video>` in the homepage hero
   would give it the closest feel to wsc.club's video hero; the CSS already
   supports either an `<img>` or `<video>` in `.hero-media`.

3. **Forms.** Every form has `data-endpoint="https://formspree.io/f/REPLACE_ME"`.
   Replace `REPLACE_ME` with your real Formspree form IDs (one per form, or
   reuse one) to wire submissions into your existing Formspree → Zapier →
   Google Sheets pipeline.

## Pushing to GitHub

This session doesn't have a GitHub connection, so push it yourself:

```bash
git clone https://github.com/franchescabethel-fb/be-you-for-you.git
cd be-you-for-you
# copy all files from this "site" folder into the repo root
git add .
git commit -m "Rebuild BYFY site: multi-page, animated, brand-matched"
git push
```

If the repo is brand new (no commits yet), you can instead run `git init` in
this `site` folder, add the GitHub repo as a remote, and push directly:

```bash
cd site
git init
git remote add origin https://github.com/franchescabethel-fb/be-you-for-you.git
git add .
git commit -m "Initial BYFY site"
git branch -M main
git push -u origin main
```

If you'd rather I push it directly, I can do that in a future session if you
connect a GitHub integration or share a personal access token scoped to this
repo — just let me know.

## Deploying

Once pushed, connect the repo in Netlify (Add new site → Import from Git) with
no build command and `site` (or repo root, depending on where you placed the
files) as the publish directory — everything here is already flat, static HTML.
