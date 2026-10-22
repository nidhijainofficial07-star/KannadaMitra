
import { useState } from 'react'
import Icon from '../components/Icon'
import AudioButton from '../components/AudioButton'
import { quizQuestions as allQuizQuestions } from '../data/quiz'
import './Quiz.css'

function shuffleQuestions(questions) {
  const shuffled = [...questions]

  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
  }

  return shuffled
}

export default function Quiz({
  onFinish,
  navigate,
  previousBest = 0,
  completedLessons = [],
}) {
  const [quizQuestions] = useState(() => {
    const completed = new Set(
      Array.isArray(completedLessons) ? completedLessons : []
    )

    const eligibleQuestions = allQuizQuestions.filter(
      (question) => completed.has(question.lesson)
    )

    return shuffleQuestions(eligibleQuestions).slice(0, 10)
  })

  const [index, setIndex] = useState(0)
  const [selected, setSelected] = useState(null)
  const [score, setScore] = useState(0)
  const [mistakes, setMistakes] = useState([])
  const [finished, setFinished] = useState(false)
  const [bestAtStart] = useState(previousBest)

  const question = quizQuestions[index]

  const choose = (option) => {
    if (selected !== null) return

    setSelected(option)

    if (option === question.answer) {
      setScore((value) => value + 1)
    } else {
      setMistakes((current) => [
        ...new Set([...current, question.id]),
      ])
    }
  }

  const next = () => {
    if (index === quizQuestions.length - 1) {
      onFinish(score, quizQuestions.length, mistakes)
      setFinished(true)
    } else {
      setIndex((value) => value + 1)
      setSelected(null)
    }
  }

  const retry = () => {
    setIndex(0)
    setSelected(null)
    setScore(0)
    setMistakes([])
    setFinished(false)
  }

  if (quizQuestions.length === 0) {
    return (
      <main className="app-shell quiz-page">
        <section className="question-card card">
          <p className="eyebrow">Everyday Kannada quiz</p>
          <h1>Complete a lesson first</h1>
          <p>
            You need to complete a lesson before taking the quiz.
            Complete a lesson to unlock questions from that lesson.
          </p>
          <button
            className="btn btn-primary"
            onClick={() => navigate('lessons')}
          >
            Go to lessons <Icon name="arrow" />
          </button>
        </section>
      </main>
    )
  }

  if (finished) {
    const percent = Math.round(
      (score / quizQuestions.length) * 100
    )
    const earnedXp = Math.max(0, score - bestAtStart) * 10

    return (
      <main className="app-shell">
        <section className="quiz-result card">
          <div className="result-orb">
            <Icon name="trophy" size={43} />
          </div>

          <p className="eyebrow">Quiz complete</p>

          <h1>
            {percent >= 80
              ? 'ಅದ್ಭುತ! Excellent.'
              : 'ಚೆನ್ನಾಗಿದೆ! Nice work.'}
          </h1>

          <p>
            You scored <strong>{score} out of {quizQuestions.length}</strong>.{' '}
            {percent >= 80
              ? 'You’re building a strong everyday vocabulary.'
              : `${mistakes.length} answer${mistakes.length === 1 ? '' : 's'} added to your revision queue.`}
          </p>

          <div className="score-meter">
            <div style={{ width: `${percent}%` }} />
          </div>

          <span>
            {percent}% correct ·{' '}
            {earnedXp
              ? `+${earnedXp} XP for a new best`
              : 'Best score XP already earned'}
          </span>

          <div className="result-actions">
            <button className="btn btn-secondary" onClick={retry}>
              Retry quiz
            </button>

            {mistakes.length > 0 && (
              <button
                className="btn btn-secondary"
                onClick={() => navigate('revision')}
              >
                Review mistakes
              </button>
            )}

            <button
              className="btn btn-primary"
              onClick={() => navigate('progress')}
            >
              View progress <Icon name="arrow" />
            </button>
          </div>
        </section>
      </main>
    )
  }

  return (
    <main className="app-shell quiz-page">
      <div className="quiz-top">
        <div>
          <p className="eyebrow">Quick knowledge check</p>
          <h1>Everyday Kannada quiz</h1>
        </div>
        <span>{index + 1} of {quizQuestions.length}</span>
      </div>

      <div className="progress-track">
        <div
          className="progress-fill"
          style={{
            width: `${((index + 1) / quizQuestions.length) * 100}%`,
          }}
        />
      </div>

      <section className="question-card card">
        <span className="question-label">
          QUESTION {String(index + 1).padStart(2, '0')}
        </span>

        
<div className="quiz-question-audio">
  <h2>{question.prompt}</h2>

  {(() => {
    const match = question.prompt.match(/[“"]([^”"]+)[”"]/)

    return match ? (
      <AudioButton
        text={match[1]}
        language="kn"
        label="Hear Kannada pronunciation"
      />
    ) : null
  })()}
</div>


        <div className="answer-list">
          {question.options.map((option, optionIndex) => {
            let state = ''

            if (selected !== null) {
              state =
                optionIndex === question.answer
                  ? 'correct'
                  : optionIndex === selected
                    ? 'wrong'
                    : 'dim'
            }

            
return (
  <div className="answer-option-row" key={option}>
    <button
      type="button"
      className={state}
      onClick={() => choose(optionIndex)}
    >
      <span>{String.fromCharCode(65 + optionIndex)}</span>
      <strong>{option}</strong>
      {state === 'correct' && <Icon name="check" />}
      {state === 'wrong' && <Icon name="close" />}
    </button>

    <AudioButton
      text={option}
      language="en"
      label={`Hear option ${String.fromCharCode(65 + optionIndex)}`}
    />
  </div>
)
          })}
        </div>

        {selected !== null && (
          <div
            className={`answer-feedback ${
              selected === question.answer ? 'correct' : 'wrong'
            }`}
            role="status"
          >
            <Icon
              name={selected === question.answer ? 'check' : 'quiz'}
            />
            <div>
              <strong>
                {selected === question.answer ? 'Correct!' : 'Good try.'}
              </strong>
              <p>{question.note}</p>
            </div>
          </div>
        )}

        <div className="question-footer">
          <span>
            {selected === null
              ? 'Choose the best answer'
              : `Current score: ${score}/${index + 1}`}
          </span>

          <button
            className="btn btn-primary"
            disabled={selected === null}
            onClick={next}
          >
            {index === quizQuestions.length - 1
              ? 'See results'
              : 'Next question'}{' '}
            <Icon name="arrow" />
          </button>
        </div>
      </section>
    </main>
  )
}
