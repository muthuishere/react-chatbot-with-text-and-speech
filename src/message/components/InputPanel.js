import React, { useEffect, useState } from 'react'
import { useGlobalState } from '../../config'
import { addOutgoingMessage } from '../messageService'
import styles from '../../styles.module.css'

export function SpokenInputPanel(props) {
  const [speechrecognition] = useGlobalState('speechrecognition')

  useEffect(() => {
    const { status, transcript } = speechrecognition

    // console.log(`status: ${status} transcript: ${transcript} enabled: ${enabled}`);

    props.onChangeTranscript(transcript)

    if (status === 'SPEECH-COMPLETED') {
      // addOutgoingMessage(transcript)
      props.onSendData(transcript)
      props.onClearInput()
    }
  }, [speechrecognition])

  return <span />
}

export function InputPanel({ onResponse }) {
  const [inputValue, setInputValue] = useState('')
  const [inputPlaceHolder, setInputPlaceHolder] = useState('')
  const [speechrecognition] = useGlobalState('speechrecognition')
  const [config] = useGlobalState('config')

  useEffect(() => {
    console.log('config', config)
    console.log('config', config.inputBoxPlaceholder)
    setInputPlaceHolder(config.inputBoxPlaceholder)
  }, [config])

  function onSendClicked() {
    sendMessageForProcessing(inputValue)
    setInputValue('')
  }
  function onDataReceivedAsSpeech(msg) {
    sendMessageForProcessing(msg)
    setInputValue('')
  }
  function sendMessageForProcessing(msg) {
    if (msg.length > 0) {
      addOutgoingMessage(msg)
      onResponse(msg)
    }
  }

  const handleKeyDown = (evt) => {
    if (evt.key === 'Enter') {
      onSendClicked()
    }
  }
  const onChangeHandler = (event) => {
    event.preventDefault()
    setInputValue(event.currentTarget.value)
  }

  return (
    <div className='row'>
      <div className='col-11'>
        <input
          className={styles.sendInput}
          type='text'
          aria-label='send-data'
          placeholder={inputPlaceHolder}
          value={inputValue}
          onChange={(evt) => onChangeHandler(evt)}
          onKeyDown={(evt) => handleKeyDown(evt)}
        />
      </div>
      <div className='col-1'>
        <button
          aria-label='submit-data'
          className={styles.msg_send_btn}
          onClick={(evt) => onSendClicked(evt)}
          type='button'
        >
          <i className='fa fa-paper-plane' aria-hidden='true' />
        </button>
      </div>
      {speechrecognition.enabled && (
        <SpokenInputPanel
          onClearInput={() => setInputValue('')}
          onChangeTranscript={(txt) => setInputValue(txt)}
          onSendData={(txt) => {
            onDataReceivedAsSpeech(txt)
          }}
        />
      )}
    </div>
    //
    // <div className={styles.type_msg}>
    //   <div className={styles.send_panel}>
    //     <input
    //       className={styles.write_msg}
    //       type='text'
    //       aria-label='send-data'
    //       placeholder='Type a message'
    //       value={inputValue}
    //       onChange={(evt) => onChangeHandler(evt)}
    //       onKeyDown={(evt) => handleKeyDown(evt)}
    //     />
    //     <button
    //       aria-label='submit-data'
    //       className={styles.msg_send_btn}
    //       onClick={(evt) => onSendClicked(evt)}
    //       type='button'
    //     >
    //       <i className='fa fa-paper-plane' aria-hidden='true' />
    //     </button>
    //   </div>
    //   {speechrecognition.enabled && (
    //     <SpokenInputPanel
    //       onClearInput={() => setInputValue('')}
    //       onChangeTranscript={(txt) => setInputValue(txt)}
    //     />
    //   )}
    // </div>
  )
}
