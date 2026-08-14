# 📬 Contact Form Setup Guide

Your portfolio ships with a **production-ready contact form** that delivers messages directly to `mohdasadmomin766@gmail.com`. You have **two implementation options** — pick whichever fits your deployment.

---

## ✅ Option 1 — EmailJS (Recommended, already integrated)

This is the **serverless** approach. No backend needed. Perfect for a Vite/React portfolio deployed on **Vercel, Netlify, or GitHub Pages**. It's what your site is currently wired to use.

### Why EmailJS?
- 200 free emails/month (more than enough for a portfolio)
- No server to host, deploy, or pay for
- Works with static hosting
- Public key is safe to expose in the browser
- Delivers straight to your Gmail inbox

### Step-by-step Setup

**1. Create an EmailJS account**
- Go to https://www.emailjs.com and sign up (free tier)

**2. Add an Email Service**
- Dashboard → *Email Services* → *Add New Service* → **Gmail**
- Connect `mohdasadmomin766@gmail.com`
- Copy the **Service ID** (looks like `service_xxxxxxx`)

**3. Create an Email Template**
- Dashboard → *Email Templates* → *Create New Template*
- **To Email**: `mohdasadmomin766@gmail.com`
- **From Name**: `{{from_name}}`
- **Reply To**: `{{reply_to}}`
- **Subject**: `Portfolio Contact — {{subject}}`
- **Content** (paste this):
  ```
  You received a new message from your portfolio contact form.

  Name:    {{from_name}}
  Email:   {{from_email}}
  Subject: {{subject}}

  Message:
  {{message}}
  ```
- Save and copy the **Template ID** (looks like `template_xxxxxxx`)

**4. Get your Public Key**
- Dashboard → *Account* → *General* → copy **Public Key**

**5. Add credentials to your project**
- Copy `.env.example` → rename to `.env`
- Fill in the three values:
  ```env
  VITE_EMAILJS_SERVICE_ID=service_xxxxxxx
  VITE_EMAILJS_TEMPLATE_ID=template_xxxxxxx
  VITE_EMAILJS_PUBLIC_KEY=xxxxxxxxxxxxxxxxx
  ```
- Restart the dev server: `npm run dev`

**6. Deploy to Vercel**
- Push to GitHub → Import repo in Vercel
- In Vercel → *Project Settings* → *Environment Variables*, add the same three `VITE_EMAILJS_*` variables
- Redeploy — done ✅

### Spam Protection Included
- ✅ **Honeypot field** — invisible input that bots fill and real users don't; those submissions are silently dropped
- ✅ **Client-side validation** — required fields, email format, min length
- ✅ **EmailJS built-in reCAPTCHA** — enable in Template settings if you want an extra layer

---

## 🛠 Option 2 — Node.js + Express + Nodemailer (Self-hosted backend)

Use this if you want full control, unlimited emails, or want to showcase backend skills. Deploy the API to **Render** (free tier) and the frontend anywhere.

### Folder Structure
```
portfolio/
├── client/                    # Your existing Vite/React app
│   └── src/components/Contact.tsx   # (update fetch URL to point to backend)
└── server/                    # New Express backend
    ├── src/
    │   └── index.js
    ├── .env
    ├── .env.example
    ├── .gitignore
    └── package.json
```

### 1. Create the backend

```bash
mkdir server && cd server
npm init -y
npm install express nodemailer cors dotenv express-rate-limit validator helmet
npm install -D nodemon
```

### 2. `server/package.json` scripts

```json
{
  "type": "module",
  "scripts": {
    "dev": "nodemon src/index.js",
    "start": "node src/index.js"
  }
}
```

### 3. `server/src/index.js`

```js
import express from "express";
import cors from "cors";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import nodemailer from "nodemailer";
import validator from "validator";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// ---- Security middleware ----
app.use(helmet());
app.use(express.json({ limit: "10kb" })); // Reject oversized payloads
app.use(
  cors({
    origin: process.env.CLIENT_ORIGIN?.split(",") || "*",
    methods: ["POST"],
  })
);

// ---- Rate limiting: 5 messages per 15 minutes per IP ----
const contactLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5,
  message: { ok: false, error: "Too many messages. Please try again later." },
});

// ---- Nodemailer transporter (Gmail with App Password) ----
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.GMAIL_USER,      // mohdasadmomin766@gmail.com
    pass: process.env.GMAIL_APP_PASS,  // 16-char App Password (NOT your Gmail password)
  },
});

// ---- Contact endpoint ----
app.post("/api/contact", contactLimiter, async (req, res) => {
  try {
    const { name, email, subject, message, website } = req.body;

    // Honeypot — silently discard bots
    if (website) return res.json({ ok: true });

    // Server-side validation (never trust the client)
    if (!name || !email || !subject || !message)
      return res.status(400).json({ ok: false, error: "All fields are required." });
    if (!validator.isEmail(email))
      return res.status(400).json({ ok: false, error: "Invalid email address." });
    if (message.length < 10 || message.length > 5000)
      return res.status(400).json({ ok: false, error: "Message length invalid." });

    // Sanitize to prevent HTML injection
    const clean = (s) => validator.escape(String(s).trim());

    await transporter.sendMail({
      from: `"Portfolio Contact" <${process.env.GMAIL_USER}>`,
      to: process.env.GMAIL_USER,
      replyTo: email,
      subject: `Portfolio Contact — ${clean(subject)}`,
      text: `Name: ${name}\nEmail: ${email}\n\n${message}`,
      html: `
        <h2>New portfolio message</h2>
        <p><b>Name:</b> ${clean(name)}</p>
        <p><b>Email:</b> ${clean(email)}</p>
        <p><b>Subject:</b> ${clean(subject)}</p>
        <p><b>Message:</b></p>
        <p style="white-space:pre-line">${clean(message)}</p>
      `,
    });

    res.json({ ok: true });
  } catch (err) {
    console.error("Mail error:", err);
    res.status(500).json({ ok: false, error: "Failed to send message." });
  }
});

app.get("/", (_req, res) => res.send("Portfolio contact API is live 🚀"));

app.listen(PORT, () => console.log(`API listening on :${PORT}`));
```

