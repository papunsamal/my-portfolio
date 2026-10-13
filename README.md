# Papun Samal | MERN Stack Portfolio

A single-page, animated, mobile-responsive developer portfolio built with the **MERN stack** (MongoDB, Express, React, Node.js).
Dark cyberpunk theme with particle background, typing effect, rotating photo rings, and scroll-spy navigation.
The contact form saves messages to MongoDB and sends an email notification via Gmail (Nodemailer).

- **Owner:** Papun Samal
- **GitHub:** https://github.com/papunsamal
- **LinkedIn:** https://www.linkedin.com/in/papunsamal/

---

## Quick Summary (for AI tools and new contributors)

| Item | Value |
|---|---|
| Type | Full-stack portfolio website (single page, scroll based) |
| Frontend | React 18+ (Vite), plain CSS, Framer Motion, Axios, React Icons |
| Backend | Node.js, Express, Mongoose, Nodemailer, CORS, dotenv |
| Database | MongoDB Atlas (database name: `portfolio`) |
| Routing | **No React Router.** One page with anchor links (`#home`, `#about`, ...) |
| Styling | One global file: `client/src/index.css` (no Tailwind) |
| Frontend dev port | `5173` (Vite) |
| Backend dev port | `5000` (Express) |
| Language | JavaScript (components use `.jsx`, server files use `.js`) |
| Module system | Frontend: ES Modules. Backend: CommonJS (`require`) |

---

## Features

- Preloader screen on first load
- Hero section with typing effect, animated stat counters, social icons, resume download, profile photo with rotating rings
- Interactive particle network canvas background (fewer particles on mobile, pauses when tab is hidden)
- Scroll-spy navbar (active link updates while scrolling, animated underline, mobile hamburger menu)
- About, Skills (progress bars), Projects (data from MongoDB, tech filter, 3D tilt cards), Education timeline
- Contact form: validates input, saves to MongoDB, emails the owner
- Fully responsive (tablet and mobile breakpoints)
- Scroll reveal animations using Framer Motion

---

## Tech Stack

**Frontend:** `react`, `react-dom`, `vite`, `framer-motion`, `axios`, `react-icons`
**Backend:** `express`, `mongoose`, `cors`, `dotenv`, `nodemailer`, `nodemon` (dev)
**Fonts (Google Fonts):** Space Mono (body), Syne (headings)

---

## Project Structure

```
My-Portfolio-Project/
├── README.md
├── client/                          # React frontend (Vite)
│   ├── index.html                   # Loads Google Fonts, root div
│   ├── package.json
│   ├── public/
│   │   ├── profile.jpg              # About section photo
│   │   ├── home-photo.jpg           # Hero (home) section photo
│   │   └── resume.pdf               # Resume download target
│   └── src/
│       ├── main.jsx                 # React entry point
│       ├── App.jsx                  # Composes all sections
│       ├── index.css                # ALL styles (global, responsive)
│       ├── data/
│       │   └── socials.js           # GitHub, LinkedIn, email links (edit here)
│       └── components/
│           ├── Navbar.jsx           # Sticky nav, scroll-spy, hamburger
│           ├── Hero.jsx             # Home section, typing effect, counters
│           ├── About.jsx            # About text, skill tags, photo
│           ├── Skills.jsx           # Skill categories with progress bars
│           ├── Projects.jsx         # Fetches /api/projects, filter, tilt
│           ├── TiltCard.jsx         # 3D tilt wrapper for project cards
│           ├── Education.jsx        # Timeline
│           ├── Contact.jsx          # Contact form (POST /api/contact)
│           ├── Footer.jsx           # Footer with social links
│           ├── SocialLinks.jsx      # Round GitHub/LinkedIn/Email icons
│           ├── ParticleBackground.jsx  # Canvas particle animation
│           ├── Preloader.jsx        # Loading screen
│           └── Reveal.jsx           # Scroll-reveal wrapper (Framer Motion)
└── server/                          # Express backend
    ├── package.json
    ├── index.js                     # App entry: DB, email, routes
    ├── seed.js                      # Inserts sample projects into MongoDB
    ├── .env                         # Secrets (NOT committed)
    └── models/
        ├── Contact.js               # Contact message schema
        └── Project.js               # Project schema
```

---

## Prerequisites

