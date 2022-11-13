import {
  AppInitialState,
  getGlobalSpeakRecognitionState,
  setGlobalState
} from '../config'

/**
 * updateSpeechrecognition should update global state
 * @param inp
 * @returns {void}
 * @Example
 * updateSpeechRecognition({status: "LISTENING",transcript: "sample"} );
 * updateSpeechRecognition({transcript: "sample"} );
 *
 */
export function updateSpeechRecognition(inp) {
  setGlobalState('speechrecognition', (prev) => {
    return {
      ...prev,
      ...inp
    }
  })
}

export function setSpeechRecognitionError(error) {
  updateSpeechRecognition({
    status: 'ERROR',
    error: error,
    enabled: false,
    pauseRecognizing: false
  })
}
export function updateSpeechRecognitionStatus(status) {
  updateSpeechRecognition({ status })
}

export function isSpeechRecognitionStatusEquals(status) {
  return getGlobalSpeakRecognitionState().status === status
}

export function setInterimSpeech(transcript) {
  updateSpeechRecognition({ transcript, status: 'LISTENING' })
}

export function resetSpeechRecognition() {
  updateSpeechRecognition(AppInitialState.speechrecognition)
}
