import { Link } from "react-router";
import Navbar from "../components/Navbar";
import styles from "./homepage.module.css";

const trustLogos = ["UB", "BU", "NYU", "UIUC", "NU"];

const featureCards = [
  {
    title: "Get access to standout mentors",
    description:
      "Choose from experienced coaches across careers, startups, product, design, and more.",
  },
  {
    title: "Personalized advice for you",
    description:
      "Book focused one-on-one sessions and get guidance tailored to your goals and next step.",
  },
  {
    title: "Save time and avoid guesswork",
    description:
      "Skip endless searching and get straight to the people who can help you move forward.",
  },
];

export default function Homepage() {
  return (
    <main className={styles.page}>
      <section className={styles.hero}>
        <div className={styles.heroOverlay} />
        <div className={styles.heroInner}>
          <Navbar theme="light" />

          <div className={styles.heroContent}>
            <p className={styles.eyebrow}>career conversations that actually help</p>
            <h1 className={styles.headline}>
              Meet over coffee, ask sharper questions, and get advice from
              experts who have been there before.
            </h1>
            <p className={styles.subheadline}>
              Book a session with the right mentor and turn uncertainty into a
              plan you can act on.
            </p>

            <div className={styles.heroActions}>
              <Link className={styles.primaryCta} to="/find-coach">
                Find an expert
              </Link>
              <Link className={styles.secondaryCta} to="/dashboard">
                Go to dashboard
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className={styles.trustBand} aria-label="Featured in">
        {trustLogos.map((logo) => (
          <span key={logo} className={styles.trustLogo}>
            {logo}
          </span>
        ))}
      </section>

      <section className={styles.features}>
        <div className={styles.featuresGrid}>
          {featureCards.map((feature) => (
            <article key={feature.title} className={styles.featureCard}>
              <h2 className={styles.featureTitle}>{feature.title}</h2>
              <p className={styles.featureDescription}>{feature.description}</p>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
