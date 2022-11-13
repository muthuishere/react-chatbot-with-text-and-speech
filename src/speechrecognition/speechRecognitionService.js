export function SpeechRecognitionService() {
  this.status = 'NONE'
  this.error = null
  this.paused = false
  this.stopped = false
  this.transcript = ''
  this.onStart = () => {}
  this.onEnd = () => {}
  this.onNoMatch = () => {}
  this.onSpeechStart = () => {}
  this.onSpeechEnd = () => {}
  this.onError = () => {}
  this.onResult = () => {}
}

// Invalid speechend  and end events => restart recognition
//
// On Chat Response received
// if enabled
// stop recognition and resume on after outgoing message
// stop recognition and resume on speak end

// state of mike
// enabled
// disabled
// enabled-cannot-listen

function getWebkitSpeechRecognition() {
  return new window.webkitSpeechRecognition()
}

SpeechRecognitionService.prototype.start = function () {
  this.recognition = getWebkitSpeechRecognition()
  this.recognition.onstart = this.onStart.bind(this)
  this.recognition.onend = (evt) => {
    if (this.paused == false && this.stopped == false && this.error == null)
      this.onEnd(evt)
  }
  this.recognition.onerror = (inp) => {
    const validErrors = inp.error === 'aborted' || inp.error === 'no-speech'
    if (this.paused == false && this.stopped == false && !validErrors) {
      this.onError(inp)
      this.error = inp.error
    }
  }
  this.recognition.onnomatch = this.onNoMatch.bind(this)
  this.recognition.onspeechstart = this.onSpeechStart.bind(this)
  this.recognition.onspeechend = this.onSpeechEnd.bind(this)
  this.recognition.onresult = (evt) => {
    this.transcript = evt.results[0][0].transcript
    this.onResult(this.transcript)
  }

  this.recognition.continuous = false
  this.recognition.interimResults = true
  this.recognition.lang = 'en-US'

  this.recognition.start()
}

SpeechRecognitionService.prototype.abort = function () {
  if (this.recognition) this.recognition.abort()
}

SpeechRecognitionService.prototype.pause = function () {
  this.paused = true
  if (this.recognition) this.recognition.abort()
}

SpeechRecognitionService.prototype.stop = function () {
  this.stopped = true
  if (this.recognition) this.recognition.abort()
}
