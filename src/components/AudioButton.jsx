
import { useEffect, useRef, useState } from 'react'
import Icon from './Icon'
import { audioFilesByText } from '../data/audioManifest'
import {
  getKannadaVoiceStatus,
  speakKannada,
  speakEnglish,
  subscribeToKannadaVoices,
} from '../utils/speech'


const messages = {
  unsupported: 'Your browser does not support speech playback.',
  'voices-loading': 'Speech voices are loading. Please try again.',
  'voice-unavailable':
    'Kannada pronunciation is not available for this phrase on your device yet.',
  'empty-text': 'There is no pronunciation text to play.',
  'playback-error': 'Audio could not play. Please try again.',
}

export default function AudioButton({
  text,
  label = 'Hear pronunciation',
  language = 'kn',
}) {
  const [voiceStatus, setVoiceStatus] = useState(
    () => getKannadaVoiceStatus()
  )
  const [playing, setPlaying] = useState(false)
  const [message, setMessage] = useState('')
  const cancelPlayback = useRef(null)
  const mounted = useRef(false)
  const requestId = useRef(0)

  useEffect(() => {
    mounted.current = true
    const unsubscribe = subscribeToKannadaVoices((status) => {
      if (mounted.current) setVoiceStatus(status)
    })

    return () => {
      mounted.current = false
      requestId.current += 1
      cancelPlayback.current?.()
      cancelPlayback.current = null
      unsubscribe()
    }
  }, [])

  useEffect(() => {
    setMessage('')
    setPlaying(false)
    return () => {
      requestId.current += 1
      cancelPlayback.current?.()
      cancelPlayback.current = null
    }
  }, [text])

  const stop = () => {
    requestId.current += 1
    cancelPlayback.current?.()
    cancelPlayback.current = null
    setPlaying(false)
  }

  const play = async () => {
    if (typeof text !== 'string' || !text.trim()) {
      setMessage(messages['empty-text'])
      return
    }

    stop()
    const thisRequest = ++requestId.current
    setMessage('')

    const phrase = text.trim()
    const audioPath = language === 'kn'
  ? audioFilesByText[text.trim()]
  : null

    if (audioPath) {
      const audio = new Audio(audioPath)
      let finished = false

      const cleanup = () => {
        if (finished) return
        finished = true
        audio.onended = null
        audio.onerror = null
        audio.pause()
        audio.currentTime = 0
      }

      cancelPlayback.current = cleanup
      audio.onended = () => {
        if (thisRequest !== requestId.current) return
        cancelPlayback.current = null
        setPlaying(false)
      }

      audio.onerror = () => {
        if (thisRequest !== requestId.current) return
        cancelPlayback.current = null
        setPlaying(false)
        setMessage('Could not play the Kannada audio file. Please try again.')
      }

      try {
        await audio.play()
        if (mounted.current && thisRequest === requestId.current) {
          setPlaying(true)
        }
      } catch {
        if (thisRequest === requestId.current) {
          cancelPlayback.current = null
          setPlaying(false)
          setMessage('Audio playback failed. Please try again.')
        }
      }
      return
    }

    const speak = language === 'en' ? speakEnglish : speakKannada

const result = speak(phrase, {
      onStart: () => {
        if (mounted.current && thisRequest === requestId.current) {
          setPlaying(true)
        }
      },
      onFinish: () => {
        if (thisRequest !== requestId.current) return
        cancelPlayback.current = null
        if (mounted.current) setPlaying(false)
      },
      onError: () => {
        if (thisRequest !== requestId.current) return
        cancelPlayback.current = null
        if (mounted.current) {
          setPlaying(false)
          setMessage(messages['playback-error'])
        }
      },
    })

    if (!result.ok) {
      setPlaying(false)
      setMessage(
        messages[result.reason] ||
          'Kannada pronunciation is not available right now.'
      )
      return
    }

    cancelPlayback.current = result.cancel
  }

  return (
    <div className="audio-control" data-voice-status={voiceStatus}>
      <button
        type="button"
        className={`icon-button audio-button ${playing ? 'playing' : ''}`}
        onClick={playing ? stop : play}
        aria-label={
          playing ? `Stop pronunciation: ${text}` : `${label}: ${text}`
        }
        aria-pressed={playing}
        title={playing ? 'Stop pronunciation' : label}
      >
        <Icon name="volume" />
      </button>

      {message && (
        <div className="audio-message" role="status">
          {message}
        </div>
      )}
    </div>
  )
}
