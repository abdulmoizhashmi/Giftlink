import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { addComment, deleteGift, getGift } from '../services/api';
import { useAuth } from '../context/AuthContext';
import Loading from '../components/Loading';

export default function GiftDetails() {
  const { id } = useParams(); const navigate = useNavigate(); const { user } = useAuth();
  const [gift, setGift] = useState(null); const [loading, setLoading] = useState(true); const [error, setError] = useState(''); const [comment, setComment] = useState('');
  useEffect(() => { getGift(id).then(setGift).catch(e=>setError(e.message)).finally(()=>setLoading(false)); }, [id]);
  if (loading) return <main className="page"><Loading/></main>;
  if (error) return <main className="page"><div className="error">{error}</div></main>;
  const own = user && gift.owner?._id === user.id;
  const submit = async e => { e.preventDefault(); if (!comment.trim()) return; const updated = await addComment(id, comment); setGift(updated); setComment(''); };
  const remove = async () => { if (confirm('Delete this gift?')) { await deleteGift(id); navigate('/gifts'); } };
  return <main className="page details-page"><Link className="back-btn" to="/gifts">Back</Link><section className="detail-card"><h1>{gift.title}</h1><div className="detail-image-wrap"><img src={gift.image} alt={gift.title}/></div><div className="detail-info"><div><b>Category:</b> {gift.category}</div><div><b>Condition:</b> {gift.condition}</div><div><b>Date Added:</b> {new Date(gift.dateAdded).toLocaleDateString()}</div><div><b>Location:</b> {gift.location}</div><p>{gift.description}</p><p className="muted">Shared by {gift.owner?.name || 'GiftLink member'}</p>{own && <div className="action-row"><Link className="outline-btn" to={`/gifts/${id}/edit`}>Edit</Link><button className="danger-btn" onClick={remove}>Delete</button></div>}</div></section>
  <section className="comments"><h2>Community comments</h2>{gift.comments?.length ? gift.comments.map(c=><div className="comment" key={c._id}><div><strong>{c.user?.name || 'Member'}</strong><span className={`sentiment ${c.sentiment}`}>{c.sentiment}</span></div><p>{c.text}</p></div>) : <p className="muted">Be the first to leave a kind comment.</p>}{user ? <form onSubmit={submit} className="comment-form"><textarea value={comment} onChange={e=>setComment(e.target.value)} placeholder="Write a comment..." maxLength="500"/><button className="primary-btn">Post comment</button></form> : <p className="muted"><Link to="/login">Log in</Link> to comment.</p>}</section></main>;
}
