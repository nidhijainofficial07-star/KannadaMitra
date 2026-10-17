import Icon from '../components/Icon'
import { lessons } from '../data/lessons'
import './Progress.css'

export default function Progress({ progress, navigate, openLesson }) {
  const bestScore = Math.max(0, ...Object.values(progress.quizScores).map((item) => item.score))
  const levelLabels = {
    beginner: 'Beginner · ಹೊಸಬರು',
    some: 'Some Kannada · ಸ್ವಲ್ಪ ಗೊತ್ತು',
    returning: 'Returning learner · ಮತ್ತೆ ಕಲಿಯುವವರು',
  }
  const achievements = [
    { icon: 'star', title: 'First steps', text: 'Earn your first XP', unlocked: progress.xp > 0 },
    { icon: 'learn', title: 'Lesson learner', text: 'Complete two lessons', unlocked: progress.completedLessons.length >= 2 },
    { icon: 'chat', title: 'Conversation starter', text: 'Finish a roleplay', unlocked: progress.conversationComplete },
    { icon: 'trophy', title: 'Quiz whiz', text: 'Score 4 or more', unlocked: bestScore >= 4 },
  ]
  const confidenceLabels = { building: 'Still Learning', almost: 'Getting There', confident: 'Ready to Try' }

  return (
    <main className="app-shell">
      <div className="page-header"><div><p className="eyebrow">Your learning journey</p><h1>See how far you’ve come</h1><p className="subtitle">Every phrase learned is progress worth celebrating.</p></div></div>
      <section className="progress-hero card">
        <div><span className="progress-avatar kannada">ಕ</span><div><p>Your current level</p><h2>{levelLabels[progress.profile.level] || levelLabels.beginner}</h2><span>{progress.xp} lifetime XP</span></div></div>
        <div className="level-progress"><div><span>Level progress</span><strong>{progress.xp % 100}/100 XP</strong></div><div className="progress-track"><div className="progress-fill" style={{ width: `${progress.xp % 100}%` }}></div></div></div>
      </section>
      <section className="progress-stats">
        <div className="card"><Icon name="flame" /><strong>{progress.streak}</strong><span>Day streak</span></div>
        <div className="card"><Icon name="learn" /><strong>{progress.completedLessons.length}/{lessons.length}</strong><span>Lessons complete</span></div>
        <div className="card"><Icon name="quiz" /><strong>{bestScore || '—'}</strong><span>Best quiz score</span></div>
        <div className="card"><Icon name="chat" /><strong>{progress.completedConversations.length}/8</strong><span>Scenarios complete</span></div>
        <div className="card"><Icon name="heart" /><strong>{progress.favourites.length}</strong><span>Saved phrases</span></div>
      </section>
      <div className="progress-columns">
        <section><div className="section-title"><h2>Lesson progress</h2></div><div className="lesson-progress-list card">{lessons.map((lesson) => { const done = progress.completedLessons.includes(lesson.id); const rating = progress.confidence[lesson.id]; return <button key={lesson.id} onClick={() => openLesson(lesson.id)}><span className={done ? 'done' : ''}><Icon name={done ? 'check' : 'learn'} /></span><div><strong>{lesson.title}</strong><small className="kannada">{lesson.kannadaTitle}</small></div><em>{rating ? confidenceLabels[rating] : done ? 'Add confidence' : 'Start'}</em></button> })}</div></section>
        <section><div className="section-title"><h2>Achievements</h2></div><div className="achievement-list">{achievements.map((item) => <div className={`achievement card ${item.unlocked ? 'unlocked' : ''}`} key={item.title}><div><Icon name={item.icon} /></div><span><strong>{item.title}</strong><small>{item.text}</small></span>{item.unlocked && <Icon name="check" size={17} />}</div>)}</div></section>
      </div>
      <div className="next-step"><div><p className="eyebrow">Keep going</p><h2>Your next phrase is waiting</h2></div><button className="btn btn-primary" onClick={() => navigate('learn')}>Continue learning <Icon name="arrow" /></button></div>
    </main>
  )
}
