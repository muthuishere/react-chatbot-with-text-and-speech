import React, { useEffect, useState } from 'react'
import { useGlobalState } from '../config'

import { updateSpeechRecognition } from './speechRecognitionDispatcher'
import {
  startSpeechRecognition,
  stopSpeechRecognition
} from './speechRecognitionController'

export function useRestartSpeechRecognizer() {
  const [speechrecognition] = useGlobalState('speechrecognition')

  const [restart, setRestart] = useState(0)
  useEffect(() => {
    setTimeout(() => {
      if (speechrecognition.status === 'RESTART' && speechrecognition.enabled) {
        // console.log('restart speechrecognition valid')
        setRestart(restart + 1)
      }
    }, 100)
  }, [speechrecognition])

  return [restart]
}

export function SpeechRecognizerEnabledPanel() {
  const [canRestart] = useRestartSpeechRecognizer()

  function onStopSpeechRecognition() {
    // Update State
    updateSpeechRecognition({ enabled: false })
    stopSpeechRecognition()
  }

  useEffect(() => {
    startSpeechRecognition()

    return () => {
      stopSpeechRecognition()
    }
  }, [canRestart])

  return (
    <button
      type='button'
      className='btn btn-success'
      aria-label='stop-listening'
      onClick={() => onStopSpeechRecognition()}
      title='Click to Disable Speech'
    >
      <i className='fa-solid fa-microphone' />
    </button>
  )
}

export function SpeechRecognizer() {
  const [speechrecognition] = useGlobalState('speechrecognition')
  const [speechrecognitionEnabled, setSpeechRecognitionEnabled] =
    useState(false)

  useEffect(() => {
    setSpeechRecognitionEnabled(speechrecognition.enabled)
  }, [speechrecognition])

  // On Error

  if (speechrecognitionEnabled) return <SpeechRecognizerEnabledPanel />
  else
    return (
      <span>
        <button
          type='button'
          className='btn btn-secondary'
          aria-label='start-listening'
          onClick={() => updateSpeechRecognition({ enabled: true })}
          title='Click to Enable Speech'
        >
          {' '}
          <i className='fa-solid fa-microphone-slash' />
        </button>
      </span>
    )
}
