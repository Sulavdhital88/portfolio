# Sulav Dhital — Personal Portfolio Website 🚀

Welcome to your modern, 3D-accented personal portfolio website! This project is crafted with semantic **HTML5**, responsive **CSS3**, and interactive vanilla **JavaScript** to showcase your graphic design masterpieces (esports posters, matchday graphics, branding, social designs), UI/UX explorations, and web development projects.

Designed with an **obsidian dark theme**, ambient **cyber-emerald aura**, 3D perspective parallax cards, full-screen image lightbox, and category filtering.

---

## 📁 1. Project Directory Structure

```text
MyPortfolio/
│
├── index.html                  # Main website structure, markup, and content
├── style.css                   # Custom styles, 3D cards, glassmorphism, responsive grid
├── script.js                   # Interactive logic (filters, lightbox, 3D tilt, validation)
│
├── images/
│   ├── profile/
│   │   └── profile.jpg         # Your studio portrait photo
│   │
│   ├── graphic-design/         # Your Photoshop design showcase
│   │   ├── matchday-messi.jpg        # Match Day: Argentina vs Switzerland (World Cup 2026)
│   │   ├── matchday-haaland-kane.jpg # Match Day: Norway vs England
│   │   ├── esports-deadly-duo.jpg    # Deadly Duo Esports Poster
│   │   ├── esports-raw-roster.jpg    # RAW Esport Official PUBGM Roster
│   │   ├── esports-wave-champions.jpg# Wave Esports Champions Poster
│   │   ├── poster-messi-goat.jpg     # Lionel Messi King on Throne "GOAT"
│   │   ├── nike-jordan4.jpg          # Nike Air Jordan 4 Retro Military Black
│   │   ├── nike-nigel-sylvester.jpg  # Nike Air x Nigel Sylvester 1 Low OG
│   │   ├── social-pizza-promo.jpg    # Delicious Pizza 30% Off Social Creative
│   │   ├── social-ielts-admission.jpg# Mahima Education IELTS Admission
│   │   ├── esports-top-igls.jpg      # Top Five IGLs of Nepal PUBG Mobile
│   │   └── jersey-yolo-mockup.jpg    # YOLO Esports 3D Jersey Mockup
│   │
│   └── uiux/
│       ├── ui-dashboard.svg          # Modern SaaS Analytics Dashboard UI
│       ├── ui-mobile-app.svg         # Modern Esports & Gaming Stream Mobile UI
│       └── ui-ecommerce.svg          # Modern Streetwear Sneaker Storefront UI
│
├── resume/
│   └── resume.pdf              # Your official resume PDF
│
└── README.md                   # Comprehensive guide and documentation
```

---

## 📸 2. How to Add Your Own Graphic Design Work (Step-by-Step)

### Step 1: Exporting from Photoshop
When saving your poster or banner from Adobe Photoshop:
1. Go to **File > Export > Export As...** (or press `Ctrl + Alt + Shift + W`).
2. Set **Format** to **JPG**.
3. Set **Quality** to **80% - 85%** (gives crystal-clear quality while keeping file size small, under 300 KB).
4. Set **Width** to approximately **1200px - 1600px**.
5. Check **"Convert to sRGB"** to ensure colors match accurately on all screens and phones.

### Step 2: Naming and Placing Your Image
1. Name your file using lowercase letters and hyphens (e.g. `pubg-champions-banner.jpg`).
2. Move or copy the exported file into your folder:
   `MyPortfolio/images/graphic-design/pubg-champions-banner.jpg`

### Step 3: Adding the Project Card to HTML
Open `index.html` in VS Code, find the `<div class="gallery-grid" id="galleryGrid">` section, and paste this block:

```html
<!-- New Project Card -->
<article class="gallery-card tilt-card" data-category="esports">
  <div class="card-media">
    <img src="images/graphic-design/pubg-champions-banner.jpg" alt="PUBG Champions Banner" loading="lazy">
    <div class="card-overlay">
      <span class="view-pill">Click to Enlarge 🔍</span>
    </div>
  </div>
  <div class="card-meta">
    <span class="meta-tag">Esports &amp; Gaming</span>
    <h3 class="card-title">PUBG Champions Tournament Banner</h3>
    <p class="card-tools"><strong>Tool:</strong> Adobe Photoshop</p>
    <p class="card-desc">Championship celebration poster with dynamic lighting and team badge artwork.</p>
  </div>
</article>
```

