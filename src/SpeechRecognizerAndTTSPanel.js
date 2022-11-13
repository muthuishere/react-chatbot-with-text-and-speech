import { TextToSpeech } from './texttospeech/TextToSpeech'
import { SpeechRecognizer } from './speechrecognition/SpeechRecognizer'
import React, { useEffect, useState } from 'react'
import { useGlobalState } from './config'
import styles from './styles.module.css'

export function useSpeechData() {
  const [speechrecognition] = useGlobalState('speechrecognition')
  const [texttospeech] = useGlobalState('texttospeech')
  const [canSpeechRecognize, setCanSpeechRecognize] = useState(true)

  useEffect(() => {
    const canPauseRecognizing =
      texttospeech.enabled && speechrecognition.enabled && texttospeech.speaking
    setCanSpeechRecognize(!canPauseRecognizing)
  }, [speechrecognition, texttospeech])

  return [canSpeechRecognize]
}

export function SpeechRecognizerAndTTSPanel() {
  const [canSpeechRecognize] = useSpeechData()

  return (
    <div className={styles.speechcontainer}>
      <TextToSpeech />
      {canSpeechRecognize && <SpeechRecognizer />}
    </div>
  )
}
