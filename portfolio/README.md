# advait — portfolio

A single-page personal portfolio in a dark, terminal/monospace aesthetic
(serif display name + monospace body, dot-grid background, expandable rows,
light/dark toggle). Built from Advait M. Sawant's resume + cricket profile.

## Run it

It's a static site — no build step. Just open `index.html`:

```bash
# any static server works, e.g.
python3 -m http.server 8000   # then visit http://localhost:8000
```

Or drag `index.html` into a browser.

## Edit your content

**All copy lives in [`script.js`](script.js)** at the top — edit these arrays:

| Constant         | Section                          |
| ---------------- | -------------------------------- |
| `BUILDING_SINCE` | start date for the day counter   |
| `PREVIOUSLY`     | past roles (collapsible rows)    |
| `PROJECTS`       | projects & initiatives           |
| `PRESS`          | press clippings                  |
| `ACHIEVEMENTS`   | two-column achievements list     |

The hero text, header, email, terminal "stack", and social links live in
[`index.html`](index.html). Colours/fonts are in [`styles.css`](styles.css)
(`:root` for dark, `[data-theme="light"]` for light).

## TODO before publishing

- Fill in real social URLs (`X`, `IN`, `IG`) in `index.html` — placeholders now.
- Add a Calendly/booking link to the `CAL` nav item and "book a 30-min chat".
- Deploy free on GitHub Pages / Vercel / Netlify (point it at this folder).
