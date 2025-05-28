
# ⚽ FutboLegendsReact

FutboLegendsReact is an interactive web application for visualizing, comparing, and analyzing modern football statistics using advanced charts, dynamic tables, and rich visualizations. Built with React + Vite, Redux Toolkit, and a modular structure optimized for scalability.

---

## 📁 Project Structure

```
FutboLegendsReact/
├── public/              # Public assets like images and static JSON data
├── scripts/             # Scripts for data preprocessing and cleanup
├── src/                 # Main source code of the application
│   ├── assets/          # Internal images, styles, and static resources
│   ├── charts/          # Graphs and data visualizations
│   ├── context/         # Redux Toolkit global store configuration
│   ├── layout/          # Layout components (header, filters, etc.)
│   ├── misc/            # Reusable UI functional components
│   ├── pages/           # Complete views (home, profile, compare, leagues, etc.)
│   ├── tables/          # Interactive and dynamic data tables
│   ├── utilities/       # Hooks, helpers, and data types
│   ├── App.jsx          # App-level routing and layout
│   └── main.jsx         # Vite entry point
├── index.html           # Base HTML file
├── vite.config.js       # Vite configuration
└── package.json         # Dependencies and scripts
```

---

## ⚙️ Main Technologies

- **React + Vite** – Modern frontend with fast rendering and optimized dev server.
- **Redux Toolkit** – Efficient global state management.
- **Recharts / d3** – Dynamic graph visualizations.
- **Custom Hooks** – Modular and reusable logic.
- **CSS Modules / Vanilla CSS** – Scoped styling.
- **JSON Data Mock** – Simulated API through local files.

---

## 🧠 Component Overview

| Module         | Main Functionality                                             |
|----------------|----------------------------------------------------------------|
| `charts/`      | Renders various stats visualizations (bar, radar, etc).        |
| `tables/`      | Displays data in interactive, filterable tables.               |
| `pages/`       | Complete views like Home, Player Profile, Compare.             |
| `layout/`      | Contains `Header`, `Footer`, league filters, stats filters.    |
| `context/`     | Redux store + custom slices like `playerSlice`.                |
| `misc/`        | Common UI elements like `Tooltip`, `FlagIcon`, `Search`.       |
| `scripts/`     | Manual scripts to clean, merge or transform input JSON files.  |

---

## 🚀 Development Scripts

Use these commands to run the project locally:

```bash
# Install dependencies
npm install

# Start dev server
npm run dev

# Build for production
npm run build

# Run data processing scripts (optional)
node scripts/process-data.js
```

---

## 🔗 App Routes

| Route                  | Description                                                  |
|------------------------|--------------------------------------------------------------|
| `/`                    | Main landing page with global comparisons.                   |
| `/compare`             | Compare players head-to-head.                                |
| `/league/:leagueId`    | League page showing teams, stats, player of the week.        |
| `/team/:teamId`        | Specific team detail page.                                   |
| `/player/:playerId`    | Individual player profile (stats, charts, bio).              |
| `/rankings`            | Custom rankings by stat category.                            |

---

## 🧪 Mock Data

The app uses mock JSON data stored in `public/Data/`, including:

- `data.json` – Main dataset.
- `output.json` – Processed results.
- `matchData.json` – Match-level data.
- `maxValues.json` – Reference values for stat normalization.

> ⚠️ **Note:** In production, these should come from a real backend (REST API, GraphQL, or n8n/Node.js service).

---

## 🧰 Utilities and Helpers

- `useClickOutside` – Closes dropdowns on outside click.
- `storeHelpers.js` – Redux middlewares and persistence.
- `flag-icons.json` – Mapping between countries and flags.

---

## 📦 Key Dependencies

```json
{
  "react": "^18.x",
  "redux": "^4.x",
  "recharts": "^2.x",
  "vite": "^5.x",
  "classnames": "^2.x"
}
```

---

## 📌 Potential Improvements

- Migrate `public/Data` to real backend API.
- Add authentication and user profiles.
- Improve mobile responsiveness with Tailwind or media queries.
- Add animations with Framer Motion.
- Automate data updates using scrapers (Puppeteer, n8n, etc).

---

## 🧑‍💻 Authors and Credits

- Design & Development: [Your Name Here]
- Base Data: [Add source if applicable, e.g. Transfermarkt, Sofascore]

---

## 📝 License

This project is licensed under the [MIT License](LICENSE).
