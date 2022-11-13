import React, { useEffect } from 'react'

import styles from './styles.module.css'
import { InputPanel } from './message/components/InputPanel'
import { MessageContainer } from './message/MessageContainer'
import { SpeechRecognizerAndTTSPanel } from './SpeechRecognizerAndTTSPanel'

import { useGlobalState } from './config'
import { addIncomingMessage } from './message/messageService'
// ChatBotComponent

// Options
/*
{
  speechRecognition: true,
  textToSpeech: true,
  textBox: true,
  textBoxPlaceholder: 'Type your message here',
  sendButton:{
    text: 'Send',
    className: 'send-button'
  },
  textBox:{
    className: 'text-box'
  }


  textBoxSubmitButtonClassName: 'chatbot__submit-button',



}

 */

export const ChatBotComponent = ({ handleMessage, options }) => {
  const [config, setConfig] = useGlobalState('config')

  const [textToSpeechOptions, setTextToSpeechOptions] =
    useGlobalState('texttospeech')
  const [speechrecognitionOptions, setSpeechrecognitionOptions] =
    useGlobalState('speechrecognition')

  // speechrecognition.enabled

  const callBackendAPI = async (text) => {
    if (handleMessage) {
      const response = await handleMessage({ data: text })
      addIncomingMessage(response.text)
    } else {
      const response = await Promise.resolve({ text: 'echoing ' + text })
      addIncomingMessage(response.text)
    }

    // now add the response to incoming messages
  }

  useEffect(() => {
    const mergedOptions = { ...config, ...options }
    const formattedOptions = {
      ...mergedOptions,
      textToSpeech: String(mergedOptions.textToSpeech) === 'true',
      speechRecognition: String(mergedOptions.speechRecognition) === 'true'
    }

    setConfig(formattedOptions)

    setTextToSpeechOptions({
      ...textToSpeechOptions,
      enabled: formattedOptions.textToSpeech
    })
    setSpeechrecognitionOptions({
      ...speechrecognitionOptions,
      enabled: formattedOptions.speechRecognition
    })
  }, [options])

  return (
    <div className={styles.appcontainer}>
      <SpeechRecognizerAndTTSPanel />
      <div className={styles.messageDiv}>
        <MessageContainer className={styles.messageContainer} />
      </div>
      <InputPanel onResponse={callBackendAPI} />
    </div>
  )
}