### Step 4: Setting the Category Filter
In the `data-category` attribute, assign one or more categories:
- `esports` (shows up when "Esports & Gaming" is clicked)
- `posters` (shows up when "Creative Posters" is clicked)
- `branding` (shows up when "Branding & Merch" is clicked)
- `social` (shows up when "Social & Promo" is clicked)
- You can combine categories (e.g., `data-category="posters esports"`).

---

## 👤 3. How to Update Your Profile Photo and Resume

- **Profile Portrait:** Save any new photo as `profile.jpg` inside `MyPortfolio/images/profile/`. It will automatically appear in your hero section and about section!
- **Resume PDF:** Save any updated resume PDF as `resume.pdf` inside `MyPortfolio/resume/`. The "Download Resume" buttons throughout the site will immediately link to your newest resume!

---

## 💻 4. How to Run Locally in VS Code

1. Download or open the `MyPortfolio` folder in **Visual Studio Code**.
2. Install the **Live Server** extension (by Ritwick Dey) from the Extensions tab (`Ctrl + Shift + X`).
3. Right-click on `index.html` in the file explorer.
4. Select **"Open with Live Server"**.
5. Your browser will automatically open at `http://127.0.0.1:5500`. Any edits you make in HTML, CSS, or JS will immediately reload in real time!

---

## 🚀 5. How to Deploy Online for Free

### Option 1: GitHub Pages (Recommended)
1. Log in to [GitHub.com](https://github.com) and click **"New Repository"**.
2. Name your repository (e.g., `portfolio` or `sulavdhital.github.io`). Keep it **Public**.
3. Push or upload all the files from your `MyPortfolio` folder to the repository root.
4. In your GitHub repository, click **Settings > Pages** (on the left menu).
5. Under **Branch**, select `main` (or `master`) and directory `/ (root)`, then click **Save**.
6. Wait 1–2 minutes, and your website will be live at:
   `https://<your-username>.github.io/<repository-name>/`

### Option 2: Netlify (Instant Drag-and-Drop)
1. Sign up at [Netlify.com](https://www.netlify.com).
2. Go to the **"Sites"** tab.
3. Drag and drop your whole `MyPortfolio` folder into the upload box.
4. Netlify will instantly generate a live HTTPS link (e.g., `sulav-dhital.netlify.app`).

---

## 📬 6. Connecting Your Contact Form to Formspree

The contact form in `index.html` comes with built-in client-side validation. To have messages delivered straight to your email inbox:
1. Sign up for free at [Formspree.io](https://formspree.io).
2. Create a new form and copy your unique Form ID (e.g., `xpznkydw`).
3. In `index.html`, find `<form id="contactForm" class="contact-form" novalidate>` and add your action attribute:
   ```html
   <form id="contactForm" class="contact-form" action="https://formspree.io/f/xpznkydw" method="POST" novalidate>
   ```
4. Submissions will now be delivered directly to `sulavdhital134@gmail.com`!

---

## 🎓 7. Beginner-Friendly Code Architecture Guide

As a BSc IT student, understanding how the pieces work together is essential:

1. **HTML5 (`index.html`):** The skeleton of your website. Semantic tags such as `<header>`, `<main>`, `<section>`, `<article>`, and `<footer>` provide proper structure, improve SEO, and make your site accessible for screen readers.
2. **CSS3 (`style.css`):** The visual presentation and aesthetics. Uses CSS custom properties (variables) for consistent colors, Flexbox and CSS Grid for responsive 2D layouts, and `backdrop-filter` for glassmorphism.
3. **Vanilla JavaScript (`script.js`):** The brain and interaction engine. It listens to user actions (scrolling, clicking filters, clicking cards, moving mouse) and dynamically updates classes, opens the full-screen lightbox modal, and validates form inputs.
