# NEON GAMER ULTRA

NEON GAMER ULTRA is a futuristic Windows gaming optimization hub UX prototype, built with React + TypeScript and designed for Electron/Tauri desktop packaging.

## Highlights

- One-click optimization workflow with safety-aware rollback messaging.
- Game-specific profiles (boost strategy, power plan, network mode, and launch automation).
- Real-time telemetry dashboard (CPU/GPU/RAM/FPS/Ping/Frame-time).
- AI performance assistant cards with confidence and impact scoring.
- Modular architecture (`components`, `hooks`, `services`, `data`) ready for native Windows integration.
- Free vs Pro feature separation for commercial monetization.

## Tech Stack

- React 19 + TypeScript
- Vite 6
- CSS-based neon/glassmorphism design system
- Native bridge abstraction (`SystemBridge`) for future Windows API integrations

## Project Structure

```txt
.
├── App.tsx
├── types.ts
├── src
│   ├── components/
│   ├── data/
│   ├── hooks/
│   ├── services/
│   └── styles/
```

## Development

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
```

## Production Integration Notes

To reach full commercial parity with tools like MSI Afterburner / Razer Cortex, connect `src/services/systemBridge.ts` to:

- Signed native modules (Rust/C++/C#) for performance and safety-critical operations.
- Elevated permission workflows with explicit consent screens.
- Driver-level telemetry providers for accurate hardware stats.
- Reversible tweak registry and restore-point orchestration.
