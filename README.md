
# ⚽ FutboLegendsReact

FutboLegendsReact es una aplicación web interactiva para visualizar, comparar y analizar estadísticas de fútbol moderno usando gráficos avanzados, tablas interactivas y visualizaciones dinámicas. Está construida con React + Vite, Redux Toolkit, y una estructura modular optimizada para escalabilidad.

---

## 📁 Estructura del Proyecto

```
FutboLegendsReact/
├── public/              # Recursos públicos como imágenes y datos estáticos JSON
├── scripts/             # Scripts para preprocesamiento y limpieza de datos
├── src/                 # Código fuente principal de la aplicación
│   ├── assets/          # Imágenes internas, estilos y recursos estáticos
│   ├── charts/          # Gráficos y visualizaciones
│   ├── context/         # Configuración global de Redux Toolkit
│   ├── layout/          # Componentes de estructura persistente (header, filtros, etc.)
│   ├── misc/            # Componentes funcionales reutilizables
│   ├── pages/           # Vistas completas (home, perfil, comparación, ligas, etc.)
│   ├── tables/          # Tablas interactivas y dinámicas
│   ├── utilities/       # Hooks, funciones auxiliares y tipado
│   ├── App.jsx          # Definición de rutas y layout general
│   └── main.jsx         # Punto de entrada para Vite
├── index.html           # HTML base
├── vite.config.js       # Configuración de Vite
└── package.json         # Dependencias y scripts
```

---

## ⚙️ Tecnologías Principales

- **React + Vite** – Frontend moderno con renderizado veloz y desarrollo optimizado.
- **Redux Toolkit** – Manejo de estado global eficiente.
- **Recharts / d3** – Visualizaciones gráficas dinámicas.
- **Custom Hooks** – Modularidad y reutilización de lógica.
- **CSS Modules / Vanilla CSS** – Estilos encapsulados.
- **JSON Data Mock** – Simulación de API mediante archivos locales.

---

## 🧠 Estructura de Componentes

| Módulo         | Funcionalidad principal                                         |
|----------------|------------------------------------------------------------------|
| `charts/`      | Renderiza diferentes tipos de estadísticas visuales (bar, radar, etc). |
| `tables/`      | Presenta los datos en tablas comparables con filtros dinámicos.  |
| `pages/`       | Páginas completas como Home, Perfil de jugador, Comparaciones.   |
| `layout/`      | Contiene `Header`, `Footer`, filtros de liga, stats, etc.        |
| `context/`     | Redux store + slices personalizados (como `playerSlice`).        |
| `misc/`        | Componentes reusables como `Tooltip`, `FlagIcon`, `Search`.      |
| `scripts/`     | Scripts manuales para limpiar, unir o transformar JSONs de entrada. |

---

## 🚀 Scripts de Desarrollo

Usa estos comandos para correr el proyecto localmente:

```bash
# Instalar dependencias
npm install

# Iniciar servidor de desarrollo
npm run dev

# Compilar para producción
npm run build

# Ejecutar scripts de limpieza de datos (opcional)
node scripts/process-data.js
```

---

## 🔗 Rutas de la Aplicación

| Ruta                   | Descripción                                                  |
|------------------------|--------------------------------------------------------------|
| `/`                    | Landing principal con comparaciones generales.               |
| `/compare`             | Comparación directa entre dos o más jugadores.               |
| `/league/:leagueId`    | Vista de liga con equipos, stats y jugador destacado.        |
| `/team/:teamId`        | Detalle de un equipo específico.                             |
| `/player/:playerId`    | Perfil individual de un jugador (stats, gráficos, bio).      |
| `/rankings`            | Rankings personalizados según métricas definidas.            |

---

## 🧪 Datos Simulados

El proyecto utiliza datos JSON simulados en la carpeta `public/Data/`, incluyendo:

- `data.json` – Dataset principal.
- `output.json` – Resultados procesados.
- `matchData.json` – Partidos individuales.
- `maxValues.json` – Valores de referencia para normalización de stats.

> ⚠️ **Nota:** En producción, estos datos deben provenir de un backend o servicio tipo `n8n`, `Node.js`, etc.

---

## 🧰 Utilidades y Helpers

- `useClickOutside` – Cierra dropdowns al hacer clic fuera.
- `storeHelpers.js` – Middlewares y persistencia del estado Redux.
- `flag-icons.json` – Mapeo de banderas con países/jugadores.

---

## 📦 Dependencias Clave

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

## 📌 Posibles Mejoras Futuras

- Migrar `public/Data` a una API real (REST o GraphQL).
- Implementar autenticación para perfiles de usuario.
- Mejorar soporte móvil con media queries o Tailwind.
- Integrar animaciones con Framer Motion.
- Automatizar scraping desde fuentes deportivas (con Puppeteer o n8n).

---

## 🧑‍💻 Autores y Créditos

- Diseño y desarrollo: [Tu nombre aquí]
- Datos base: [Indicar fuente si aplica, como Transfermarkt, Sofascore, etc.]

---

## 📝 Licencia

Este proyecto está licenciado bajo [MIT](LICENSE).
