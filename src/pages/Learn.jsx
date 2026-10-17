import { useEffect, useMemo, useState } from 'react'
import CategoryCard from '../components/CategoryCard'
import LessonCard from '../components/LessonCard'
import LessonQuiz from '../components/LessonQuiz'
import AudioButton from '../components/AudioButton'
import Icon from '../components/Icon'
import MixedSurvivalQuiz from '../components/MixedSurvivalQuiz'
import { lessonCategories, lessons } from '../data/lessons'
import './Learn.css'

const levels = ['All levels', 'Beginner', 'Intermediate', 'Advanced']

export default function Learn({ selectedLesson, setSelectedLesson, completedLessons, confidence, difficultPhraseIds, quizScores, onComplete, onConfidence, onToggleDifficult, onLessonQuizFinish, navigate }) {
  const [notice, setNotice] = useState('')
  const [query, setQuery] = useState('')
  const [category, setCategory] = useState('all')
  const [level, setLevel] = useState('All levels')
  const [phraseIndex, setPhraseIndex] = useState(0)
  const lesson = lessons.find((item) => item.id === selectedLesson)
  const [showCelebration, setShowCelebration] = useState(false)

  useEffect(() => { setPhraseIndex(0); setNotice('') }, [selectedLesson])

  const filteredLessons = useMemo(() => lessons.filter((item) => {
    const haystack = `${item.title} ${item.kannadaTitle} ${item.description} ${item.phrases.map((phrase) => `${phrase.kn} ${phrase.tr} ${phrase.en}`).join(' ')}`.toLowerCase()
    return (category === 'all' || item.category === category) && (level === 'All levels' || item.level === level) && haystack.includes(query.toLowerCase().trim())
  }), [category, level, query])

  if (!lesson) return (
    <main className="app-shell learn-library">
      <div className="page-header"><div><p className="eyebrow">Your learning library</p><h1>Kannada for real life</h1><p className="subtitle">Explore 40 practical lessons, from first greetings to confident everyday conversations.</p></div><span className="chip">{completedLessons.length}/{lessons.length} complete</span></div>
      <section className="library-search card">
        <div className="library-search-input"><Icon name="search" /><label className="sr-only" htmlFor="library-search">Search lessons and phrases</label><input id="library-search" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search lessons, English meanings, or Kannada phrases..." />{query && <button onClick={() => setQuery('')} aria-label="Clear search"><Icon name="close" /></button>}</div>
        <div className="library-filters"><label>Category<select value={category} onChange={(event) => setCategory(event.target.value)}><option value="all">All categories</option>{lessonCategories.map((item) => <option value={item.id} key={item.id}>{item.title}</option>)}</select></label><label>Difficulty<select value={level} onChange={(event) => setLevel(event.target.value)}>{levels.map((item) => <option key={item}>{item}</option>)}</select></label></div>
      </section>

{!query && category === 'all' && level === 'All levels' && (
  <MixedSurvivalQuiz lessons={lessons} />
)}

{!query && category === 'all' && level === 'All levels' && <><div className="section-title"><div><p className="eyebrow">Browse by category</p><h2>Eight paths for everyday life</h2></div></div><div className="category-grid">{lessonCategories.map((item) => <CategoryCard category={item} lessons={lessons.filter((lessonItem) => lessonItem.category === item.id)} completedLessons={completedLessons} onOpen={() => setCategory(item.id)} key={item.id} />)}</div></>}
      <div className="section-title"><div><p className="eyebrow">{category === 'all' ? 'All lessons' : lessonCategories.find((item) => item.id === category)?.title}</p><h2>{filteredLessons.length} lesson{filteredLessons.length === 1 ? '' : 's'} found</h2></div>{category !== 'all' && <button className="btn btn-ghost" onClick={() => setCategory('all')}>Clear category</button>}</div>
      <div className="library-lesson-grid">{filteredLessons.map((item) => <div className="library-lesson-wrap" key={item.id}><span className={`level-badge ${item.level.toLowerCase()}`}>{item.level}</span><LessonCard lesson={item} completed={completedLessons.includes(item.id)} onOpen={() => setSelectedLesson(item.id)} /></div>)}</div>
      {!filteredLessons.length && <div className="empty-state card"><div className="icon-orb"><Icon name="search" /></div><h2>No matching lessons</h2><p className="subtitle">Try a broader phrase or clear one of your filters.</p><button className="btn btn-secondary" onClick={() => { setQuery(''); setCategory('all'); setLevel('All levels') }}>Show all lessons</button></div>}
    </main>
  )

  const phrase = lesson.phrases[phraseIndex]
  const saved = difficultPhraseIds.includes(phrase.id)
  const alreadyCompleted = completedLessons.includes(lesson.id)
  const related = lessons.filter((item) => item.category === lesson.category && item.id !== lesson.id).slice(0, 2)
  const complete = () => {
  onComplete(lesson.id)

  if (!alreadyCompleted) {
    setShowCelebration(true)
    setNotice('Lesson complete — you earned 25 XP!')
  } else {
    setNotice(
      'Practice logged today. This lesson’s completion XP was already earned.'
    )
  }
}

  return (
    <main className="app-shell lesson-reader">
      <button className="back-link" onClick={() => setSelectedLesson(null)}>← Learning library</button>
      <div className="lesson-detail-head">
        <div><div className="lesson-meta"><span className="chip">{lesson.categoryTitle}</span><span className={`level-badge ${lesson.level.toLowerCase()}`}>{lesson.level}</span></div><h1>{lesson.title}</h1>

<div className="lesson-kannada-row">
  <p className="kannada">{lesson.kannadaTitle}</p>
  <AudioButton text={lesson.kannadaTitle} />
</div>

<p className="subtitle">{lesson.description}</p></div>
        <div className="lesson-symbol"><Icon name="learn" size={34} /></div>
      </div>
      <div className="reader-progress"><div><span>Phrase {phraseIndex + 1} of {lesson.phrases.length}</span><strong>{Math.round(((phraseIndex + 1) / lesson.phrases.length) * 100)}%</strong></div><div className="progress-track"><div className="progress-fill" style={{ width: `${((phraseIndex + 1) / lesson.phrases.length) * 100}%` }}></div></div></div>
      <section className="focus-phrase card">
        <div className="focus-phrase-top"><span className="phrase-number">{String(phraseIndex + 1).padStart(2, '0')}</span><div><AudioButton text={phrase.kn} /><button className={`icon-button ${saved ? 'revision-saved' : ''}`} onClick={() => onToggleDifficult(phrase.id)} aria-label={saved ? 'Remove from revision' : 'Save for revision'} title={saved ? 'Saved for revision' : 'Save for revision'}><Icon name={saved ? 'check' : 'quiz'} /></button></div></div>
        <div className="focus-phrase-copy"><p className="kannada">{phrase.kn}</p><strong>{phrase.tr}</strong><span>{phrase.en}</span></div>
        <div className="usage-grid"><div><small>WHEN TO USE IT</small><p>{phrase.context}</p></div><div><small>TONE & USAGE</small><p>{phrase.guidance}</p></div></div>
        <div className="phrase-navigation"><button className="btn btn-ghost" disabled={phraseIndex === 0} onClick={() => setPhraseIndex((value) => value - 1)}>← Previous</button><div>{lesson.phrases.map((item, index) => <button aria-label={`Go to phrase ${index + 1}`} className={phraseIndex === index ? 'active' : ''} onClick={() => setPhraseIndex(index)} key={item.id}></button>)}</div><button className="btn btn-primary" disabled={phraseIndex === lesson.phrases.length - 1} onClick={() => setPhraseIndex((value) => value + 1)}>Next <Icon name="arrow" size={17} /></button></div>
      </section>
      <aside className="culture-note"><div className="icon-orb"><Icon name="star" /></div><div><strong>Language & culture note</strong><p>{lesson.tip}</p></div></aside>
      {notice && <div className="success-notice" role="status"><Icon name="check" /> {notice}</div>}

      {showCelebration && (
  <div
    className="celebration-overlay"
    role="dialog"
    aria-modal="true"
    aria-labelledby="celebration-title"
  >
    <div className="celebration-confetti" aria-hidden="true">
      {Array.from({ length: 24 }, (_, index) => (
        <span
          key={index}
          style={{ '--confetti-index': index }}
        />
      ))}
    </div>

    <div className="celebration-card">
      <div className="celebration-trophy">🎉</div>
      <p className="eyebrow">MISSION COMPLETE</p>
      <h2 id="celebration-title">ಚೆನ್ನಾಗಿದೆ!</h2>
      <h3>Lesson Completed!</h3>
      <p>You took another step towards speaking Kannada confidently.</p>

      <div className="celebration-xp">
        <span>⭐</span>
        <strong>+25 XP</strong>
        <small>Experience earned</small>
      </div>

      <button
        className="btn btn-primary"
        onClick={() => setShowCelebration(false)}
      >
        Continue Learning
      </button>
    </div>
  </div>
)}
      <div className="lesson-actions"><button className="btn btn-success" onClick={complete}><Icon name="check" /> {alreadyCompleted ? 'Practise lesson again' : 'Mark lesson complete'}</button><button className="btn btn-primary" onClick={() => navigate('conversation')}>Practise a scenario <Icon name="arrow" /></button></div>
      {alreadyCompleted && <section className="confidence-check card"><div><p className="eyebrow">Quick confidence check</p><h3>How ready do you feel to use these phrases?</h3></div><div>{[['building', 'Still Learning'], ['almost', 'Getting There'], ['confident', 'Ready to Try']].map(([value, label]) => <button className={confidence[lesson.id] === value ? 'selected' : ''} onClick={() => onConfidence(lesson.id, value)} key={value}>{label}{confidence[lesson.id] === value && <Icon name="check" size={15} />}</button>)}</div></section>}
      <div className="lesson-after-grid">
        <LessonQuiz lesson={lesson} previousScore={quizScores[lesson.id]?.score || 0} onFinish={onLessonQuizFinish} />
        <section><div className="section-title"><div><p className="eyebrow">Continue this path</p><h2>Related lessons</h2></div></div><div className="related-lessons">{related.map((item) => <LessonCard lesson={item} completed={completedLessons.includes(item.id)} onOpen={() => setSelectedLesson(item.id)} key={item.id} />)}</div></section>
      </div>
    </main>
  )
}
