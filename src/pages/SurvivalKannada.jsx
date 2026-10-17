import { useState } from 'react'
import Icon from '../components/Icon'
import AudioButton from '../components/AudioButton'
import { survivalPhrases } from '../data/phrases'
import './SurvivalKannada.css'

export default function SurvivalKannada({ favourites, toggleFavourite }) {
  const [query, setQuery] = useState('')
  const [category, setCategory] = useState('All')
  const categories = ['All', ...new Set(survivalPhrases.map((item) => item.category))]
  const filtered = survivalPhrases.filter((phrase) => {
    const matchesSearch = `${phrase.kn} ${phrase.tr} ${phrase.en}`.toLowerCase().includes(query.toLowerCase())
    return matchesSearch && (category === 'All' || phrase.category === category)
  })
  return (
    <main className="app-shell survival-page">
      <div className="page-header"><div><p className="eyebrow">Help, right when you need it</p><h1>Survival Kannada</h1><p className="subtitle">Essential phrases for everyday moments. Tap the speaker to hear them.</p></div></div>
      <div className="phrase-search"><Icon name="search" /><label className="sr-only" htmlFor="phrase-search">Search phrases</label><input id="phrase-search" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search in English, Kannada, or transliteration..." />{query && <button onClick={() => setQuery('')} aria-label="Clear search"><Icon name="close" /></button>}</div>
      <div className="category-tabs">{categories.map((item) => <button className={category === item ? 'active' : ''} onClick={() => setCategory(item)} key={item}>{item}</button>)}</div>
      <div className="survival-list">
        {filtered.map((phrase) => <article className="survival-card card" key={phrase.id}><span className="category-label">{phrase.category}</span><div><p className="kannada">{phrase.kn}</p><strong>{phrase.tr}</strong><span>{phrase.en}</span></div><div className="phrase-actions"><AudioButton text={phrase.kn} /><button className={`icon-button ${favourites.includes(phrase.id) ? 'active' : ''}`} onClick={() => toggleFavourite(phrase.id)} aria-label={`${favourites.includes(phrase.id) ? 'Remove from' : 'Add to'} favourites`}><Icon name="heart" filled={favourites.includes(phrase.id)} /></button></div></article>)}
      </div>
      {!filtered.length && <div className="empty-state card"><div className="icon-orb"><Icon name="search" /></div><h2>No phrases found</h2><p className="subtitle">Try a different word or browse all categories.</p><button className="btn btn-secondary" onClick={() => { setQuery(''); setCategory('All') }}>Show all phrases</button></div>}
    </main>
  )
}
