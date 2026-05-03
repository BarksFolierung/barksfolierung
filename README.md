# BARKS Folierung – Website

Next.js 14 + Tailwind CSS website for barksfolierung.de

## Stack
- **Framework**: Next.js 14 (App Router)
- **Styling**: Tailwind CSS
- **Language**: TypeScript
- **Hosting**: Netlify (via GitHub)

## Getting Started

### 1. Install dependencies
```bash
npm install
```

### 2. Run development server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000)

### 3. Build for production
```bash
npm run build
```

## Adding Portfolio Images

Place your portfolio images in `public/portfolio/` with the filenames defined in `data/portfolio.ts`:

```
public/portfolio/
  sunset-drinks.jpg
  hugo-pfohe-kia.jpg
  elbhandwerk.jpg
  il-barolo-leuchtkasten.jpg
  belvedere.jpg
  antico.jpg
  morea.jpg
  neon-striptease.jpg
  vitamoment-fenster.jpg
  vitamoment-wand.jpg
  feuerwehr-altona.jpg
  esselmann-trailer.jpg
  gym-wand.jpg
  buero-glasfolie.jpg
```

## Deploying to Netlify via GitHub

1. Create a new GitHub repository
2. Push this project: `git init && git add . && git commit -m "init" && git remote add origin YOUR_REPO && git push -u origin main`
3. In Netlify: **Add new site → Import from Git → Select your repo**
4. Build command: `npm run build` | Publish directory: `.next`
5. Done – every push to `main` auto-deploys

## Brand Colors

Edit `tailwind.config.ts` to change the accent color:
```ts
accent: '#E53935',  // Change this to your brand color
```

## Contact Form

The form uses **Netlify Forms** – it works automatically when deployed to Netlify.
For local testing, submissions won't work until deployed.
