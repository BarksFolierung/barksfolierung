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

## Online-Shop (Kasse & Zahlung)

Der Shop unterstützt zwei Zahlungswege:

1. **Vorkasse / Überweisung** – funktioniert sofort, keine Einrichtung nötig.
   Kunde bestellt, erhält Bestellbestätigung mit Bankdaten per E-Mail.
2. **Online-Zahlung via Stripe** (Karte, Klarna u. a.) – benötigt einen Stripe-Account.

### Umgebungsvariablen (in Netlify unter Site settings → Environment variables)

| Variable | Beschreibung |
|---|---|
| `GMAIL_USER` | Gmail-Adresse für den Mailversand (bereits vorhanden) |
| `GMAIL_APP_PASSWORD` | Gmail App-Passwort (bereits vorhanden) |
| `STRIPE_SECRET_KEY` | Stripe Secret Key (`sk_live_...`) – aus dem Stripe-Dashboard |
| `STRIPE_WEBHOOK_SECRET` | Signing Secret (`whsec_...`) des Webhooks (siehe unten) |
| `SHOP_BANK_HOLDER` | Kontoinhaber für Vorkasse-Bestellungen |
| `SHOP_BANK_IBAN` | IBAN für Vorkasse-Bestellungen |
| `SHOP_BANK_BIC` | BIC (optional) |
| `SHOP_BANK_NAME` | Bankname (optional) |
| `NEXT_PUBLIC_SITE_URL` | z. B. `https://barksfolierung.de` (Fallback für Redirect-URLs) |

### Stripe einrichten

1. Account auf [stripe.com](https://stripe.com) erstellen und verifizieren
2. Dashboard → Entwickler → API-Schlüssel → **Secret Key** kopieren → als `STRIPE_SECRET_KEY` in Netlify eintragen
3. Dashboard → Entwickler → Webhooks → **Endpoint hinzufügen**:
   - URL: `https://barksfolierung.de/api/stripe-webhook`
   - Event: `checkout.session.completed`
4. Das **Signing Secret** des Webhooks als `STRIPE_WEBHOOK_SECRET` in Netlify eintragen
5. Neu deployen – fertig

Ohne Stripe-Keys zeigt die Kasse bei Online-Zahlung einen Hinweis; Vorkasse funktioniert immer.

Versandkosten & Freigrenze lassen sich in `lib/shop-products.ts` anpassen
(`SHIPPING_NETTO`, `FREE_SHIPPING_NETTO`).
