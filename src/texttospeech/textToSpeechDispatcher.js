import { getGlobalState, setGlobalState } from '../config'

function setTextToSpeechEnabled(enabled) {
  setGlobalState('texttospeech', (prev) => {
    return {
      ...prev,
      enabled: enabled
    }
  })
}

export function enableTextToSpeech() {
  setTextToSpeechEnabled(true)
}

export function disableTextToSpeech() {
  setTextToSpeechEnabled(false)
}
export function isTextToSpeechEnabled() {
  return getGlobalState('texttospeech').enabled
}

export function updateTextToSpeechStatus(status) {
  setGlobalState('texttospeech', (prev) => {
    return {
      ...prev,
      status: status
    }
  })
}

export function setSpeaking(isSpeaking) {
  setGlobalState('texttospeech', (prev) => {
    return {
      ...prev,
      speaking: isSpeaking
    }
  })
}
