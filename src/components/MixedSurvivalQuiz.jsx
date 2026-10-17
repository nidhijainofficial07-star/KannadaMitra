
import { useState } from 'react'
import AudioButton from './AudioButton'
import Icon from './Icon'
import './MixedSurvivalQuiz.css'

function shuffle(items) {
  const result = [...items]

  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[result[i], result[j]] = [result[j], result[i]]
  }

  return result
}


function buildQuestions(lessons) {
  const allPhrases = lessons.flatMap((lesson) =>
    lesson.phrases.map((phrase) => ({
      ...phrase,
      category: lesson.category,
      categoryTitle: lesson.categoryTitle,
      lessonTitle: lesson.title,
    }))
  )

  const categories = [...new Set(lessons.map((lesson) => lesson.category))]
  const selected = []

  // Include at least one phrase from every category.
  for (const category of shuffle(categories)) {
    const categoryPhrases = shuffle(
      allPhrases.filter(
        (phrase) =>
          phrase.category === category &&
          !selected.some((item) => item.id === phrase.id)
      )
    )

    if (categoryPhrases.length) {
      selected.push(categoryPhrases[0])
    }
  }

  // Fill the remaining places with unique phrases.
  const remaining = shuffle(
    allPhrases.filter(
      (phrase) => !selected.some((item) => item.id === phrase.id)
    )
  )

  selected.push(...remaining.slice(0, 25 - selected.length))

  return shuffle(selected).map((phrase) => {
    const distractors = shuffle(
      allPhrases.filter(
        (item) => item.id !== phrase.id && item.en !== phrase.en
      )
    )

    const uniqueDistractors = distractors
      .filter(
        (item, index, list) =>
          list.findIndex((other) => other.en === item.en) === index
      )
      .slice(0, 2)
      .map((item) => item.en)

    const options = shuffle([phrase.en, ...uniqueDistractors])

    return {
      phrase,
      options,
      answer: options.indexOf(phrase.en),
    }
  })
}


export default function MixedSurvivalQuiz({ lessons }) {
  const [questions, setQuestions] = useState([])
  const [index, setIndex] = useState(0)
  const [selected, setSelected] = useState(null)
  const [score, setScore] = useState(0)
  const [finished, setFinished] = useState(false)

  const startQuiz = () => {
    setQuestions(buildQuestions(lessons))
    setIndex(0)
    setSelected(null)
    setScore(0)
    setFinished(false)
  }

  if (!questions.length) {
    return (
      <section className="mixed-quiz card">
        <div className="mixed-quiz-intro">
          <div className="icon-orb"><Icon name="quiz" /></div>
          <div>
            <p className="eyebrow">Mixed survival challenge</p>
            <h2>Can you handle everyday Kannada?</h2>
            <p>25 questions from all eight learning categories, with a fresh round each time.</p>
          </div>
        </div>
        <button className="btn btn-primary" onClick={startQuiz}>
          Start 25-question quiz <Icon name="arrow" size={17} />
        </button>
      </section>
    )
  }

  if (finished) {
    const percentage = Math.round((score / questions.length) * 100)

    return (
      <section className="mixed-quiz card mixed-quiz-result">
        <div className="icon-orb">
          <Icon name={percentage >= 80 ? 'trophy' : 'check'} />
        </div>
        <p className="eyebrow">Challenge complete</p>
        <h2>
          {percentage >= 80
            ? 'Great work!'
            : percentage >= 50
              ? 'You are making progress!'
              : 'Keep practising!'}
        </h2>
        <p className="mixed-quiz-score">
          You scored <strong>{score}/{questions.length}</strong> ({percentage}%)
        </p>
        <p>Review the lessons for phrases you found difficult, then try a fresh round.</p>
        <button className="btn btn-primary" onClick={startQuiz}>
          Try a fresh round <Icon name="arrow" size={17} />
        </button>
      </section>
    )
  }

  const question = questions[index]

  const choose = (optionIndex) => {
    if (selected !== null) return

    setSelected(optionIndex)

    if (optionIndex === question.answer) {
      setScore((value) => value + 1)
    }
  }

  const next = () => {
    if (index === questions.length - 1) {
      setFinished(true)
    } else {
      setIndex((value) => value + 1)
      setSelected(null)
    }
  }

  return (
    <section className="mixed-quiz card">
      <div className="mixed-quiz-heading">
        <div>
          <p className="eyebrow">Mixed survival challenge</p>
          <h2>What does this mean?</h2>
        </div>
        <span>{index + 1}/{questions.length}</span>
      </div>

      <div className="mixed-quiz-progress">
        <div
          className="progress-fill"
          style={{ width: `${((index + 1) / questions.length) * 100}%` }}
        />
      </div>

      <div className="mixed-quiz-question">
        <span className="chip">{question.phrase.categoryTitle}</span>
        <p className="kannada">{question.phrase.kn}</p>
        <AudioButton text={question.phrase.kn} />
      </div>

      <div className="mixed-quiz-options">
        {question.options.map((option, optionIndex) => {
          const state = selected !== null
            ? optionIndex === question.answer
              ? 'correct'
              : optionIndex === selected
                ? 'wrong'
                : 'dim'
            : ''

          return (
            <button
              className={state}
              key={`${option}-${optionIndex}`}
              onClick={() => choose(optionIndex)}
            >
              <span>{String.fromCharCode(65 + optionIndex)}</span>
              {option}
              {state === 'correct' && <Icon name="check" size={17} />}
            </button>
          )
        })}
      </div>

      {selected !== null && (
        <div className={`mixed-quiz-feedback ${selected === question.answer ? 'correct' : ''}`}>
          <strong>{selected === question.answer ? 'Correct!' : 'Not quite.'}</strong>
          {' '}{question.phrase.context}
          <p><small>Lesson: {question.phrase.lessonTitle}</small></p>
        </div>
      )}

      <div className="mixed-quiz-footer">
        <span>Score: {score}</span>
        <button className="btn btn-primary" disabled={selected === null} onClick={next}>
          {index === questions.length - 1 ? 'See result' : 'Next'}
          <Icon name="arrow" size={17} />
        </button>
      </div>
    </section>
  )
}
