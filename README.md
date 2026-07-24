# Weather — Minimal & Vibrant React App

A small, modern weather app built with Create React App. It uses the OpenWeather API to look up current weather for any city and presents results in a polished, glassmorphic UI with a compact "More details" view.

Features
- Clean glassmorphism design with vibrant accents
- Search by city name (Enter or Search button)
- Accessible loading state and inline errors
- Progressive details panel (humidity, wind, pressure, sunrise/sunset)
- Responsive layout (desktop and mobile)

Quick Start
1. Copy the example env and add your OpenWeather API key:

```bash
cp .env.example .env.local
# then edit .env.local and set REACT_APP_WEATHER_API_KEY
```
2. Install and run:

```bash
npm install
npm start
```

Open http://localhost:3000 to view the app.

Notes
- API key: do not commit your real API key to the repository. Use `.env.local` for local development.
- The UI is intentionally minimal: only core info is shown first. Click "More details" for extended stats.

Customization Tips
- Theme colors: edit `:root` variables in `src/App.css` (`--v1`, `--v2`, etc.) to adjust gradients.
- Typography: change the imported font in `src/index.css` or replace with your favourite font.
- Component split: move `App.js` pieces into `components/SearchBar.js` and `components/WeatherCard.js` if the codebase grows.

Accessibility & Performance
- Buttons and inputs include ARIA attributes and visible focus states.
- The app respects `prefers-reduced-motion` for users who opt out of animations.

Troubleshooting
- If results show `API key not configured`, confirm `.env.local` exists and contains `REACT_APP_WEATHER_API_KEY` and restart the dev server.

Contributing
Pull requests and small improvements (tests, types, component split) are welcome.

License
This project is free to use. No license file included.

Enjoy — and tell me if you want a different color mood or a tiny deploy script for Vercel/Netlify!




