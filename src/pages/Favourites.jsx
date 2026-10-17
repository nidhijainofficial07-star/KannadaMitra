import Icon from '../components/Icon'
import AudioButton from '../components/AudioButton'
import { cultureTips, helpSayPhrases, survivalPhrases } from '../data/phrases'
import './Favourites.css'

export default function Favourites({ favourites, toggleFavourite, navigate }) {
  const saved = [...survivalPhrases, ...helpSayPhrases].filter((phrase) => favourites.includes(phrase.id))
  return (
    <main className="app-shell favourites-page">
      <div className="page-header"><div><p className="eyebrow">Your personal collection</p><h1>Favourites</h1><p className="subtitle">Keep your most useful phrases close for quick practice.</p></div><span className="chip"><Icon name="heart" size={15} /> {saved.length} saved</span></div>
      {saved.length ? <div className="favourite-grid">{saved.map((phrase) => <article className="favourite-card card" key={phrase.id}><div className="favourite-top"><span className="chip">{phrase.category || phrase.intent}</span><button className="icon-button active" onClick={() => toggleFavourite(phrase.id)} aria-label="Remove from favourites"><Icon name="heart" filled /></button></div><p className="kannada">{phrase.kn}</p><strong>{phrase.tr}</strong><span>{phrase.en}</span><div className="favourite-bottom"><AudioButton text={phrase.kn} label="Practise pronunciation" /><small>Tap to listen</small></div></article>)}</div> : <div className="empty-state card"><div className="icon-orb"><Icon name="heart" /></div><h2>Save phrases you love</h2><p className="subtitle">Tap the heart beside any phrase to keep it close for quick practice.</p><button className="btn btn-primary" onClick={() => navigate('help-say')}>Find a phrase <Icon name="arrow" /></button></div>}
      <div className="section-title"><div><p className="eyebrow">Beyond the words</p><h2>Little cultural cues</h2></div></div>
      <div className="tips-grid">{cultureTips.map((tip, index) => <article className="tip-card card" key={tip.title}><span>0{index + 1}</span><h3>{tip.title}</h3><p>{tip.text}</p></article>)}</div>
    </main>
  )
}
