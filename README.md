# 🎨 PictoArt AI

**Turn text prompts into beautiful vector-style illustrations — instantly.**  
Built with OpenAI's DALL·E 3, PictoArt AI is a modern web app that generates, stores, and showcases high-quality vector artwork, letting users create and share stunning visuals in seconds.

---

## ✨ Features

- 🧠 Prompt-to-vector generation using OpenAI DALL·E 3
- 🎨 Color palette selection before generation
- 🖼 Public gallery of community creations
- 🔗 Shareable images with instant download support
- 👤 Auth via Clerk (email, OAuth)
- ⚡ Fast, responsive UI with animations and dark mode

---

## 🛠 Tech Stack

- **Framework**: Next.js 15 (App Router + Server Actions)
- **Frontend**: React 19, TailwindCSS, Framer Motion, Radix UI, ShadCN
- **AI Integration**: OpenAI (DALL·E 3)
- **Storage & CDN**: Cloudinary
- **Auth**: Clerk
- **State Management**: Zustand
- **Other**: Upstash Rate Limit, Stripe-ready structure, Nodemailer

---

## 🗂 Folder Structure

```
src/
├── app/
│   ├── (auth)/            # Sign-in / Sign-up routes
│   ├── (root)/            # Public routes (start, gallery)
│   ├── api/               # API routes for generate/upload
│   └── webhooks/clerk/    # Clerk webhook listener
├── components/            # UI Components
├── lib/                   # OpenAI, Cloudinary, DB utils
├── styles/                # Global CSS / Themes
├── layout.tsx            # Root layout
```

---

## 🚀 Run Locally

```bash
git clone https://github.com/tamjid-mostafa/pictoart-ai
cd pictoart-ai
pnpm install
pnpm dev
```

Make sure to add these `.env` values:

```env
OPENAI_API_KEY=
CLOUDINARY_API_KEY=
CLERK_SECRET_KEY=
DATABASE_URL=
```

---

## 🌍 Live Site

[https://pictoart-ai.vercel.app](https://pictoart-ai.vercel.app) *(replace with your domain if different)*

---

## 📬 Contact

- Portfolio: [devtamjid.com](https://devtamjid.com)  
- GitHub: [github.com/tamjid-mostafa](https://github.com/tamjid-mostafa)  
- Email: hello@devtamjid.com  

---

> Built to unlock creativity with the power of AI.  
> Fast. Interactive. Shareable.
