import { useEffect, useState } from 'react';
import GiftGrid from '../components/GiftGrid';
import Loading from '../components/Loading';
import { searchGifts } from '../services/api';

const categories = ['All','Living','Kitchen','Furniture','Bedroom','Electronics','Books'];
const conditions = ['All','New','Like New','Good','Older'];

export default function Search() {
  const [filters, setFilters] = useState({ q:'', category:'Living', condition:'All', maxAge:'6' });
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const run = async (e) => {
    e?.preventDefault();
    setLoading(true);
    setError('');
    try {
      const data = await searchGifts(filters);
      setResults(data.results);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { run(); }, []);

  const change = e => setFilters(f => ({...f, [e.target.name]: e.target.value}));

  return (
    <main className="page search-page">
      <form onSubmit={run}>
        <div className="search-panel">
          <p style={{ margin: '0 0 10px', fontSize: '16px' }}>Filters</p>
          <label>Category
            <select name="category" value={filters.category} onChange={change}>
              {categories.map(x=><option key={x}>{x}</option>)}
            </select>
          </label>
          <label>Condition
            <select name="condition" value={filters.condition} onChange={change}>
              {conditions.map(x=><option key={x}>{x}</option>)}
            </select>
          </label>
          <label>Maximum age <span>{filters.maxAge === 'all' ? 'Any age' : `Less than ${filters.maxAge} years`}</span>
            <input name="maxAge" type="range" min="1" max="10" value={filters.maxAge === 'all' ? 10 : filters.maxAge} onChange={change}/>
          </label>
        </div>
        <input 
          name="q" 
          value={filters.q} 
          onChange={change} 
          placeholder="Search for items..." 
          style={{ width: '100%', padding: '10px', marginBottom: '10px', border: '1px solid #ddd', borderRadius: '4px', background: '#fff', font: 'inherit' }}
        />
        <button className="search-btn" style={{ width: '100%', padding: '10px', marginBottom: '20px' }}>Search</button>
      </form>
      
      {loading ? <Loading/> : error ? <div className="error">{error}</div> : (
        <div className="search-results">
          {results.length ? (
            <GiftGrid gifts={results} />
          ) : (
            <div className="empty">No items match these filters.</div>
          )}
        </div>
      )}
    </main>
  );
}
