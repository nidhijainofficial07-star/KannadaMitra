import Icon from '../components/Icon'
import './Welcome.css'

export default function Welcome({ onStart }) {
  return (
    <main className="welcome">
      <div className="welcome-nav">
        <div className="brand welcome-brand">
          <span className="brand-mark kannada">ಕ</span>
          <span><strong>KannadaMitra</strong><small>Your Friendly Guide to Kannada</small></span>
        </div>
        <span className="welcome-pill">Made for beginners</span>
      </div>
      <section className="welcome-hero">
        <div className="welcome-copy">
          <p className="eyebrow">Speak with confidence</p>
          <h1>Kannada feels easier with a <em>friendly guide.</em></h1>
          <p className="welcome-lead">Learn everyday phrases, practise real conversations, and celebrate every small win—one useful word at a time.</p>
          <button className="btn btn-primary welcome-cta" onClick={onStart}>Let&apos;s Begin <Icon name="arrow" /></button>
          <div className="welcome-proof">
            <span><Icon name="check" /> Practical lessons</span>
            <span><Icon name="check" /> Hear every phrase</span>
            <span><Icon name="check" /> Learn at your pace</span>
          </div>
        </div>
        <div className="welcome-visual" aria-label="Kannada greeting example">
          <div className="decor-dot dot-one"></div><div className="decor-dot dot-two"></div>
          <div className="speech-card card">
            <span className="speech-avatar kannada">ಕ</span>
            <span className="chip">Your first phrase</span>
            <p className="kannada welcome-kannada">ನಮಸ್ಕಾರ!</p>
            <p className="transliteration">Namaskaara!</p>
            <div className="meaning-row"><span>Hello / Greetings</span><span className="sound-wave">)))</span></div>
          </div>
          <div className="mini-card card mini-streak"><Icon name="flame" /><span><strong>1 day</strong><small>Streak started</small></span></div>
          <div className="mini-card card mini-xp"><Icon name="star" /><span><strong>+10 XP</strong><small>Phrase learned</small></span></div>
        </div>
      </section>
    </main>
  )
}
