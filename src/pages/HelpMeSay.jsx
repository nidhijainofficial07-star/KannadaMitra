import { useMemo, useState } from 'react'
import Icon from '../components/Icon'
import AudioButton from '../components/AudioButton'
import { helpSayPhrases } from '../data/phrases'
import './HelpMeSay.css'

const intents = ['Directions', 'Shopping', 'Transport', 'Greetings', 'Ask for help']

export default function HelpMeSay({ favourites, toggleFavourite }) {
  const [intent, setIntent] = useState('Directions')
  const [query, setQuery] = useState('')
  const phrases = useMemo(() => helpSayPhrases.filter((phrase) => {
    const searchText = `${phrase.kn} ${phrase.tr} ${phrase.en}`.toLowerCase()
    return phrase.intent === intent && searchText.includes(query.trim().toLowerCase())
  }), [intent, query])

  return (
    <main className="app-shell help-say-page">
      <div className="page-header"><div><p className="eyebrow">Quick phrase finder</p><h1>Help me say this</h1><p className="subtitle">Choose the moment you’re in, then tap a phrase to hear natural Kannada.</p></div><span className="chip"><Icon name="phrase" size={15} /> Everyday essentials</span></div>
      <section className="intent-picker card">
        <div className="intent-copy"><span className="icon-orb"><Icon name="target" /></span><div><strong>What do you need help with?</strong><small>Pick a situation to see the most useful phrases.</small></div></div>
        <div className="intent-tabs">{intents.map((item) => <button className={intent === item ? 'active' : ''} onClick={() => { setIntent(item); setQuery('') }} key={item}>{item}</button>)}</div>
      </section>
      <div className="phrase-search help-search"><Icon name="search" /><label className="sr-only" htmlFor="help-search">Search this situation</label><input id="help-search" value={query} onChange={(event) => setQuery(event.target.value)} placeholder={`Search ${intent.toLowerCase()} phrases...`} />{query && <button onClick={() => setQuery('')} aria-label="Clear search"><Icon name="close" /></button>}</div>
      <div className="help-results-head"><span>{phrases.length} useful phrase{phrases.length === 1 ? '' : 's'}</span><small>{intent}</small></div>
      <div className="help-phrase-grid">
        {phrases.map((phrase) => <article className="help-phrase-card card" key={phrase.id}><div className="help-card-actions"><AudioButton text={phrase.kn} /><button className={`icon-button ${favourites.includes(phrase.id) ? 'active' : ''}`} onClick={() => toggleFavourite(phrase.id)} aria-label={`${favourites.includes(phrase.id) ? 'Remove from' : 'Add to'} favourites`}><Icon name="heart" filled={favourites.includes(phrase.id)} /></button></div><span className="phrase-context">{phrase.intent}</span><p className="kannada">{phrase.kn}</p><strong>{phrase.tr}</strong><span>{phrase.en}</span></article>)}
      </div>
      {!phrases.length && <div className="empty-state card"><div className="icon-orb"><Icon name="search" /></div><h2>No matching phrase yet</h2><p className="subtitle">Try a shorter search, or choose another situation.</p><button className="btn btn-secondary" onClick={() => setQuery('')}>Clear search</button></div>}
    </main>
  )
}
