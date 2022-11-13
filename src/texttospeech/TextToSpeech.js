import React, { useEffect, useState } from 'react'

import { speak } from './textToSpeechController'
import {
  disableTextToSpeech,
  enableTextToSpeech
} from './textToSpeechDispatcher'
import { useGlobalState } from '../config'

export function TextToSpeechDisabledPanel() {
  // eslint-disable-next-line no-unused-vars
  const [_, setLastReceivedMessage] = useGlobalState('lastreceivedmessage')

  return (
    <button
      type='button'
      className='btn btn-secondary'
      aria-label='start-speech'
      onClick={() => {
        setLastReceivedMessage('')
        enableTextToSpeech()
      }}
      title='Click to Enable Speech'
    >
      {' '}
      <i className='fa-solid fa-volume-xmark' />
    </button>
  )
}
export function TextToSpeechEnabledPanel() {
  const [lastreceivedmessage] = useGlobalState('lastreceivedmessage')

  useEffect(() => {
    const handler = speak(lastreceivedmessage)
    return () => {
      handler.cancel()
    }
  }, [lastreceivedmessage])

  return (
    <button
      type='button'
      className='btn btn-primary'
      aria-label='stop-speech'
      onClick={() => disableTextToSpeech()}
      title='Click to Disable Speech'
    >
      <i className='fa-solid fa-volume-high' />
    </button>
  )
}

export function TextToSpeech() {
  const [texttospeech] = useGlobalState('texttospeech')
  const [enableSpeech, setEnableSpeech] = useState(false)

  useEffect(() => {
    setEnableSpeech(texttospeech.enabled)
  }, [texttospeech])

  return (
    <span className='me-3'>
      {enableSpeech ? (
        <TextToSpeechEnabledPanel />
      ) : (
        <TextToSpeechDisabledPanel />
      )}
    </span>
  )
}
