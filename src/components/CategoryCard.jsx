import Icon from './Icon'
import './CategoryCard.css'

export default function CategoryCard({ category, lessons, completedLessons, onOpen }) {
  const completed = lessons.filter((lesson) => completedLessons.includes(lesson.id)).length
  const percent = Math.round((completed / lessons.length) * 100)
  return (
    <button className={`category-card card accent-${category.color}`} onClick={onOpen}>
      <div className="category-card-top"><span className="icon-orb"><Icon name={category.id === 'health' ? 'heart' : category.id === 'emergency' ? 'target' : category.id === 'college' ? 'learn' : 'phrase'} /></span><span className="category-count">{lessons.length} lessons</span></div>
      <h3>{category.title}</h3>
      <p className="kannada">{category.kn}</p>
      <small>{category.description}</small>
      <div className="category-progress"><div><span>{completed} complete</span><strong>{percent}%</strong></div><div className="progress-track"><div className="progress-fill" style={{ width: `${percent}%` }}></div></div></div>
    </button>
  )
}
