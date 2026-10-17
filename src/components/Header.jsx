import Icon from './Icon'
import './Header.css'

const navItems = [
  ['dashboard', 'home', 'Home'],
  ['learn', 'learn', 'Learn'],
  ['conversation', 'chat', 'Practise'],
  ['quiz', 'quiz', 'Quiz'],
  ['progress', 'chart', 'Progress'],
]

export default function Header({ page, navigate, xp, streak }) {
  return (
    <>
      <header className="topbar">
        <button className="brand" onClick={() => navigate('dashboard')} aria-label="KannadaMitra home">
          <span className="brand-mark kannada">ಕ</span>
          <span><strong>KannadaMitra</strong><small>Your Friendly Guide to Kannada</small></span>
        </button>
        <div className="header-stats">
          <span><Icon name="flame" size={18} /> {streak} day</span>
          <span><Icon name="star" size={18} /> {xp} XP</span>
          <button className="profile-button" onClick={() => navigate('profile')} aria-label="Edit profile and preferences"><Icon name="user" size={18} /></button>
        </div>
      </header>
      <nav className="nav-bar" aria-label="Main navigation">
        {navItems.map(([id, icon, label]) => (
          <button key={id} className={page === id ? 'active' : ''} onClick={() => navigate(id)}>
            <Icon name={icon} /><span>{label}</span>
          </button>
        ))}
      </nav>
    </>
  )
}
