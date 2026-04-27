import { ExpertCard } from '../components/expert-card/ExpertCard';
import { mockExperts } from '../mockExperts';

export default function ExpertsMarketplace() {
  return (
    <div style={{ padding: '32px' }}>
      <h1 style={{ marginBottom: '24px' }}>Expert Cards — UI Test</h1>
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
        gap: '20px',
      }}>
        {mockExperts.map((expert) => (
          <ExpertCard key={expert.id} expert={expert} />
        ))}
      </div>
    </div>
  );
}
