import { Link } from 'react-router';
import { mockExperts } from '../mockExperts';
import { useAuth } from '../features/auth/components/useAuth';
import styles from './dashboard.module.css';

type SessionStatus = 'Confirmed' | 'Pending';

type SessionPreview = {
  id: string;
  expertName: string;
  topic: string;
  date: string;
  status: SessionStatus;
};

type GoalItem = {
  id: string;
  label: string;
  isComplete: boolean;
};

const upcomingSessions: SessionPreview[] = [
  {
    id: 'session-1',
    expertName: 'Oprah Winfrey',
    topic: 'Clarify career direction',
    date: 'May 14, 2:00 PM',
    status: 'Confirmed',
  },
  {
    id: 'session-2',
    expertName: 'Mark Zuckerberg',
    topic: 'Prepare startup questions',
    date: 'May 18, 11:30 AM',
    status: 'Pending',
  },
];

const goals: GoalItem[] = [
  { id: 'goal-1', label: 'Pick three mentors to compare', isComplete: true },
  { id: 'goal-2', label: 'Write questions for the next session', isComplete: false },
  { id: 'goal-3', label: 'Book one focused coaching call', isComplete: false },
];

const recommendedExperts = mockExperts
  .filter((expert) => expert.availability !== 'unavailable')
  .slice(0, 3);

const savedExperts = mockExperts.slice(3, 6);

export default function Dashboard() {
  const { user } = useAuth();
  const firstName = user?.email.split('@')[0] ?? 'there';

  return (
    <main className={styles.page}>
      <section className={styles.hero}>
        <div>
          <p className={styles.eyebrow}>User dashboard</p>
          <h1 className={styles.title}>Welcome back, {firstName}</h1>
          <p className={styles.subtitle}>
            Keep track of your coaching sessions, saved experts, and next steps
            from one simple workspace.
          </p>
        </div>

        <div className={styles.heroActions}>
          <Link className={styles.primaryAction} to="/find-coach">
            Find a coach
          </Link>
          <Link className={styles.secondaryAction} to="/">
            Home
          </Link>
        </div>
      </section>

      <section className={styles.summaryGrid} aria-label="Dashboard summary">
        <div className={styles.metric}>
          <span className={styles.metricValue}>{upcomingSessions.length}</span>
          <span className={styles.metricLabel}>Upcoming sessions</span>
        </div>
        <div className={styles.metric}>
          <span className={styles.metricValue}>{savedExperts.length}</span>
          <span className={styles.metricLabel}>Saved experts</span>
        </div>
        <div className={styles.metric}>
          <span className={styles.metricValue}>
            {goals.filter((goal) => goal.isComplete).length}/{goals.length}
          </span>
          <span className={styles.metricLabel}>Goals completed</span>
        </div>
      </section>

      <div className={styles.contentGrid}>
        <section className={styles.section}>
          <div className={styles.sectionHeader}>
            <div>
              <p className={styles.sectionKicker}>Schedule</p>
              <h2 className={styles.sectionTitle}>Upcoming sessions</h2>
            </div>
            <Link className={styles.textLink} to="/find-coach">
              Book another
            </Link>
          </div>

          <div className={styles.sessionList}>
            {upcomingSessions.map((session) => (
              <article key={session.id} className={styles.sessionItem}>
                <div>
                  <h3 className={styles.itemTitle}>{session.expertName}</h3>
                  <p className={styles.itemMeta}>{session.topic}</p>
                </div>
                <div className={styles.sessionMeta}>
                  <span className={styles.sessionDate}>{session.date}</span>
                  <span
                    className={styles.statusBadge}
                    data-status={session.status.toLowerCase()}
                  >
                    {session.status}
                  </span>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className={styles.section}>
          <div className={styles.sectionHeader}>
            <div>
              <p className={styles.sectionKicker}>Focus</p>
              <h2 className={styles.sectionTitle}>Next steps</h2>
            </div>
          </div>

          <div className={styles.goalList}>
            {goals.map((goal) => (
              <div key={goal.id} className={styles.goalItem}>
                <span
                  className={styles.goalCheck}
                  data-complete={goal.isComplete}
                  aria-hidden="true"
                />
                <span>{goal.label}</span>
              </div>
            ))}
          </div>
        </section>
      </div>

      <section className={styles.section}>
        <div className={styles.sectionHeader}>
          <div>
            <p className={styles.sectionKicker}>Explore</p>
            <h2 className={styles.sectionTitle}>Recommended experts</h2>
          </div>
          <Link className={styles.textLink} to="/find-coach">
            View all
          </Link>
        </div>

        <div className={styles.expertGrid}>
          {recommendedExperts.map((expert) => (
            <Link
              key={expert.id}
              className={styles.expertCard}
              to="/find-coach"
            >
              <img
                className={styles.expertAvatar}
                src={expert.avatarUrl}
                alt={`${expert.name} profile`}
              />
              <div>
                <h3 className={styles.itemTitle}>{expert.name}</h3>
                <p className={styles.itemMeta}>
                  {expert.expertise.slice(0, 2).join(' / ') || 'General coaching'}
                </p>
              </div>
              <span className={styles.rating}>{expert.rating.toFixed(1)}</span>
            </Link>
          ))}
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.sectionHeader}>
          <div>
            <p className={styles.sectionKicker}>Saved</p>
            <h2 className={styles.sectionTitle}>Experts to revisit</h2>
          </div>
        </div>

        <div className={styles.savedList}>
          {savedExperts.map((expert) => (
            <Link
              key={expert.id}
              className={styles.savedItem}
              to="/find-coach"
            >
              <span>{expert.name}</span>
              <span className={styles.savedTopic}>
                {expert.expertise[0] ?? 'Coaching'}
              </span>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
