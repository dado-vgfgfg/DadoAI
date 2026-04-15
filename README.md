# F-Web Studio

F-Web Studio is an Electron desktop app for Windows-oriented local workflows.

## What it includes

- Loyalty card builder (reward points, QR join links, wallet preview, mini-page export)
- Invitation mini-page builder (templates, countdown, map link, WhatsApp RSVP, QR invite)
- QR menu builder (categories, allergens, table QR generation, HTML export)
- Project save system backed by local SQLite
- Drag/drop-ready canvas editor based on Fabric.js
- HTML / PDF export options with local file save dialogs

## Stack

- Electron + React + Vite
- Tailwind CSS
- SQLite (`better-sqlite3`)
- Fabric.js
- QRCode generator (`qrcode`)
- PDF generation (`pdf-lib`)

## Run

```bash
npm install
npm run dev
```

## Windows production build (.exe)

```bash
npm run build:win
```

The installer is generated in `release/`.
