import { Link } from 'react-router-dom';
export default function Home() {
  return <main className="home-page">
    <section className="hero">
      <div className="hero-overlay" />
      <div className="hero-content">
        <div className="hero-logo">GiftLink</div>
        <h1>Share Gifts and Joy!</h1>
        <p>“Sharing is the essence of community. It is through giving that we enrich and perpetuate both our lives and the lives of others.”</p>
        <Link to="/gifts" className="primary-btn hero-btn">Get Started</Link>
      </div>
    </section>
    <section className="home-intro"><div><span className="eyebrow">GIVE • REUSE • CONNECT</span><h2>Give useful things a second life.</h2><p>GiftLink makes it easy to pass household items to people who need them. Browse free listings, search by your taste, and share what you no longer use.</p><Link to="/register" className="text-btn">Join GiftLink →</Link></div><div className="intro-cards"><div><strong>01</strong><span>Share</span></div><div><strong>02</strong><span>Discover</span></div><div><strong>03</strong><span>Reuse</span></div></div></section>
  </main>;
}
