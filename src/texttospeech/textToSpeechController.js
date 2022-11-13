import { TextToSpeechService } from './textToSpeechService'
import { setSpeaking, updateTextToSpeechStatus } from './textToSpeechDispatcher'

export function speak(textToSpeech) {
  const textToSpeechService = new TextToSpeechService()

  textToSpeechService.onStart = (s) => {
    setSpeaking(true)
    updateTextToSpeechStatus('STARTED')
  }
  textToSpeechService.onEnd = (s) => {
    setSpeaking(false)
    updateTextToSpeechStatus('END')
  }
  textToSpeechService.onError = (evt) => {
    setSpeaking(false)
    updateTextToSpeechStatus('ERROR')
    // showErrorNotification(evt.error)
  }
  if (textToSpeech) {
    textToSpeechService.speak(textToSpeech)
  }
  return {
    cancel: () => {
      textToSpeechService.stop()
    }
  }
}
