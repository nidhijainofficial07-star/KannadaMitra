import { useEffect, useState } from 'react'
import Icon from '../components/Icon'
import './Personalise.css'

const levels = [
  ['beginner', 'ಹೊಸಬರು', 'I’m completely new'],
  ['some', 'ಸ್ವಲ್ಪ ಗೊತ್ತು', 'I know a few words'],
  ['returning', 'ಮತ್ತೆ ಕಲಿಯುವವರು', 'I’m returning to Kannada'],
]

const goals = [
  ['college', 'learn', 'College & work', 'Connect on campus or at work'],
  ['travel', 'target', 'Travel & transport', 'Navigate Karnataka confidently'],
  ['shopping', 'star', 'Shopping', 'Browse markets and buy with ease'],
  ['food', 'chat', 'Food & cafés', 'Order your favourites confidently'],
]

const durations = [5, 10, 15]

export default function Personalise({ profile, onSave, onSkip, onReset, editing = false }) {
  const [form, setForm] = useState(profile)
  const [confirmingReset, setConfirmingReset] = useState(false)
  const update = (key, value) => setForm((current) => ({ ...current, [key]: value }))

  useEffect(() => {
    if (!confirmingReset) return undefined
    const closeOnEscape = (event) => {
      if (event.key === 'Escape') setConfirmingReset(false)
    }
    window.addEventListener('keydown', closeOnEscape)
    return () => window.removeEventListener('keydown', closeOnEscape)
  }, [confirmingReset])

  return (
    <main className={`personalise-page ${editing ? 'editing' : ''}`}>
      {!editing && <div className="personalise-top">
        <div className="brand welcome-brand"><span className="brand-mark kannada">ಕ</span><span><strong>KannadaMitra</strong><small>Your Friendly Guide to Kannada</small></span></div>
        <button className="skip-button" onClick={onSkip}>Skip for now</button>
      </div>}
      <section className="personalise-card card">
        <div className="personalise-intro">
          <span className="step-pill">{editing ? 'Your preferences' : 'One quick step'}</span>
          <h1>{editing ? 'Make KannadaMitra yours' : 'Let’s learn your way'}</h1>
          <p>Tell us a little about you so your learning path feels useful from day one.</p>
        </div>
        <div className="form-section">
          <label htmlFor="nickname">What should we call you?</label>
          <input id="nickname" maxLength="24" value={form.nickname} onChange={(event) => update('nickname', event.target.value)} placeholder="Your nickname (optional)" />
        </div>
        <fieldset className="form-section">
          <legend>How much Kannada do you know?</legend>
          <div className="level-options">
            {levels.map(([id, kn, label]) => <button type="button" className={form.level === id ? 'selected' : ''} onClick={() => update('level', id)} key={id}><span className="kannada">{kn}</span><small>{label}</small><i><Icon name="check" size={15} /></i></button>)}
          </div>
        </fieldset>
        <fieldset className="form-section">
          <legend>What’s your main goal?</legend>
          <div className="goal-options">
            {goals.map(([id, icon, title, text]) => <button type="button" className={form.goal === id ? 'selected' : ''} onClick={() => update('goal', id)} key={id}><span><Icon name={icon} /></span><div><strong>{title}</strong><small>{text}</small></div><i><Icon name="check" size={15} /></i></button>)}
          </div>
        </fieldset>
        <fieldset className="form-section duration-section">
          <legend>Daily learning time</legend>
          <p>Choose a pace that feels easy to maintain.</p>
          <div>{durations.map((minutes) => <button type="button" className={form.duration === minutes ? 'selected' : ''} onClick={() => update('duration', minutes)} key={minutes}>{minutes}<small>min</small></button>)}</div>
        </fieldset>
        <div className="personalise-actions">
          {editing && <button className="btn btn-ghost" onClick={onSkip}>Cancel</button>}
          <button className="btn btn-primary" onClick={() => onSave(form)}>{editing ? 'Save preferences' : 'Create my learning path'} <Icon name="arrow" /></button>
        </div>
        {editing && <div className="reset-section">
          <div><strong>Reset your learning journey</strong><p>Erase your lessons, XP, streak, quiz scores, favourites, and preferences from this device.</p></div>
          <button className="btn btn-danger-ghost" onClick={() => setConfirmingReset(true)}>Reset progress</button>
        </div>}
      </section>
      {confirmingReset && <div className="dialog-backdrop" onMouseDown={(event) => {
        if (event.target === event.currentTarget) setConfirmingReset(false)
      }}>
        <section className="reset-dialog card" role="dialog" aria-modal="true" aria-labelledby="reset-dialog-title" aria-describedby="reset-dialog-description">
          <div className="reset-dialog-icon"><Icon name="quiz" /></div>
          <h2 id="reset-dialog-title">Reset all progress?</h2>
          <p id="reset-dialog-description">This permanently clears your learning history on this device. You’ll return to the welcome screen and start again.</p>
          <div>
            <button className="btn btn-ghost" onClick={() => setConfirmingReset(false)}>Keep my progress</button>
            <button className="btn btn-danger" onClick={onReset}>Yes, reset everything</button>
          </div>
        </section>
      </div>}
    </main>
  )
}
