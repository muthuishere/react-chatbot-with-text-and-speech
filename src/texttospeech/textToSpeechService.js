export function TextToSpeechService() {
  this.utterance = null
  this.onEnd = (evt) => {}
  this.onStart = (evt) => {}
  this.onError = (evt) => {}
}

function getSpeechSynthesisUtterance(textToSpeech) {
  return new window.SpeechSynthesisUtterance(textToSpeech)
}

TextToSpeechService.prototype.speak = function (textToSpeech) {
  this.utterance = getSpeechSynthesisUtterance(textToSpeech)
  this.utterance.addEventListener('end', (evt) => this.onEnd(evt))
  this.utterance.addEventListener('start', (evt) => this.onStart(evt))
  this.utterance.addEventListener('error', (evt) => this.onError(evt))
  getSpeechSynthesis().speak(this.utterance)
}
TextToSpeechService.prototype.getVoices = function () {
  return getSpeechSynthesis()
    .getVoices()
    .map((voice) => {
      const defaultSuffix = voice.default ? '-Default' : ''
      const label = `${voice.name} (${voice.lang}) ${defaultSuffix}`
      return {
        name: voice.name,
        lang: voice.lang,
        label
      }
    })
}

function getSpeechSynthesis() {
  return window.speechSynthesis
}

TextToSpeechService.prototype.stop = function () {
  this.onEnd('STOPPED')
  if (getSpeechSynthesis().speaking) getSpeechSynthesis().cancel()
}
