import { Link } from 'react-router-dom';

import { formatPrice, products } from '../catalog.js';
import { ProductArt, StepIcon } from '../components/art.jsx';

const steps = [
  {
    step: 1,
    title: 'Pick a filter',
    body: 'Jug, tap or undersink. The comparison on each page says what it removes.',
  },
  {
    step: 2,
    title: 'Fit it yourself',
    body: 'Everything but the Whole Home Guard fits by hand in a few minutes.',
  },
  {
    step: 3,
    title: 'Swap the cartridge',
    body: 'A label on the jug tells you the date. Refills arrive in card, not plastic.',
  },
];

export default function Home() {
  const featured = products.slice(0, 3);

  return (
    <>
      <section className="hero">
        <div className="hero__copy">
          <p className="hero__eyebrow">Filters made and tested in Sheffield</p>
          <h1 className="hero__title">Tap water worth drinking</h1>
          <p className="hero__lead">
            Acme Water makes four filters and one refill pack. No subscriptions you have to cancel,
            no app, and a cartridge that costs seven pounds instead of fifteen.
          </p>
          <div className="hero__actions">
            <Link className="button button--primary" to="/products">
              Shop the filters
            </Link>
            <Link className="button button--ghost" to="/products/ripple-pitcher">
              Start with the jug
            </Link>
          </div>
          <dl className="hero__stats">
            <div className="hero__stat">
              <dt>Chlorine removed</dt>
              <dd>97%</dd>
            </div>
            <div className="hero__stat">
              <dt>Cartridge life</dt>
              <dd>150 L</dd>
            </div>
            <div className="hero__stat">
              <dt>Free delivery over</dt>
              <dd>£40</dd>
            </div>
          </dl>
        </div>

        <div className="hero__art" aria-hidden="true">
          <svg viewBox="0 0 320 320" className="hero__glass">
            <defs>
              <linearGradient id="water" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#bae6fd" />
                <stop offset="100%" stopColor="#0284c7" />
              </linearGradient>
            </defs>
            <circle cx="160" cy="160" r="128" fill="#e0f2fe" />
            <circle cx="160" cy="160" r="96" fill="none" stroke="#bae6fd" strokeWidth="2" />
            <path
              d="M110 96h100l-10 118a24 24 0 0 1-24 22h-32a24 24 0 0 1-24-22Z"
              fill="url(#water)"
              opacity="0.9"
            />
            <path
              d="M114 140c14-10 28-10 42 0s28 10 42 0"
              fill="none"
              stroke="#ffffff"
              strokeWidth="4"
              strokeLinecap="round"
            />
            <path d="M160 40c14 18 24 30 24 42a24 24 0 0 1-48 0c0-12 10-24 24-42Z" fill="#0369a1" />
          </svg>
        </div>
      </section>

      <section className="page">
        <div className="section-head">
          <h2 className="section-head__title">Popular this month</h2>
          <Link className="section-head__link" to="/products">
            See all six
          </Link>
        </div>

        <ul className="tile-grid">
          {featured.map((product) => (
            <li key={product.id} className="tile">
              <Link className="tile__link" to={`/products/${product.id}`}>
                <span className={`tile__art tile__art--${product.art}`}>
                  <ProductArt kind={product.art} />
                </span>
                <span className="tile__name">{product.name}</span>
                <span className="tile__tagline">{product.tagline}</span>
                <span className="tile__price">{formatPrice(product.price)}</span>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <section className="page steps">
        <h2 className="section-head__title">How it works</h2>
        <ol className="step-list">
          {steps.map((item) => (
            <li key={item.step} className="step">
              <StepIcon step={item.step} />
              <h3 className="step__title">{item.title}</h3>
              <p className="step__body">{item.body}</p>
            </li>
          ))}
        </ol>
      </section>
    </>
  );
}
