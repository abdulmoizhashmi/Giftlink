import GiftCard from './GiftCard';
export default function GiftGrid({ gifts, empty = 'No gifts found.' }) {
  if (!gifts.length) return <div className="empty">{empty}</div>;
  return <div className="gift-grid">{gifts.map(g => <GiftCard key={g._id} gift={g} />)}</div>;
}
