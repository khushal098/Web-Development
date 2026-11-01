# Project – Hero Landing Page

A clean, professional hero landing page for **Project**, a digital workspace platform that helps teams write, plan, and collaborate with AI tools. Built with **Tailwind CSS only** (no custom CSS) to demonstrate advanced positioning techniques.

## Features

- **Sticky navbar** – logo, navigation links (Product, Solutions, Resources, Pricing, Log in) and a "Get AI free" button
- **Hero section** – light orange to white gradient, centered two-line headline and description
- **Call-to-action buttons** – "Get AI free →" and "Request a demo", aligned horizontally
- **Dashboard preview** – main image centered with absolute positioning inside a relative parent
- **Floating cards** – Tasks, Project Status and Team Activity cards placed around the image
- **Fixed chat widget** – 💬 button pinned to the bottom-right corner

## Tailwind Utilities Used

| Area | Classes |
|------|---------|
| Navbar | `sticky top-0 z-50` |
| Hero background | `bg-gradient-to-b from-orange-50 to-white` |
| CTA wrapper | `relative z-10 flex justify-center gap-1` |
| Dashboard container | `relative h-80 md:h-96` |
| Dashboard image | `absolute left-1/2 -translate-x-1/2 z-10` |
| Floating cards | `absolute z-20 shadow-lg px-4 py-3` |
| Chat widget | `fixed bottom-6 right-6 z-50` |

Spacing (`p-`, `m-`, `gap-`) and color (`bg-`, `text-`) utilities are used throughout.

## Getting Started

### Option 1: Tailwind CDN (default)

1. Download or clone the project.
2. Open `index.html` in any browser. No build step is needed.

The page loads Tailwind via:

```html
<script src="https://cdn.tailwindcss.com"></script>
```

### Option 2: Tailwind CLI

1. Install Node.js, then install Tailwind:
   ```bash
   npm init -y
   npm install tailwindcss @tailwindcss/cli
   ```
2. Create `src/input.css`:
   ```css
   @import "tailwindcss";
   ```
3. Move `index.html` into `src/` and replace the CDN `<script>` with:
   ```html
   <link href="./output.css" rel="stylesheet">
   ```
4. Start the build:
   ```bash
   npx @tailwindcss/cli -i ./src/input.css -o ./src/output.css --watch
   ```
5. Open `src/index.html` in your browser.

## Project Structure

```
.
├── index.html
└── README.md
```

## Notes

- The dashboard image and team avatars load from Unsplash and pravatar, so an internet connection is required. Replace them with local images if needed.
- The floating cards are hidden on screens smaller than `md` to avoid overlapping the dashboard image.
- The empty spacer `div` at the bottom of the page lets you scroll to test the sticky navbar and fixed chat widget. It can be removed.

## Built With

- HTML5
- [Tailwind CSS](https://tailwindcss.com/)