# YouTube Clone Frontend (React, Lightweight)

This frontend implements a YouTube-style UI using a minimal React setup (no UI frameworks) following:
- Ocean Professional theme (blue + amber accents)
- Dark palette and layout from assets/style_guide.md and assets/youtube_search_results_design_notes.md

## App Structure

- src/theme.css: Design tokens, dark colors, layout styles for header, sidebar, results, and grid.
- src/components/
  - Header: Sticky top bar with logo, search, and actions.
  - Sidebar: Left navigation with sections.
  - ResultItem: Video result card for the search page.
  - Icon: Inline SVG icon library (24x24).
- src/pages/
  - HomePage: Responsive grid of placeholder videos.
  - ResultsPage: Vertical list of search results with “Load more”.
- src/utils/
  - env.js: Env-derived URLs (REACT_APP_API_BASE, REACT_APP_BACKEND_URL, REACT_APP_FRONTEND_URL, REACT_APP_WS_URL).
  - api.js: Minimal fetch helpers using env base or mocked placeholders when base is missing.

Routing is dependency-free: App detects window.location.pathname:
- "/": Home
- "/results": Search results (expects ?search_query=... in the URL)

## Environment Variables

Provide via .env (CI/Orchestrator managed):
- REACT_APP_API_BASE=
- REACT_APP_BACKEND_URL=
- REACT_APP_FRONTEND_URL=
- REACT_APP_WS_URL=

Note: If none are provided, the app uses placeholder data for local UI development.

## Scripts

- npm start — dev server at http://localhost:3000
- npm test — basic smoke tests
- npm run build — production build

## Accessibility

- Visible focus ring using the accent color
- aria-labels on icon-only buttons
- Proper landmarks: header, nav, main
- Text contrast per dark theme guidance

## Notes

- Filters bar and real playback are out of scope in this phase.
- Voice search and menus are placeholders.
