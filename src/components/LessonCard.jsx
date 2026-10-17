import Icon from './Icon'
import AudioButton from './AudioButton'
import './LessonCard.css'

export default function LessonCard({ lesson, completed, onOpen }) {
  return (
    <article className={`lesson-card card accent-${lesson.color}`}>
      <div className="lesson-icon">
        <Icon name={completed ? 'check' : 'learn'} />
      </div>

      <div className="lesson-copy">
        <span className="chip">
          {completed ? 'Completed' : `${lesson.phrases.length} phrases`}
        </span>

        <h3>{lesson.title}</h3>

        <div className="lesson-kannada-row">
          <p className="kannada">{lesson.kannadaTitle}</p>
          <AudioButton text={lesson.kannadaTitle} />
        </div>

        <small>{lesson.description}</small>
      </div>

      <button
        className="lesson-open"
        onClick={onOpen}
        aria-label={`Open ${lesson.title} lesson`}
      >
        <Icon name="arrow" />
      </button>
    </article>
  )
}
