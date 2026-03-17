# QuestLog — Frontend

Vue 3 + TypeScript frontend for QuestLog, a web app for tracking your video game library. Search games and consoles, track play status, view library analytics, manage a wishlist, and write reviews. Targets a Go REST API backend.

## Setup

```sh
npm install
```

Copy the example env and point it at your local API:

```sh
echo "VITE_API_BASE_URL=http://localhost:8080" > .env.local
```

## Development

```sh
npm run dev        # start dev server
npm run build      # type-check + build for production
npm run lint       # oxlint + eslint (both auto-fix)
npm run format     # prettier
npm run type-check # tsc only, no build
```

## IDE

[VS Code](https://code.visualstudio.com/) with the [Vue (Official)](https://marketplace.visualstudio.com/items?itemName=Vue.volar) extension. Disable Vetur if installed.

For better DevTools output, enable **Custom Object Formatters** in your browser's DevTools settings ([Chrome](http://bit.ly/object-formatters) / [Firefox](https://fxdx.dev/firefox-devtools-custom-object-formatters/)).
