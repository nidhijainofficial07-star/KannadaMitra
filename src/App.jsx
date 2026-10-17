import { lazy, Suspense, useEffect, useState } from 'react'
import Header from './components/Header'
import Welcome from './pages/Welcome'
import Personalise from './pages/Personalise'
import { clearProgress, initializeDailyProgress, loadProgress, recordLearningActivity, saveProgress } from './utils/storage'

const Dashboard = lazy(() => import('./pages/Dashboard'))
const Learn = lazy(() => import('./pages/Learn'))
const Conversation = lazy(() => import('./pages/Conversation'))
const Quiz = lazy(() => import('./pages/Quiz'))
const Progress = lazy(() => import('./pages/Progress'))
const SurvivalKannada = lazy(() => import('./pages/SurvivalKannada'))
const Favourites = lazy(() => import('./pages/Favourites'))
const Challenge = lazy(() => import('./pages/Challenge'))
const Revision = lazy(() => import('./pages/Revision'))
const HelpMeSay = lazy(() => import('./pages/HelpMeSay'))

const validPages = ['dashboard', 'learn', 'conversation', 'quiz', 'progress', 'survival', 'favourites', 'profile', 'challenge', 'revision', 'help-say']

export default function App() {
  const [progress, setProgress] = useState(() => initializeDailyProgress(loadProgress()))
  const [page, setPage] = useState(() => {
    const initialPage = window.location.hash.slice(1)
    return validPages.includes(initialPage) ? initialPage : 'dashboard'
  })
  const [selectedLesson, setSelectedLesson] = useState(null)
  const [showOnboarding, setShowOnboarding] = useState(false)

  useEffect(() => saveProgress(progress), [progress])
  useEffect(() => {
    const onHashChange = () => {
      const next = window.location.hash.slice(1)
      if (validPages.includes(next)) setPage(next)
    }
    window.addEventListener('hashchange', onHashChange)
    return () => window.removeEventListener('hashchange', onHashChange)
  }, [])

  const navigate = (next) => {
    setPage(next)
    window.location.hash = next
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }
  const start = () => setShowOnboarding(true)
  const saveProfile = (profile) => {
    setProgress((current) => ({ ...current, started: true, profile }))
    setShowOnboarding(false)
    navigate('dashboard')
  }
  const skipOnboarding = () => {
    setProgress((current) => ({ ...current, started: true }))
    setShowOnboarding(false)
    navigate('dashboard')
  }
  const resetAllProgress = () => {
    clearProgress()
    setProgress(initializeDailyProgress(loadProgress()))
    setSelectedLesson(null)
    setShowOnboarding(false)
    setPage('dashboard')
    window.location.hash = ''
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }
  const openLesson = (lessonId) => {
    setSelectedLesson(lessonId)
    navigate('learn')
  }
  const completeLesson = (lessonId) => {
    setProgress((current) => {
      const firstCompletion = !current.completedLessons.includes(lessonId)
      return recordLearningActivity({
        ...current,
        xp: firstCompletion ? current.xp + 25 : current.xp,
        completedLessons: firstCompletion ? [...current.completedLessons, lessonId] : current.completedLessons,
        daily: { ...current.daily, learned: true },
      })
    })
  }
  const setConfidence = (lessonId, value) => setProgress((current) => ({ ...current, confidence: { ...current.confidence, [lessonId]: value } }))
  const completeConversation = (scenarioId) => {
    setProgress((current) => recordLearningActivity({
      ...current,
      conversationComplete: true,
      completedConversations: current.completedConversations.includes(scenarioId) ? current.completedConversations : [...current.completedConversations, scenarioId],
      xp: current.completedConversations.includes(scenarioId) ? current.xp : current.xp + 30,
      daily: { ...current.daily, practised: true },
    }))
  }
  const finishQuiz = (score, total, mistakes) => {
    setProgress((current) => {
      const previous = current.quizScores.everyday?.score || 0
      const earned = Math.max(0, score - previous) * 10
      return recordLearningActivity({
        ...current,
        xp: current.xp + earned,
        quizScores: { ...current.quizScores, everyday: { score: Math.max(score, previous), total, date: new Date().toISOString() } },
        revisionQuestionIds: [...new Set([...current.revisionQuestionIds, ...mistakes])],
        daily: { ...current.daily, quizzed: true },
      })
    })
  }
  const finishLessonQuiz = (lessonId, score, total, mistakes) => {
    setProgress((current) => {
      const previous = current.quizScores[lessonId]?.score || 0
      const earned = Math.max(0, score - previous) * 5
      return recordLearningActivity({
        ...current,
        xp: current.xp + earned,
        quizScores: { ...current.quizScores, [lessonId]: { score: Math.max(score, previous), total, date: new Date().toISOString() } },
        difficultPhraseIds: [...new Set([...current.difficultPhraseIds, ...mistakes])],
        daily: { ...current.daily, quizzed: true },
      })
    })
  }
  const completeChallenge = (challengeId) => {
    setProgress((current) => current.daily.challenge ? current : recordLearningActivity({
      ...current,
      xp: current.xp + 20,
      daily: { ...current.daily, challenge: true },
      completedChallenges: [...current.completedChallenges, { id: challengeId, date: current.daily.date }],
    }))
  }
  const masterRevision = (questionId) => setProgress((current) => recordLearningActivity({ ...current, revisionQuestionIds: current.revisionQuestionIds.filter((id) => id !== questionId) }))
  const toggleDifficultPhrase = (phraseId) => setProgress((current) => ({
    ...current,
    difficultPhraseIds: current.difficultPhraseIds.includes(phraseId)
      ? current.difficultPhraseIds.filter((id) => id !== phraseId)
      : [...current.difficultPhraseIds, phraseId],
  }))
  const masterDifficultPhrase = (phraseId) => setProgress((current) => recordLearningActivity({ ...current, difficultPhraseIds: current.difficultPhraseIds.filter((id) => id !== phraseId) }))
  const toggleFavourite = (id) => {
    setProgress((current) => ({ ...current, favourites: current.favourites.includes(id) ? current.favourites.filter((item) => item !== id) : [...current.favourites, id] }))
  }

  if (!progress.started && !showOnboarding) return <Welcome onStart={start} />
  if (!progress.started && showOnboarding) return <Personalise profile={progress.profile} onSave={saveProfile} onSkip={skipOnboarding} />

  const pageProps = { progress, navigate, openLesson }
  let content
  if (page === 'learn') content = <Learn selectedLesson={selectedLesson} setSelectedLesson={setSelectedLesson} completedLessons={progress.completedLessons} confidence={progress.confidence} difficultPhraseIds={progress.difficultPhraseIds} quizScores={progress.quizScores} onComplete={completeLesson} onConfidence={setConfidence} onToggleDifficult={toggleDifficultPhrase} onLessonQuizFinish={finishLessonQuiz} navigate={navigate} />
  else if (page === 'conversation') {
    const goalScenario = { travel: 'transport', food: 'food', shopping: 'shopping', college: 'college' }
    const initialCategory = selectedLesson?.split('-')[0] || goalScenario[progress.profile.goal] || 'food'
    content = <Conversation onComplete={completeConversation} navigate={navigate} completedScenarios={progress.completedConversations} initialCategory={initialCategory} />
  }
  else if (page === 'quiz') content = <Quiz onFinish={finishQuiz} navigate={navigate} previousBest={progress.quizScores.everyday?.score || 0} />
  else if (page === 'progress') content = <Progress {...pageProps} />
  else if (page === 'survival') content = <SurvivalKannada favourites={progress.favourites} toggleFavourite={toggleFavourite} />
  else if (page === 'favourites') content = <Favourites favourites={progress.favourites} toggleFavourite={toggleFavourite} navigate={navigate} />
  else if (page === 'profile') content = <Personalise editing profile={progress.profile} onSave={(profile) => saveProfile(profile)} onSkip={() => navigate('dashboard')} onReset={resetAllProgress} />
  else if (page === 'challenge') content = <Challenge completed={progress.daily.challenge} onComplete={completeChallenge} navigate={navigate} />
  else if (page === 'revision') content = <Revision questionIds={progress.revisionQuestionIds} phraseIds={progress.difficultPhraseIds} onMaster={masterRevision} onMasterPhrase={masterDifficultPhrase} navigate={navigate} />
  else if (page === 'help-say') content = <HelpMeSay favourites={progress.favourites} toggleFavourite={toggleFavourite} />
  else content = <Dashboard {...pageProps} />

  return <div className="app"><Header page={page} navigate={navigate} xp={progress.xp} streak={progress.streak} /><Suspense fallback={<main className="app-shell"><div className="page-loader" role="status"><span></span><p>Opening your lesson…</p></div></main>}>{content}</Suspense></div>
}
