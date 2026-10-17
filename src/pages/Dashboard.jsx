import { useEffect, useState } from 'react'
import Icon from '../components/Icon'
import LessonCard from '../components/LessonCard'
import AudioButton from '../components/AudioButton'
import { lessons } from '../data/lessons'
import { survivalPhrases } from '../data/phrases'
import './Dashboard.css'

export default function Dashboard({ progress, navigate, openLesson }) {
  const completed = progress.completedLessons.length
  const dayNumber = Math.floor(Date.now() / 86400000)
  const phrase = survivalPhrases[dayNumber % survivalPhrases.length]

  const recommendationIds = {
    food: 'food',
    travel: 'transport',
    college: 'college',
    shopping: 'shopping',
    everyday: 'basics',
    emergency: 'emergency',
  }

  const recommended =
    lessons.find(
      (lesson) =>
        lesson.category === recommendationIds[progress.profile.goal],
    ) || lessons[0]

  const firstName = progress.profile.nickname.trim() || 'friend'

  const missionSteps = [
    { label: 'Complete a lesson', done: progress.daily.learned },
    { label: 'Practise a conversation', done: progress.daily.practised },
    { label: 'Answer today’s quiz', done: progress.daily.quizzed },
  ]

  const missionDone = missionSteps.filter((item) => item.done).length
  const [showMissionCelebration, setShowMissionCelebration] = useState(false)

useEffect(() => {
  if (missionDone !== 3) return

  const today = new Date().toLocaleDateString('en-CA')
  const storageKey = `kannadamitra-mission-celebration-${today}`

  if (localStorage.getItem(storageKey)) return

  localStorage.setItem(storageKey, 'shown')
  setShowMissionCelebration(true)
}, [missionDone])


  // Direct the learner to the first unfinished daily activity.
  // The quiz currently uses the learn route because the quiz route
  // has not yet been confirmed.
const nextMissionRoute = !progress.daily.learned
  ? 'learn'
  : !progress.daily.practised
    ? 'conversation'
    : !progress.daily.quizzed
      ? 'learn'
      : 'dashboard'

  return (
    <main className="app-shell dashboard">
      {showMissionCelebration && (
  <div className="mission-celebration-overlay" role="dialog" aria-modal="true">
    <div className="mission-celebration-confetti" aria-hidden="true">
      {Array.from({ length: 24 }, (_, index) => (
        <span key={index} style={{ '--confetti-index': index }} />
      ))}
    </div>

    <div className="mission-celebration-card">
      <div className="mission-celebration-icon">🎉</div>
      <p className="eyebrow">DAILY MISSION COMPLETE</p>
      <h2>ಚೆನ್ನಾಗಿದೆ!</h2>
      <h3>You did it!</h3>
      <p>You've completed all three daily activities. Every step brings you closer to confident Kannada.</p>

      <div className="mission-celebration-progress">
        <strong>3/3</strong>
        <span>Mission steps completed</span>
      </div>

      <button
        className="btn btn-primary"
        onClick={() => setShowMissionCelebration(false)}
      >
        Awesome!
      </button>
    </div>
  </div>
)}
      <div className="dash-greeting">
        <div>
          <p className="eyebrow">ನಮಸ್ಕಾರ · Welcome back</p>
          <h1>Namaskara, {firstName}!</h1>
          <p className="subtitle">
            You’ve set aside {progress.profile.duration} minutes.
            Let’s make them count.
          </p>
        </div>

        <button
          className="level-card"
          onClick={() => navigate('profile')}
        >
          <span>YOUR PROFILE</span>
          <strong>
            {progress.profile.level === 'beginner'
              ? 'ಹೊಸಬರು'
              : progress.profile.level === 'some'
                ? 'ಸ್ವಲ್ಪ ಗೊತ್ತು'
                : 'ಮತ್ತೆ ಕಲಿಕೆ'}
          </strong>
          <small>Edit preferences</small>
        </button>
      </div>

      <section className="daily-feature-grid">
        <div className="phrase-day card">
          <div>
            <p className="eyebrow">Phrase of the day</p>
            <p className="kannada">{phrase.kn}</p>
            <strong>{phrase.tr}</strong>
            <span>{phrase.en}</span>
          </div>

          <AudioButton text={phrase.kn} />
        </div>

        <button
          className="challenge-teaser card"
          onClick={() => navigate('challenge')}
        >
          <span className="icon-orb">
            <Icon
              name={progress.daily.challenge ? 'check' : 'target'}
            />
          </span>

          <span>
            <small>REAL-LIFE CHALLENGE</small>
            <strong>
              {progress.daily.challenge
                ? 'Completed for today'
                : 'Put today’s Kannada to use'}
            </strong>
            <em>
              {progress.daily.challenge
                ? 'Come back tomorrow for a new scenario'
                : 'One scenario · 20 XP'}
            </em>
          </span>

          <Icon name="arrow" />
        </button>
      </section>

      <section className="mission card">
        <div className="mission-copy">
          <div className="mission-title">
            <div className="icon-orb">
              <Icon name="star" />
            </div>

            <div>
              <span>Today’s mission</span>
              <h2>Build your everyday Kannada</h2>
            </div>
          </div>

          <div className="mission-list">
            {missionSteps.map((item) => (
              <div
                key={item.label}
                className={item.done ? 'done' : ''}
              >
                <span>
                  <Icon name="check" size={15} />
                </span>
                {item.label}
              </div>
            ))}
          </div>

          <button
            className="btn btn-primary"
            onClick={() => navigate(nextMissionRoute)}
          >
            {missionDone === 3
              ? 'Mission complete!'
              : 'Continue mission'}
            <Icon name="arrow" />
          </button>
        </div>

        <div className="mission-progress">
          <div
            className="progress-circle"
            style={{
              '--progress': `${(missionDone / 3) * 360}deg`,
            }}
          >
            <div>
              <strong>{missionDone}/3</strong>
              <small>steps</small>
            </div>
          </div>

          <span>Progress resets each day</span>
        </div>
      </section>

      <section className="stat-grid">
        <div className="stat-card card">
          <div className="icon-orb coral">
            <Icon name="flame" />
          </div>
          <div>
            <strong>{progress.streak}</strong>
            <span>day streak</span>
            <small>Keep it glowing</small>
          </div>
        </div>

        <div className="stat-card card">
          <div className="icon-orb yellow">
            <Icon name="star" />
          </div>
          <div>
            <strong>{progress.xp}</strong>
            <span>total XP</span>
            <small>
              {Math.max(0, 100 - (progress.xp % 100))} to next level
            </small>
          </div>
        </div>

        <div className="stat-card card">
          <div className="icon-orb green">
            <Icon name="trophy" />
          </div>
          <div>
            <strong>{completed}</strong>
            <span>lessons done</span>
            <small>of {lessons.length} essentials</small>
          </div>
        </div>
      </section>

      <div className="section-title">
        <div>
          <p className="eyebrow">Recommended for your goal</p>
          <h2>{recommended.title} is a great next step</h2>
        </div>

        <button
          className="btn btn-ghost"
          onClick={() => navigate('learn')}
        >
          View all
          <Icon name="arrow" size={17} />
        </button>
      </div>

      <div className="lesson-grid">
        {[
          recommended,
          ...lessons.filter(
            (lesson) => lesson.id !== recommended.id,
          ),
        ]
          .slice(0, 2)
          .map((lesson) => (
            <LessonCard
              key={lesson.id}
              lesson={lesson}
              completed={progress.completedLessons.includes(
                lesson.id,
              )}
              onOpen={() => openLesson(lesson.id)}
            />
          ))}
      </div>

      <div className="quick-grid">
        <button
          className="quick-card help-say"
          onClick={() => navigate('help-say')}
        >
          <Icon name="chat" />
          <span>
            <strong>Help Me Say This</strong>
            <small>Find the right phrase for the moment</small>
          </span>
          <Icon name="arrow" />
        </button>

        <button
          className="quick-card survival"
          onClick={() => navigate('survival')}
        >
          <Icon name="phrase" />
          <span>
            <strong>Survival Kannada</strong>
            <small>Essential phrases when you need them</small>
          </span>
          <Icon name="arrow" />
        </button>

        <button
          className="quick-card revision"
          onClick={() => navigate('revision')}
        >
          <Icon name="quiz" />
          <span>
            <strong>Revision Zone</strong>
            <small>
              {progress.revisionQuestionIds.length +
                progress.difficultPhraseIds.length}{' '}
              items to revisit
            </small>
          </span>
          <Icon name="arrow" />
        </button>

        <button
          className="quick-card favourites"
          onClick={() => navigate('favourites')}
        >
          <Icon name="heart" />
          <span>
            <strong>Your favourites</strong>
            <small>
              {progress.favourites.length} saved phrases
            </small>
          </span>
          <Icon name="arrow" />
        </button>
      </div>
    </main>
  )
}
