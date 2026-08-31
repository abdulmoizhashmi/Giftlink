import { useEffect, useState } from 'react';
import GiftGrid from '../components/GiftGrid';
import Loading from '../components/Loading';
import { getGifts } from '../services/api';

export default function Gifts() {
  const [gifts, setGifts] = useState([]); const [loading, setLoading] = useState(true); const [error, setError] = useState('');
  useEffect(() => { getGifts().then(setGifts).catch(e => setError(e.message)).finally(() => setLoading(false)); }, []);
  return <main className="page"><section className="page-heading"><div><span className="eyebrow">COMMUNITY LISTINGS</span><h1>Gifts</h1><p>Find something useful and give it a new home.</p></div><a className="outline-btn" href="/search">Search listings</a></section>
    {loading ? <Loading /> : error ? <div className="error">{error}<br/><small>Start MongoDB and the backend, then refresh.</small></div> : <GiftGrid gifts={gifts} />}
  </main>;
}
