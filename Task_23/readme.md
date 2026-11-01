# Greenwood Public Library

A minimal, editorial-style landing page for a neighbourhood library, built with plain HTML and Tailwind CSS (CDN). No build step, no custom fonts, no extra frameworks.

## Features

- Sticky navbar with backdrop blur and animated underline links
- Hero section with large light-weight typography and a 4-column stats row
- Six interactive section cards with hover colour transitions
- 2x2 gallery with image zoom on hover
- Asymmetrical bento grid with pastel cards
- Newspaper-style text columns (`columns-1 sm:columns-2`)
- Membership cards (Basic, Student, Family) with a "Popular" badge
- Testimonial with a grayscale-to-colour avatar hover
- Contact block, events grid and multi-column footer
- Custom Tailwind keyframes for staggered entry animations
- Responsive layout, with reduced-motion support

## Run it

1. Download `index.html`.
2. Open it in any modern browser.

An internet connection is needed for the Tailwind CDN script and the Unsplash images.

## Project structure

```
.
├── index.html   # the whole page (HTML + Tailwind config + small script)
└── README.md
```

## Customising

- **Colours and animations:** edit the `tailwind.config` block at the top of `index.html`.
- **Images:** replace the Unsplash URLs in the `<img src="...">` tags.
- **Content:** change the text directly in each section. Sections are marked with `id` values (`sections`, `gallery`, `membership`, `events`, `contact`).

## Tech

- HTML5
- Tailwind CSS (Play CDN)
- A few lines of vanilla JavaScript (IntersectionObserver for scroll reveals)