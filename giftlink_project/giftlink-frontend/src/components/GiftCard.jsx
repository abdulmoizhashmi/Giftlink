import { Link } from 'react-router-dom';

export default function GiftCard({ gift }) {
  return <article className="gift-card">
    <img src={gift.image} alt={gift.title} loading="lazy" />
    <div className="gift-card-body">
      <h3>{gift.title}</h3>
      <span className={`condition condition-${gift.condition.replace(/\s/g,'').toLowerCase()}`}>{gift.condition}</span>
      <p className="date">{new Date(gift.dateAdded).toLocaleDateString(undefined, { day: 'numeric', month: 'long', year: 'numeric' })}</p>
      <Link className="details-btn" to={`/gifts/${gift._id}`}>View Details</Link>
    </div>
  </article>;
}
