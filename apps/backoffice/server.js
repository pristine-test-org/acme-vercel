import { createRequire } from 'node:module';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

import express from 'express';

import { filterOrders, findOrder, statuses } from './src/orders.js';
import { notFoundPage, orderDetailPage, ordersPage, signInPage } from './src/views.js';

const require = createRequire(import.meta.url);
const here = path.dirname(fileURLToPath(import.meta.url));

// The shared tokens live in packages/ui and are resolved through the workspace
// link, so the order desk and the storefront read the same file.
const tokensCss = require.resolve('@acme/ui/tokens.css');

const app = express();
app.disable('x-powered-by');
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(here, 'public')));

app.get('/tokens.css', (_req, res) => {
  res.sendFile(tokensCss);
});

app.get('/', (_req, res) => {
  res.redirect('/sign-in');
});

app.get('/sign-in', (_req, res) => {
  res.type('html').send(signInPage());
});

// There is no account system. The form takes anything and lets you through,
// which is the point: the demo needs a form, not a login.
app.post('/sign-in', (_req, res) => {
  res.redirect('/orders');
});

app.get('/orders', (req, res) => {
  const requested = typeof req.query.status === 'string' ? req.query.status : 'All';
  const status = statuses.includes(requested) ? requested : 'All';
  const query = typeof req.query.q === 'string' ? req.query.q : '';

  res.type('html').send(ordersPage({ shown: filterOrders({ status, query }), status, query }));
});

app.get('/orders/:orderId', (req, res) => {
  const order = findOrder(req.params.orderId);
  if (!order) {
    res.status(404).type('html').send(notFoundPage(req.path));
    return;
  }
  res.type('html').send(orderDetailPage(order));
});

app.use((req, res) => {
  res.status(404).type('html').send(notFoundPage(req.path));
});

// On Vercel the default export is the function; locally it listens on a port.
if (!process.env.VERCEL) {
  const port = process.env.PORT || 3001;

  app.listen(port, () => {
    console.log(`Acme Water order desk on http://localhost:${port}`);
  });
}

export default app;
