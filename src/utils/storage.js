const STORAGE_KEY = 'kannada-mitra-progress-v1'

export const initialProgress = {
  started: false,
  profile: {
    nickname: '',
    level: 'beginner',
    goal: 'food',
    duration: 10,
  },
  xp: 0,
  streak: 0,
  completedLessons: [],
  confidence: {},
  quizScores: {},
  revisionQuestionIds: [],
  difficultPhraseIds: [],
  favourites: [],
  conversationComplete: false,
  completedConversations: [],
  daily: {
    date: null,
    learned: false,
    practised: false,
    quizzed: false,
    challenge: false,
  },
  completedChallenges: [],
  achievements: [],
  lastActive: null,
}

export function loadProgress() {
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY))
    const legacyGoals = { everyday: 'food', culture: 'shopping' }
    const profile = saved ? { ...initialProgress.profile, ...saved.profile } : initialProgress.profile
    profile.goal = legacyGoals[profile.goal] || profile.goal
    if (profile.duration === 20) profile.duration = 15
    const legacyLessonIds = { food: 'food-ordering-basics', transport: 'transport-auto', shopping: 'shopping-prices', college: 'college-introductions' }
    const completedLessons = (saved?.completedLessons || []).map((id) => legacyLessonIds[id] || id)
    const confidence = Object.fromEntries(Object.entries(saved?.confidence || {}).map(([id, value]) => [legacyLessonIds[id] || id, value]))
    const difficultPhraseIds = (saved?.difficultPhraseIds || []).map((id) => {
      const match = id.match(/^(food|transport|shopping|college)-(\d+)$/)
      return match ? `${legacyLessonIds[match[1]]}-${match[2]}` : id
    })
    const completedConversations = saved?.completedConversations?.length
      ? saved.completedConversations
      : saved?.conversationComplete ? ['food'] : []
    return saved ? {
      ...initialProgress,
      ...saved,
      profile,
      completedLessons: [...new Set(completedLessons)],
      confidence,
      difficultPhraseIds: [...new Set(difficultPhraseIds)],
      completedConversations,
      daily: { ...initialProgress.daily, ...saved.daily },
    } : initialProgress
  } catch {
    return initialProgress
  }
}

export function saveProgress(progress) {
  const quizScores = Object.values(progress.quizScores || {}).map((item) => item.score || 0)
  const achievements = [
    progress.xp > 0 && 'first-steps',
    progress.completedLessons.length >= 2 && 'lesson-learner',
    progress.completedLessons.length >= 8 && 'library-explorer',
    progress.completedConversations.length > 0 && 'conversation-starter',
    Math.max(0, ...quizScores) >= 4 && 'quiz-whiz',
    progress.favourites.length >= 5 && 'phrase-collector',
  ].filter(Boolean)
  localStorage.setItem(STORAGE_KEY, JSON.stringify({ ...progress, achievements: [...new Set([...(progress.achievements || []), ...achievements])] }))
}

export function clearProgress() {
  localStorage.removeItem(STORAGE_KEY)
}

export function initializeDailyProgress(progress) {
  const today = new Date().toISOString().slice(0, 10)
  const daily = progress.daily?.date === today
    ? progress.daily
    : { ...initialProgress.daily, date: today }
  return { ...progress, daily }
}

export function recordLearningActivity(progress) {
  const initialized = initializeDailyProgress(progress)
  const today = initialized.daily.date
  if (initialized.lastActive === today) return initialized

  const yesterday = new Date(Date.now() - 86400000).toISOString().slice(0, 10)
  return {
    ...initialized,
    streak: initialized.lastActive === yesterday ? initialized.streak + 1 : 1,
    lastActive: today,
  }
}
