# LANTERN: See through the scam.

LANTERN is an interactive scam message investigation web application designed to help people spot manipulation clues, understand persuasion blueprints, and verify claims safely without technical cybersecurity expertise.

## Key Features

1. **Message X-Ray (Stage 1 & 2):** Paste messages, try realistic demo scenarios, or extract text from PNG/JPG/WebP screenshots locally in the browser using `tesseract.js`. Suspicious exact substrings are illuminated with interactive explanation cards.
2. **The Deception Blueprint (Stage 3):** Dynamic node-link visualization mapping observable text clues to hypothesized sender goals without inventing unsupported evidence.
3. **Safety Assessment Panel:** Three calm, evidence-backed levels (`High concern`, `Verify carefully`, `No obvious warning signs`) with explicit verification boundary notes and zero fake percentages.
4. **Safe Exit Route (Stage 4):** Context-aware interactive checklist (Banking, Parcel Delivery, Customer Support, Recruitment, Friend/Family Impersonation) with completion tracking and one-click redacted summary export.
5. **Spot the Trap Simulator (`/learn`):** Interactive SMS/chat learning experience with five realistic scenarios, clickable phrase detection, feedback, and a social engineering field guide.
6. **Privacy-First Architecture (`/about`):** Zero external API keys required, zero database persistence, local browser OCR, untrusted URL isolation, and sensitive token redaction.

## Tech Stack

- **Framework:** Next.js (App Router) + TypeScript
- **Styling & Motion:** Tailwind CSS + Motion for React + Lucide Icons
- **OCR:** Client-side `tesseract.js`
- **Validation:** `zod`

## Local Setup

```bash
npm install
npm run dev
```

Open `http://localhost:3000` in your browser. No API keys or `.env` secrets are required.

## Verification Scripts

```bash
npm run lint
npx tsc --noEmit
npm run build
```

## Deploying to Vercel

1. Push this repository to GitHub, GitLab, or Bitbucket.
2. Import the project in [Vercel](https://vercel.com/new).
3. Keep default Next.js build settings (`npm run build`). No environment variables or databases are required.
4. Click **Deploy**.
