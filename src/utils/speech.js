
let activePlayback = null
const voiceSubscribers = new Set()
let voicesListenerAdded = false

function getSpeechApi() {
  if (
    typeof window === 'undefined' ||
    !window.speechSynthesis ||
    typeof window.SpeechSynthesisUtterance !== 'function'
  ) {
    return null
  }

  return {
    synthesis: window.speechSynthesis,
    Utterance: window.SpeechSynthesisUtterance,
  }
}

function getVoices() {
  const api = getSpeechApi()
  if (!api) return []

  try {
    return api.synthesis.getVoices()
  } catch (error) {
    console.error('Unable to load speech voices:', error)
    return []
  }
}

function findKannadaVoice(voices) {
  return (
    voices.find((voice) => (voice.lang || '').toLowerCase() === 'kn-in') ||
    voices.find((voice) => {
      const language = (voice.lang || '').toLowerCase()
      return language === 'kn' || language.startsWith('kn-')
    }) ||
    null
  )
}

export function getKannadaVoiceStatus() {
  const api = getSpeechApi()

  if (!api) return 'unsupported'

  const voices = getVoices()

  if (voices.length === 0) return 'loading'

  return findKannadaVoice(voices) ? 'available' : 'unavailable'
}

function notifyVoiceSubscribers() {
  const status = getKannadaVoiceStatus()

  voiceSubscribers.forEach((callback) => {
    try {
      callback(status)
    } catch (error) {
      console.error('Voice status callback failed:', error)
    }
  })
}

function setupVoicesListener() {
  const api = getSpeechApi()

  if (!api || voicesListenerAdded) return

  if (typeof api.synthesis.addEventListener === 'function') {
    api.synthesis.addEventListener('voiceschanged', notifyVoiceSubscribers)
  } else {
    api.synthesis.onvoiceschanged = notifyVoiceSubscribers
  }

  voicesListenerAdded = true
}

export function subscribeToKannadaVoices(callback) {
  voiceSubscribers.add(callback)
  setupVoicesListener()
  callback(getKannadaVoiceStatus())

  return () => {
    voiceSubscribers.delete(callback)
  }
}

export function speakKannada(text, callbacks = {}) {
  const api = getSpeechApi()

  if (!api) {
    return { ok: false, reason: 'unsupported' }
  }

  if (typeof text !== 'string' || !text.trim()) {
    return { ok: false, reason: 'empty-text' }
  }

  const voices = getVoices()
  const kannadaVoice = findKannadaVoice(voices)

  // Never use an English or Hindi voice to pretend to pronounce Kannada.
  if (!kannadaVoice) {
    return {
      ok: false,
      reason: voices.length === 0 ? 'voices-loading' : 'voice-unavailable',
    }
  }

  stopKannadaSpeech()

  const utterance = new api.Utterance(text.trim())

  utterance.lang = 'kn-IN'
  utterance.voice = kannadaVoice
  utterance.rate = 0.82
  utterance.pitch = 1
  utterance.volume = 1

  let finished = false

  const finish = (callback, value) => {
    if (finished) return

    finished = true

    if (activePlayback?.utterance === utterance) {
      activePlayback = null
    }

    if (typeof callback === 'function') {
      callback(value)
    }
  }

  const cancel = () => {
    if (finished) return

    finished = true

    if (activePlayback?.utterance === utterance) {
      activePlayback = null
    }

    api.synthesis.cancel()
  }

  utterance.onstart = () => {
    if (!finished) callbacks.onStart?.()
  }

  utterance.onend = () => {
    finish(callbacks.onFinish)
  }

  utterance.onerror = (event) => {
    // Cancellation is intentional when the learner changes phrases.
    if (event.error === 'canceled' || event.error === 'interrupted') {
      finish()
      return
    }

    console.error('Kannada speech playback error:', event.error)
    finish(callbacks.onError, event.error)
  }

  activePlayback = { utterance, cancel }

  try {
    api.synthesis.resume()
    api.synthesis.speak(utterance)

    return {
      ok: true,
      cancel,
      voice: kannadaVoice.name,
    }
  } catch (error) {
    console.error('Could not start Kannada speech:', error)

    if (activePlayback?.utterance === utterance) {
      activePlayback = null
    }

    finished = true

    return { ok: false, reason: 'playback-error' }
  }
}

export function stopKannadaSpeech() {
  const api = getSpeechApi()

  if (activePlayback) {
    activePlayback.cancel()
    activePlayback = null
  } else if (api) {
    api.synthesis.cancel()
  }
}


export function speakEnglish(text, callbacks = {}) {
  const api = getSpeechApi()

  if (!api || !text?.trim()) {
    return { ok: false, reason: 'unsupported' }
  }

  try {
    api.synthesis.cancel()

    const utterance = new SpeechSynthesisUtterance(text.trim())
    const voices = api.synthesis.getVoices()

    const englishVoice =
      voices.find(voice => voice.lang.toLowerCase() === 'en-in') ||
      voices.find(voice => voice.lang.toLowerCase().startsWith('en-')) ||
      voices.find(voice => voice.lang.toLowerCase() === 'en')

    utterance.lang = englishVoice?.lang || 'en-US'

    if (englishVoice) {
      utterance.voice = englishVoice
    }

    utterance.rate = 0.9

    utterance.onstart = () => callbacks.onStart?.()
    utterance.onend = () => callbacks.onEnd?.()
    utterance.onerror = event => {
      if (event.error !== 'canceled' && event.error !== 'interrupted') {
        callbacks.onError?.(event)
      }
    }

    api.synthesis.speak(utterance)

    return { ok: true, voice: englishVoice?.name || 'Default English voice' }
  } catch (error) {
    console.error('Could not start English speech:', error)
    return { ok: false, reason: 'playback-error' }
  }
}
