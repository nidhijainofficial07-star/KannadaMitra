
import { useState } from 'react'
import Icon from './Icon'
import AudioButton from './AudioButton'
import './LessonQuiz.css'

function shuffle(items) {
  const result = [...items]

  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[result[i], result[j]] = [result[j], result[i]]
  }

  return result
}

function buildQuestions(lesson) {
  const phrases = lesson.phrases

  return shuffle(phrases).map((phrase) => {
    const distractors = shuffle(
      phrases.filter((item) => item.id !== phrase.id)
    ).slice(0, 2)

    const options = shuffle([
      phrase.en,
      ...distractors.map((item) => item.en),
    ])

    return {
      phrase,
      options,
      answer: options.indexOf(phrase.en),
    }
  })
}

export default function LessonQuiz({
  lesson,
  previousScore = 0,
  onFinish,
}) {
  const [questions, setQuestions] = useState(
    () => buildQuestions(lesson)
  )
  const [index, setIndex] = useState(0)
  const [selected, setSelected] = useState(null)
  const [score, setScore] = useState(0)
  const [mistakes, setMistakes] = useState([])
  const [finished, setFinished] = useState(false)
  const [bestAtStart] = useState(previousScore)

  const question = questions[index]

  const choose = (optionIndex) => {
    if (selected !== null) return

    setSelected(optionIndex)

    if (optionIndex === question.answer) {
      setScore((value) => value + 1)
    } else {
      setMistakes((current) => [
        ...new Set([...current, question.phrase.id]),
      ])
    }
  }

  const next = () => {
    if (index === questions.length - 1) {
      setFinished(true)
      onFinish(lesson.id, score, questions.length, mistakes)
    } else {
      setIndex((value) => value + 1)
      setSelected(null)
    }
  }

  const restart = () => {
    setQuestions(buildQuestions(lesson))
    setIndex(0)
    setSelected(null)
    setScore(0)
    setMistakes([])
    setFinished(false)
  }

  if (finished) {
    return (
      <section className="lesson-quiz-result card">
        <div className="icon-orb">
          <Icon
            name={
              score === questions.length
                ? 'trophy'
                : 'check'
            }
          />
        </div>

        <div>
          <p className="eyebrow">Lesson quiz complete</p>
          <h3>
            {score === questions.length
              ? 'Perfect recall!'
              : 'Good practice.'}
          </h3>

          <span>
            You scored {score}/{questions.length}.
            {score > bestAtStart
              ? ' New personal best!'
              : ' Keep practising to improve your score.'}
          </span>
        </div>

        <button
          className="btn btn-secondary"
          onClick={restart}
        >
          Try a fresh round
        </button>
      </section>
    )
  }

  return (
    <section className="lesson-quiz card">
      <div className="lesson-quiz-head">
        <div>
          <p className="eyebrow">Lesson practice</p>
          <h3>What does this mean?</h3>
        </div>

        <span>
          {index + 1}/{questions.length}
        </span>
      </div>

      <div className="lesson-quiz-question">
        <p className="lesson-quiz-kannada kannada">
          {question.phrase.kn}
        </p>

        <AudioButton text={question.phrase.kn} />
      </div>


      <div className="lesson-quiz-options">
        {question.options.map((option, optionIndex) => {
          const state =
            selected !== null
              ? optionIndex === question.answer
                ? 'correct'
                : optionIndex === selected
                  ? 'wrong'
                  : 'dim'
              : ''

          return (
            <div
              className="lesson-quiz-option-row"
              key={`${question.phrase.id}-${option}`}
            >
              <button
                type="button"
                className={state}
                onClick={() => choose(optionIndex)}
              >
                <span>
                  {String.fromCharCode(65 + optionIndex)}
                </span>

                <span className="lesson-quiz-option-text">
                  {option}
                </span>

                {state === 'correct' && (
                  <Icon name="check" size={17} />
                )}
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
          className={`lesson-quiz-feedback ${
            selected === question.answer ? 'correct' : ''
          }`}
        >
          <strong>
            {selected === question.answer
              ? 'Correct!'
              : 'Not quite.'}
          </strong>
          {' '}{question.phrase.context}
        </div>
      )}

      <div className="lesson-quiz-footer">
        <span>
          Question {index + 1} of {questions.length}
        </span>

        <button
          className="btn btn-primary"
          disabled={selected === null}
          onClick={next}
        >
          {index === questions.length - 1
            ? 'See result'
            : 'Next'}

          <Icon name="arrow" size={17} />
        </button>
      </div>
    </section>
  )
}
