+ Project: Workspace Landing Page

A hero landing page for "+ Project", an AI-powered project workspace. Built with plain HTML and the Tailwind CSS CDN script. There is no compiled CSS and no custom <style> rules.

Features
Sticky navbar (sticky top-0 z-50) with the + Project logo, links (Product, Solutions, Resources, Pricing, Log in) and a "Get AI free" button
Light orange to white gradient hero (bg-gradient-to-b from-orange-100 to-white)
Centered headline, "Write, plan, share. With AI at your side.", with a descriptive paragraph
"Get AI free" and "Request a demo" buttons placed side by side with relative and absolute
Dashboard preview: relative parent with a centered absolute image (left-1/2 -translate-x-1/2)
Three floating cards (Tasks, Project Status, Team Activity) using absolute, z-20 and shadow-xl
Fixed chat widget at the bottom right (fixed bottom-6 right-6 z-50)
Responsive layout
Run it

Keep index.html and dashboard.svg in the same folder, then open index.html in a browser. An internet connection is needed for the Tailwind CDN.

Files
.
├── index.html      # page (Tailwind CDN + small chat toggle script)
├── dashboard.svg   # dashboard preview image
└── README.md