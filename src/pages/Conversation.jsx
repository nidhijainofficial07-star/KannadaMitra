import { useState } from 'react'
import Icon from '../components/Icon'
import AudioButton from '../components/AudioButton'
import { conversationScenarios } from '../data/conversations'
import './Conversation.css'

export default function Conversation({ onComplete, navigate, completedScenarios, initialCategory = 'food' }) {
  const [scenarioId, setScenarioId] = useState(conversationScenarios[initialCategory] ? initialCategory : 'food')
  const [stepId, setStepId] = useState('start')
  const [turns, setTurns] = useState([])
  const [practisedPhrases, setPractisedPhrases] = useState([])
  const [feedback, setFeedback] = useState('')
  const [earned, setEarned] = useState(false)
  const [retryTarget, setRetryTarget] = useState('start')
  const scenario = conversationScenarios[scenarioId]
  const step = scenario.steps[stepId]

  const reset = (nextScenario = scenarioId) => {
    setScenarioId(nextScenario)
    setStepId('start')
    setTurns([])
    setPractisedPhrases([])
    setFeedback('')
    setEarned(false)
  }
  
const choose = (choice) => {
  if (choice.next === 'retryTarget') {
    setTurns([
  ...turns,
  {
    you: choice.label,
    correct: choice.correct,
    sub: choice.sub,
  },
])
    setFeedback('')
    setStepId(retryTarget)
    return
  }

  if (choice.correct && choice.next !== 'retryTarget') {
  setPractisedPhrases((previous) => [
    ...previous,
    { you: choice.label },
  ])
}

  if (choice.next === 'retry') {
    setRetryTarget(stepId)
  }

  if (choice.next === 'done') {
    const firstCompletion = !completedScenarios.includes(scenarioId)
    onComplete(scenarioId)
    setEarned(firstCompletion)
    setTurns([
  ...turns,
  {
    you: choice.label,
    correct: choice.correct,
    sub: choice.sub,
  },
])
    setStepId('done')
    return
  }

  setFeedback(
    choice.correct
      ? 'Great choice — that fits the situation.'
      : 'That phrase belongs in a different situation. Let’s recover together.'
  )

 
{turns
  .filter((turn) => turn.correct === true && turn.sub && turn.you !== 'ಮತ್ತೆ ಪ್ರಯತ್ನಿಸಿ')
  .map((turn, index) => (
    <div className="learned-phrase" key={index}>
      <span className="kannada">{turn.you}</span>
      <AudioButton text={turn.you} />
    </div>
  ))}


setTurns([
  ...turns,
  {
    you: choice.label,
    correct: choice.correct,
    sub: choice.sub,
  },
])
setStepId(choice.next)
}


  return (
    <main className="app-shell conversation-page">
      <div className="page-header"><div><p className="eyebrow">Speak in context</p><h1>Real-life practice</h1><p className="subtitle">Make meaningful choices and see how the conversation responds.</p></div><span className="chip">{completedScenarios.length}/8 scenarios complete</span></div>
      <div className="scenario-tabs" aria-label="Choose a practice scenario">{Object.entries(conversationScenarios).map(([id, item]) => <button className={scenarioId === id ? 'active' : ''} onClick={() => reset(id)} key={id}>{item.title}</button>)}</div>
      <div className="conversation-layout">
        <aside className="scenario-card card"><div className="scenario-illustration"><Icon name="chat" size={38} /></div><p className="eyebrow">{scenario.setting}</p><h2>{scenario.title}</h2><p>Respond naturally in Kannada. Helpful feedback will guide you when a choice does not fit.</p><div className="scenario-words"><span>Goal</span><strong>{scenario.goal}</strong></div></aside>
        <section className="chat-stage card" aria-live="polite">
          <div className="chat-history">{turns.map((turn, index) => <div className="past-turn" key={index}><div className="bubble user-bubble"><small>You</small><span className="kannada">{turn.you}</span></div></div>)}</div>
          {stepId !== 'done' ? <>
            <div className="speaker"><span className="speaker-avatar kannada">{step.speaker === 'KannadaMitra' ? 'ಮ' : 'ಕ'}</span><div><strong>{step.speaker}</strong><span>{step.speaker === 'KannadaMitra' ? 'Your friendly guide' : scenario.setting}</span></div></div>
            <div className="bubble guide-bubble"><div><p className="kannada">{step.kn}</p><strong>{step.tr}</strong><span>{step.en}</span></div><AudioButton text={step.kn} /></div>
            {feedback && <p className={`conversation-feedback ${stepId === 'retry' ? 'try' : ''}`}><Icon name={stepId === 'retry' ? 'quiz' : 'check'} size={17} />{feedback}</p>}
            
<div className="choice-area">
  <span>How do you respond?</span>

  {step.choices.map((choice) => (
    <div className="conversation-choice" key={choice.label}>
      <button
        className="conversation-choice-main"
        onClick={() => choose(choice)}
      >
        <span className="kannada">{choice.label}</span>
        <small>{choice.sub}</small>
        <Icon name="arrow" />
      </button>

      <AudioButton text={choice.label} />
    </div>
  ))}
</div>

          </> : <div className="conversation-complete"><div className="complete-badge"><Icon name="trophy" size={36} /></div><p className="eyebrow">Scenario complete</p><h2>ಚೆನ್ನಾಗಿದೆ! Great work.</h2><p>{earned ? 'You completed a new real-life scenario and earned 30 XP.' : 'You completed another genuine practice round. This scenario’s XP was already earned.'}</p><div><div className="learned-phrases">
  <h3>Phrases you practised</h3>

  {practisedPhrases.map((phrase, index) => (
  <div className="learned-phrase" key={index}>
    <span className="kannada">{phrase.you}</span>
    <AudioButton text={phrase.you} />
  </div>
))}
</div><button className="btn btn-secondary" onClick={() => reset()}>Practise again</button><button className="btn btn-primary" onClick={() => navigate('quiz')}>Take the quiz <Icon name="arrow" /></button></div></div>}
        </section>
      </div>
    </main>
  )
}
