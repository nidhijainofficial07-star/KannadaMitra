import { useState } from 'react'
import Icon from '../components/Icon'
import AudioButton from '../components/AudioButton'
import { getDailyChallenge } from '../data/challenges'
import './Challenge.css'

export default function Challenge({ completed, onComplete, navigate }) {
  const challenge = getDailyChallenge()
  const [selected, setSelected] = useState(null)
  const correct = selected === challenge.answer

  const choose = (index) => {
    if (completed || correct) return
    setSelected(index)
    if (index === challenge.answer) onComplete(challenge.id)
  }

  return (
    <main className="app-shell challenge-page">
      <div className="page-header"><div><p className="eyebrow">Real-life challenge</p><h1>Use Kannada in the moment</h1><p className="subtitle">One practical scenario each day. Choose what you would really say.</p></div><span className="chip"><Icon name="clock" size={15} /> Today · 2 min</span></div>
      <section className="challenge-card card">
        <div className="challenge-scene">
          <div className="scene-icon"><Icon name="target" size={38} /></div>
          <span>Today’s setting</span><h2>{challenge.setting}</h2><p>{challenge.prompt}</p>
        </div>
        <div className="challenge-choices">
          <p className="eyebrow">What would you say?</p>
          {challenge.options.map((option, index) => {
            const state = selected !== null ? index === challenge.answer ? 'correct' : index === selected ? 'wrong' : '' : ''
            return <button className={state} onClick={() => choose(index)} key={option} disabled={completed}><span className="kannada">{option}</span>{state === 'correct' && <Icon name="check" />}{state === 'wrong' && <Icon name="close" />}</button>
          })}
          {(correct || completed) && <div className="challenge-success"><div><Icon name="check" /></div><span><strong>Challenge complete!</strong><small>{challenge.transliteration} · {challenge.meaning}</small></span><AudioButton text={challenge.options[challenge.answer]} /></div>}
          {selected !== null && !correct && <div className="challenge-hint">That phrase belongs in another situation. Look for the words that match this setting and try again.</div>}
          <div className="challenge-footer"><span>{completed ? 'Today’s 20 XP already earned' : 'Complete it to earn 20 XP'}</span>{(correct || completed) && <button className="btn btn-primary" onClick={() => navigate('dashboard')}>Back to dashboard <Icon name="arrow" /></button>}</div>
        </div>
      </section>
    </main>
  )
}
