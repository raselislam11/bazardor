# 🛒 বাজার দর — BazarDor

প্রয়োজনীয় পণ্যের দাম এক নজরে। চাল, ডাল, তেল, সবজি, মাছ-মাংসসহ দৈনন্দিন বাজারের পণ্যের আজকের দাম, দাম বাড়া-কমার হার এবং বাজারভিত্তিক তুলনা — সব এক জায়গায়, বাংলায়।

## Technologies Used

- **Next.js 14** (App Router) — routing, dynamic `[slug]` routes, middleware
- **Tailwind CSS + DaisyUI** — styling ও responsive UI
- **BetterAuth** — email/password, Google ও GitHub login, profile update
- **MongoDB Atlas** — user/session data
- **react-hot-toast** — toast notification

## Features

1. **লাইভ প্রাইস টিকার** — navbar এর নিচে infinite scrolling strip (দাম + ▲/▼ %)
2. **আজ দাম বেড়েছে / কমেছে** — শীর্ষ ৬টি করে পণ্য, বাংলা সংখ্যায় দাম
3. **ক্যাটাগরি পেজ + সাজান** — দাম কম→বেশি / বেশি→কম sort (বাংলা সংখ্যা numeric হিসেবে sort হয়)
4. **Protected পণ্যের বিস্তারিত পেজ** — সর্বনিম্ন/সর্বোচ্চ/গড় দাম ও বাজারভিত্তিক দাম (login লাগে)
5. **Authentication** — Email/Password, Google, GitHub; toast সহ error handling
6. **প্রোফাইল আপডেট** — BetterAuth `updateUser` দিয়ে নাম পরিবর্তন
7. **Skeleton loading, custom 404, fully responsive**

## Getting Started

```bash
npm install
cp .env.example .env.local   # তারপর .env.local এ নিজের মান বসাও
npm run dev
```

### Environment Variables

| Variable | কোথা থেকে পাবে |
|---|---|
| `MONGODB_URI` | MongoDB Atlas → Connect → Drivers (শেষে `/bazardor` দিও) |
| `BETTER_AUTH_SECRET` | `openssl rand -base64 32` |
| `BETTER_AUTH_URL` | লোকালে `http://localhost:3000`, Vercel এ live URL |
| `GOOGLE_CLIENT_ID/SECRET` | Google Cloud Console → OAuth client. Redirect URI: `{URL}/api/auth/callback/google` |
| `GITHUB_CLIENT_ID/SECRET` | GitHub → Settings → Developer settings → OAuth Apps. Callback: `{URL}/api/auth/callback/github` |

> Vercel এ deploy করার সময় একই variable গুলো Project Settings → Environment Variables এ দিতে হবে। MongoDB Atlas এ Network Access এ `0.0.0.0/0` allow করতে ভুলো না।

## Links

- **Live Link:** _deploy করে বসাও_
- **GitHub Repository:** _push করে বসাও_
