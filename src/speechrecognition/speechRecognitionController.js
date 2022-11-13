import { SpeechRecognitionService } from './speechRecognitionService'

import {
  isSpeechRecognitionStatusEquals,
  resetSpeechRecognition,
  setInterimSpeech,
  setSpeechRecognitionError,
  updateSpeechRecognition,
  updateSpeechRecognitionStatus
} from './speechRecognitionDispatcher'
import { getGlobalSpeakRecognitionState } from '../config'

let speechRecognitionService = null

export function startSpeechRecognition() {
  speechRecognitionService = new SpeechRecognitionService()

  speechRecognitionService.onStart = (event) => {
    // console.log('onStart', event)
    updateSpeechRecognitionStatus('READY')
  }
  speechRecognitionService.onSpeechStart = (event) => {
    // console.log('onSpeechStart', event)
    updateSpeechRecognitionStatus('SPEECH-STARTED')
  }

  speechRecognitionService.onError = (inp) => {
    console.log('onError', inp)
    setSpeechRecognitionError(inp.error)
  }
  speechRecognitionService.onResult = (data) => {
    // console.log('onResult', data)
    if (data) setInterimSpeech(data)
  }
  speechRecognitionService.onSpeechEnd = (data) => {
    // console.log('onSpeechEnd', data)
    if (speechRecognitionService.transcript)
      updateSpeechRecognitionStatus('SPEECH-COMPLETED')
  }

  speechRecognitionService.onEnd = (data) => {
    // On end ends recognition , we need to restart it if there is no Error
    const canRestart =
      !isSpeechRecognitionStatusEquals('ERROR') &&
      getGlobalSpeakRecognitionState().enabled
    if (canRestart) {
      updateSpeechRecognitionStatus('RESTART')
    }
  }
  updateSpeechRecognition({
    enabled: true,
    pauseRecognizing: false,
    status: 'INITIALIZED'
  })

  speechRecognitionService.start()
}

export function stopSpeechRecognition() {
  if (speechRecognitionService) {
    speechRecognitionService.stop()
  }
}
