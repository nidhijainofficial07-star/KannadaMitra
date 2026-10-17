import { useState } from 'react'
import Icon from '../components/Icon'
import AudioButton from '../components/AudioButton'
import { quizQuestions } from '../data/quiz'
import { lessons } from '../data/lessons'
import './Revision.css'

const lessonPhrases = lessons.flatMap((lesson) => lesson.phrases.map((phrase, index) => ({
  ...phrase,
  id: `${lesson.id}-${index}`,
  lesson: lesson.title,
})))

export default function Revision({ questionIds, phraseIds, onMaster, onMasterPhrase, navigate }) {
  const [queue] = useState(questionIds)
  const questions = queue.map((id) => quizQuestions.find((item) => item.id === id)).filter(Boolean)
  const [position, setPosition] = useState(0)
  const [selected, setSelected] = useState(null)
  const question = questions[position]
  const difficultPhrases = phraseIds.map((id) => lessonPhrases.find((phrase) => phrase.id === id)).filter(Boolean)

  if (!question && !difficultPhrases.length) return (
    <main className="app-shell revision-page"><div className="empty-state card"><div className="icon-orb"><Icon name="check" /></div><h1>You’re all caught up</h1><p className="subtitle">Quiz mistakes and lesson phrases you mark as difficult will appear here.</p><button className="btn btn-primary" onClick={() => navigate('quiz')}>Take a quiz <Icon name="arrow" /></button></div></main>
  )

  const answer = (index) => {
    setSelected(index)
    if (index === question.answer) onMaster(question.id)
  }
  const next = () => {
    setSelected(null)
    setPosition((current) => current + 1)
  }

  return (
    <main className="app-shell revision-page">
      <div className="page-header"><div><p className="eyebrow">Revision Zone</p><h1>Turn tricky phrases into strengths</h1><p className="subtitle">Practise real quiz mistakes and phrases you personally saved.</p></div><span className="chip">{Math.max(0, questions.length - position) + difficultPhrases.length} to review</span></div>
      {question && <section className="revision-card card">
        <div className="revision-tag"><Icon name="quiz" /> Quiz correction · {question.lesson}</div>
        <h2 className="kannada">{question.prompt}</h2>
        <div className="revision-options">{question.options.map((option, index) => { const state = selected !== null ? index === question.answer ? 'correct' : index === selected ? 'wrong' : '' : ''; return <button className={state} onClick={() => answer(index)} key={option}><span>{String.fromCharCode(65 + index)}</span><strong className="kannada">{option}</strong></button> })}</div>
        {selected !== null && <div className={`revision-feedback ${selected === question.answer ? 'correct' : ''}`}><strong>{selected === question.answer ? 'You’ve got it now.' : 'Not yet—use the explanation and try the correct answer.'}</strong><span>{question.note}</span></div>}
        <div className="revision-footer"><span>Correct answers leave your saved queue.</span><button className="btn btn-primary" disabled={selected !== question.answer} onClick={next}>{position === questions.length - 1 ? 'Finish quiz corrections' : 'Next correction'} <Icon name="arrow" /></button></div>
      </section>}
      {difficultPhrases.length > 0 && <section className="saved-revision">
        <div className="section-title"><div><p className="eyebrow">Saved from lessons</p><h2>Difficult phrases</h2></div><span className="chip">{difficultPhrases.length} saved</span></div>
        <div className="saved-revision-list">{difficultPhrases.map((phrase) => <article className="saved-revision-card card" key={phrase.id}><div><span>{phrase.lesson}</span><p className="kannada">{phrase.kn}</p><strong>{phrase.tr}</strong><small>{phrase.en}</small></div><div><AudioButton text={phrase.kn} /><button className="btn btn-secondary" onClick={() => onMasterPhrase(phrase.id)}><Icon name="check" size={16} /> I know this now</button></div></article>)}</div>
      </section>}
    </main>
  )
}