### 4. `server/.env.example`

```env
PORT=5000
CLIENT_ORIGIN=https://your-portfolio.vercel.app,http://localhost:5173
GMAIL_USER=mohdasadmomin766@gmail.com
GMAIL_APP_PASS=your_16_char_app_password
```

### 5. `server/.gitignore`

```
node_modules
.env
```

### 6. Generate a Gmail App Password

Regular Gmail passwords **will not work** with Nodemailer.

1. Enable **2-Step Verification** on your Google account: https://myaccount.google.com/security
2. Go to https://myaccount.google.com/apppasswords
3. App: *Mail*, Device: *Other → "Portfolio API"* → **Generate**
4. Copy the 16-character password → paste as `GMAIL_APP_PASS` in `.env`

### 7. Update the React form to call your API

Replace the `emailjs.send(...)` block in `src/components/Contact.tsx` with:

```ts
const res = await fetch(`${import.meta.env.VITE_API_URL}/api/contact`, {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({
    name: form.name,
    email: form.email,
    subject: form.subject,
    message: form.message,
    website: form.website, // honeypot
  }),
});
const data = await res.json();
if (!res.ok || !data.ok) throw new Error(data.error || "Send failed");
```

Add `VITE_API_URL=https://your-api.onrender.com` to your `.env`.

### 8. Deploy the backend to Render

1. Push the `server/` folder to a GitHub repo
2. Go to https://render.com → *New* → **Web Service**
3. Connect your repo, select the `server` folder
4. Build command: `npm install`
5. Start command: `npm start`
6. In *Environment* tab, add:
   - `GMAIL_USER` = `mohdasadmomin766@gmail.com`
   - `GMAIL_APP_PASS` = your 16-char app password
   - `CLIENT_ORIGIN` = your Vercel URL
7. Deploy — copy the live URL and paste it into your frontend's `VITE_API_URL`

### 9. Deploy the frontend to Vercel

1. Push your Vite project to GitHub
2. Import the repo in Vercel
3. Add environment variables (`VITE_API_URL`, or the `VITE_EMAILJS_*` set for Option 1)
4. Deploy ✅

---

## 🔐 Keeping Credentials Secure

| Rule | Why |
|------|-----|
| **Never commit `.env`** — it's already in `.gitignore` | Prevents leaking secrets to GitHub |
| Use **Gmail App Passwords**, not your real password | Revocable, scoped, safer |
| Store secrets in **Render / Vercel env vars**, not in code | Encrypted at rest |
| Rotate App Passwords periodically | Damage control if leaked |
| Prefix frontend vars with `VITE_` only when they're safe to expose | Anything with `VITE_` ships in the browser bundle |

---

## 🛡 Spam Protection Layers (both options include these)

1. **Honeypot field** (`website`) — hidden from users, filled by bots → dropped
2. **Client + server validation** — required fields, email format, length caps
3. **Rate limiting** (Option 2) — 5 msgs / 15 min per IP via `express-rate-limit`
4. **Helmet** (Option 2) — sets secure HTTP headers
5. **Input sanitization** — `validator.escape()` prevents HTML injection
6. **Optional reCAPTCHA** — enable in EmailJS template or add Google reCAPTCHA v3 to the form for extra bot filtering

---

## ✔ Verification Checklist

- [ ] EmailJS account created and Gmail service connected
- [ ] Template variables match the form field names
- [ ] `.env` file contains valid credentials
- [ ] Environment variables added to Vercel dashboard
- [ ] Test message sent → received in Gmail inbox
- [ ] Success/error UI states display correctly
- [ ] Honeypot verified (submitting with `website` filled returns success but sends nothing)

You're now recruiter-ready. 🎯
