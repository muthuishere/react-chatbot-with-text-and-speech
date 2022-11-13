import { setGlobalState } from '../config'

function addMessageWithType(message, typeOfMessage) {
  setGlobalState('messages', (prev) => [
    ...prev,
    { message, time: new Date(), type: typeOfMessage }
  ])
}

export function addIncomingMessage(message) {
  addMessageWithType(message, 'incoming')
  setGlobalState('lastreceivedmessage', message)
}

export function addOutgoingMessage(message) {
  addMessageWithType(message, 'outgoing')
}

export function resetMessages() {
  setGlobalState('messages', [])
}
