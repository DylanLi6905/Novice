// web/src/components/expert-card/ExpertCard.tsx

import { Link } from 'react-router';
import type { Expert, ExpertAvailability } from '../../types/expert';
import styles from './ExpertCard.module.css';

interface ExpertCardProps {
  expert: Expert;
}

//builds the url for expert profile page, using slug if available for better SEO and readability
//otherwise falls back to using the unique ID
function buildProfileHref(expert: Expert): string {
  return expert.slug ? `/experts/${expert.slug}` : `/experts/${expert.id}`;
}

function getHeadline(expert: Expert): string {
  if (expert.headline?.trim()) return expert.headline.trim();
  if (expert.title && expert.company) return `${expert.title} at ${expert.company}`;
  if (expert.title) return expert.title;
  if (expert.company) return `Works at ${expert.company}`;
  return 'Expert mentor';
}

function getAvailability(expert: Expert): {
  status: ExpertAvailability;
  label: string;
} {
  const status = expert.availability ?? 'unavailable';

  if (expert.availabilityLabel?.trim()) {
    return { status, label: expert.availabilityLabel.trim() };
  }

  if (status === 'available') return { status, label: 'Available now' };
  if (status === 'limited') return { status, label: 'Limited availability' };
  return { status, label: 'Unavailable' };
}

function AvailabilityBadge({
  availability,
}: {
  availability: ReturnType<typeof getAvailability>;
}) {
  return (
    <span
      className={styles.availabilityBadge}
      data-status={availability.status}
    >
      <span className={styles.availabilityDot} />
      {availability.label}
    </span>
  );
}

export function ExpertCard({ expert }: ExpertCardProps) {
  const profileHref = buildProfileHref(expert);
  const headline = getHeadline(expert);
  const availability = getAvailability(expert);

  return (
    <Link
      to={profileHref}
      className={styles.card}
      aria-label={`View ${expert.name}'s profile`}
    >
      <div className={styles.topRow}>
        <img
          className={styles.avatar}
          src={expert.avatarUrl}
          alt={`${expert.name} profile photo`}
        />

        <AvailabilityBadge availability={availability} />
      </div>

      <div className={styles.content}>
        <h3 className={styles.name}>{expert.name}</h3>
        <p className={styles.headline}>{headline}</p>

        <div
          className={styles.ratingRow}
          aria-label={`${expert.rating.toFixed(1)} out of 5 stars from ${expert.reviewCount} reviews`}
        >
          <span className={styles.ratingStar} aria-hidden="true">
            ★
          </span>
          <span className={styles.ratingValue}>{expert.rating.toFixed(1)}</span>
          <span className={styles.reviewCount}>({expert.reviewCount})</span>
        </div>
      </div>

      <div className={styles.footer}>
        <span className={styles.viewProfile}>View profile</span>
        <span className={styles.arrow} aria-hidden="true">
          →
        </span>
      </div>
    </Link>
  );
}