- Node.js 18 or newer
- A free MongoDB Atlas account (https://www.mongodb.com/atlas)
- A Gmail account with 2-Step Verification enabled (for contact email notifications)

---

## Setup and Run (Local)

### 1. Clone and install

```bash
git clone https://github.com/papunsamal/<repo-name>.git
cd <repo-name>

# Backend
cd server
npm install

# Frontend
cd ../client
npm install
```

### 2. Create `server/.env`

```env
MONGO_URI=mongodb+srv://<db_user>:<db_password>@cluster0.xxxxx.mongodb.net/portfolio?retryWrites=true&w=majority
PORT=5000
EMAIL_USER=your-gmail@gmail.com
EMAIL_PASS=your-16-letter-gmail-app-password
# Optional: send notifications to a different inbox
# EMAIL_TO=another@example.com
```

Notes:
- Keep the database name (`/portfolio`) in the connection string, otherwise data goes to the default `test` database.
- Use a database password with only letters and numbers. Special characters (`@ # %`) must be URL-encoded.
- `EMAIL_PASS` must be a **Gmail App Password** (Google Account > Security > App passwords), not the normal Gmail password.

### 3. Seed sample projects (optional but recommended)

Edit `server/seed.js` with real project data, then:

```bash
cd server
node seed.js
```

Expected output: `Projects added!`

### 4. Start both servers (two terminals)

```bash
# Terminal 1: backend
cd server
npm run dev        # nodemon index.js -> http://localhost:5000

# Terminal 2: frontend
cd client
npm run dev        # Vite -> http://localhost:5173
```

Expected backend output:
```
Server running on port 5000
MongoDB connected
```

---

## Environment Variables

| Variable | Where | Required | Description |
|---|---|---|---|
| `MONGO_URI` | `server/.env` | Yes | MongoDB Atlas connection string including `/portfolio` |
| `PORT` | `server/.env` | No | Backend port (default `5000`) |
| `EMAIL_USER` | `server/.env` | For email | Gmail address used to send (and receive) notifications |
| `EMAIL_PASS` | `server/.env` | For email | Gmail App Password (16 characters, no spaces) |
| `EMAIL_TO` | `server/.env` | No | Override the notification recipient |
| `VITE_API_URL` | `client/.env` | In production | Deployed backend URL, e.g. `https://my-api.onrender.com` (no trailing slash). Defaults to `http://localhost:5000` |

---

## API Reference

Base URL (local): `http://localhost:5000`

| Method | Endpoint | Body | Response |
|---|---|---|---|
| GET | `/` | none | `API is running` |
| GET | `/api/projects` | none | `200` JSON array of projects |
| POST | `/api/contact` | `{ name, email, message }` (all required) | `201 { message }`, `400` if a field is missing, `500` on error |

Behavior of `POST /api/contact`: saves to the `contacts` collection, then tries to send an email. If the email fails, the message is **still saved** and the API still returns `201`.

---

## Database Schemas (MongoDB, database: `portfolio`)

**Collection `contacts`** (model `Contact`)

| Field | Type | Notes |
|---|---|---|
| `name` | String | required |
| `email` | String | required |
| `message` | String | required |
| `createdAt` | Date | default `Date.now` |

**Collection `projects`** (model `Project`)

| Field | Type | Notes |
|---|---|---|
| `title` | String | |
| `description` | String | |
| `techStack` | [String] | used for the filter buttons |
| `githubLink` | String | optional |
| `liveLink` | String | optional, hidden if empty |

---

## How to Customize (Common Edits)

| What to change | File | What to edit |
|---|---|---|
| GitHub / LinkedIn / email links | `client/src/data/socials.js` | `socials` object |
| Name, typing roles, stat numbers | `client/src/components/Hero.jsx` | `roles` array, `<Counter target={...} />` |
| Home photo | `client/src/components/Hero.jsx` | `HOME_PHOTO` constant (file in `client/public/`) |
| About photo and bio | `client/src/components/About.jsx` | `<img src="/profile.jpg">` and text |
| Skill levels | `client/src/components/Skills.jsx` | `categories` array |
| Education entries | `client/src/components/Education.jsx` | `education` array |
| Projects shown | `server/seed.js` | `projects` array, then run `node seed.js` |
| Colors, fonts, spacing | `client/src/index.css` | CSS rules (accent colors `#00f5a0`, `#00d9f5`; background `#0a0e0d`) |
| Resume | `client/public/resume.pdf` | replace the file |
| Page title | `client/index.html` | `<title>` |

---

## Design Tokens

| Token | Value |
|---|---|
| Background | `#0a0e0d` |
| Primary accent (green) | `#00f5a0` / `#2ee6a8` |
| Secondary accent (cyan) | `#00d9f5` / `#1cc8ff` |
| Card background | `rgba(17, 17, 17, 0.8)` |
| Heading font | Syne (700, 800) |
| Body font | Space Mono (400, 700) |
| Mobile breakpoint | `max-width: 800px` (also `1000px` tablet, `400px` small phones) |

---

## Architecture Notes (important for AI tools modifying this code)

1. **Single page, no router.** Sections have ids: `home`, `about`, `skills`, `projects`, `education`, `contact`. The navbar uses `<a href="#id">` links and an `IntersectionObserver` for the active-link highlight. Do not add React Router unless converting to multi-page.
2. **Section components must keep their `id`** (for example `<section id="about" className="section">`), because Navbar observes them. `Hero` uses `id="home"`.
3. **All styling lives in `client/src/index.css`.** There are no CSS modules and no Tailwind. Class names are global.
4. **`Reveal.jsx`** wraps sections in `App.jsx` for scroll-in animation. `Hero` is not wrapped (it has its own entry animation).
5. **Photos:** Hero uses `/home-photo.jpg`, About uses `/profile.jpg`. Both are served from `client/public/`. Paths start with `/`.
6. **API base URL** is read from `import.meta.env.VITE_API_URL`, falling back to `http://localhost:5000`. Used in `Projects.jsx` and `Contact.jsx`.
7. **Backend is CommonJS** (`require`), frontend is ESM (`import`). Do not mix them.
8. **DNS workaround:** `server/index.js` and `seed.js` start with `dns.setServers(['8.8.8.8', '8.8.4.4'])` to avoid `querySrv ECONNREFUSED` errors with `mongodb+srv://` URIs on some networks. Keep it unless the network is known to be fine.
9. **Performance:** `ParticleBackground.jsx` reduces particle count on mobile and stops when the tab is hidden. Keep photos compressed (WebP recommended, under 150 KB).

---

## Deployment

### Backend on Render
1. Push the repo to GitHub (make sure `.env` and `node_modules` are in `.gitignore`).
2. Render > New > Web Service > connect the repo.
3. Root directory: `server`. Build command: `npm install`. Start command: `npm start`.
4. Add environment variables: `MONGO_URI`, `EMAIL_USER`, `EMAIL_PASS` (and `EMAIL_TO` if used).
5. In MongoDB Atlas > Network Access, allow `0.0.0.0/0`.

### Frontend on Vercel
1. Vercel > Add New Project > import the repo.
2. Root directory: `client`. Framework preset: Vite.
3. Add environment variable `VITE_API_URL` = your Render backend URL (no trailing slash).
4. Deploy. Because this is a single-page anchor-based site, no rewrite rules are needed.

Optional hardening after deploy: restrict CORS in `server/index.js` to your Vercel domain.

---

## Troubleshooting

| Symptom | Cause | Fix |
|---|---|---|
| `querySrv ECONNREFUSED` | DNS cannot resolve the Atlas SRV record | Keep the `dns.setServers` lines, or switch system DNS to `8.8.8.8` |
| `bad auth : authentication failed` | Wrong DB username or password | Create a new Atlas database user and update `MONGO_URI` |
| `MongooseServerSelectionError` | IP not allowed in Atlas | Atlas > Network Access > allow `0.0.0.0/0` |
| `/api/projects` returns 500 | DB not connected | Check backend terminal for `MongoDB connected` |
| Projects section empty (`[]`) | Database not seeded | Run `node seed.js` inside `server/` |
| `Cannot find module 'seed.js'` | Command run from the wrong folder | `cd server` first |
| Photo not showing (alt text visible) | File missing in `client/public/` or wrong name/extension | Check exact filename, enable "File name extensions" in Windows Explorer |
| Page looks unstyled / white | `index.css` missing content or Vite default CSS present | Replace `index.css`, delete `App.css` |
| Email not received | Wrong App Password or 2-Step Verification off | Regenerate the App Password, check the Spam folder, read the `Email nahi gaya:` log in the backend terminal |
| `.env` changes not applied | Server not restarted | Stop and rerun `npm run dev` |

---

## Scripts

**server/package.json**
```json
"scripts": {
  "dev": "nodemon index.js",
  "start": "node index.js"
}
```

**client/package.json** (Vite defaults)
```
npm run dev       # development server
npm run build     # production build -> client/dist
npm run preview   # preview the production build
```

---

## Security Checklist

- Never commit `.env`. Use this `server/.gitignore`:
  ```
  node_modules
  .env
  ```
- Never share the Atlas password or Gmail App Password publicly.
- Rotate credentials immediately if they were ever pasted in a public place.

---

## Possible Future Improvements

- Admin panel with JWT login to add, edit, and delete projects from the website
- Contact messages dashboard
- Dark/light theme toggle, scroll progress bar, back-to-top button
- Certifications and experience sections
- Project detail modal, visitor counter, SEO meta tags and social preview image
- Rate limiting and spam protection (honeypot field) on `/api/contact`

---

## License

Personal portfolio project. Feel free to use it as a reference or template. Please replace the personal content (name, photos, links, text) with your own.