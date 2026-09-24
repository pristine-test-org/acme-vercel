# Acme Workspace Demo

Test material. This repository exists so that tooling which has to onboard a
repository with **more than one app in it** has something realistic to be
pointed at: three apps of three different shapes, one shared package, and a
history with merged and open pull requests.

Acme Water is a made up shop that sells made up water filters. Every name,
price, order and address in here is invented. There is no back end, no
database, no analytics, and nothing in any page loads from the internet.

## What is in it

| App | Folder | Shape | Documented |
| --- | --- | --- | --- |
| Storefront | `apps/storefront` | Vite single-page app, React, client-side routing, four routes | `apps/storefront/DESIGN.md` |
| Order desk | `apps/backoffice` | Express server rendering HTML template strings, three pages | no |
| Handbook | `apps/docs` | Hand written HTML and CSS, no build step | no |

Plus `packages/ui`, a single CSS file of design tokens. The storefront and the
order desk both read it, so changing one value there should show up in two
apps.

```
.
├── apps
│   ├── backoffice      Express order desk (sign in, orders, one order)
│   ├── docs            static handbook pages
│   └── storefront      Vite shop (home, filters, filter, basket)
├── packages
│   └── ui              shared CSS tokens
├── package.json        npm workspaces root
└── README.md
```

## Requirements

Node 22 or newer, which is what `.nvmrc` and the root `engines` field pin. npm
comes with it; nothing else is needed.

```sh
nvm use      # reads .nvmrc
npm ci       # installs every workspace from the lockfile
```

## Running the apps

**Storefront** (Vite, port 5173 in dev):

```sh
npm run dev -w storefront          # development server
npm run build -w storefront        # production build into apps/storefront/dist
npm run preview -w storefront      # serve the built dist
```

The build is a single-page app, so whatever serves `dist/` has to fall back to
`index.html` for unknown paths. `npm run preview -w storefront` already does.

**Order desk** (Express, port 3001 unless `PORT` says otherwise):

```sh
npm start -w backoffice            # then open http://localhost:3001
PORT=4000 npm start -w backoffice  # or somewhere else
```

The sign-in form accepts any email and any password, because there is no
account system behind it.

**Handbook** (no build step):

```sh
open apps/docs/index.html          # or serve the folder with any static server
```

## Deploying

Each app is its own Vercel project, connected to this repository, so every
pull request gets a Vercel preview per project and `main` deploys production.

| Vercel project | Root Directory | Production |
| --- | --- | --- |
| `acme-storefront` | `apps/storefront` | https://acme-storefront-phi.vercel.app |
| `acme-backoffice` | `apps/backoffice` | https://acme-backoffice.vercel.app |
| `acme-docs` | `apps/docs` | https://acme-docs-self.vercel.app |

The storefront and order desk read `packages/ui` from outside their Root
Directory, which Vercel includes by default. `apps/storefront/vercel.json`
sends every path to `index.html`; the order desk runs as Vercel's Express
function from the app that `server.js` exports.

## What is deliberately missing

- **No CI.** There is no `.github/` directory and no workflow file. Adding one
  is part of what gets tested against this repository, so it starts empty.
- **No tests.** The apps are small on purpose and there is nothing to assert.
- **No environment files.** No `.env`, no secrets, nothing to configure.

## Licence

MIT. See `LICENSE`.
