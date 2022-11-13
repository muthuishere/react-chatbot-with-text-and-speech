import { useGlobalState } from '../config'
import React, { useEffect, useRef } from 'react'
import { IncomingMessage, OutGoingMessage } from './components/MessagePanels'
import styles from '../styles.module.css'

export function MessageContainer() {
  const bottomRef = useRef(null)
  const [messages] = useGlobalState('messages')
  const [config] = useGlobalState('config')

  useEffect(() => {
    if (bottomRef.current && bottomRef.current.scrollIntoView)
      bottomRef.current.scrollIntoView({ behavior: 'smooth' })
  }, [messages])
  // 50vw
  return (
    <div className={styles.msg_history}>
      {messages.map((message, index) => {
        if (message.type === 'incoming') {
          return (
            <IncomingMessage
              imageUrl={config.botImageUrl}
              message={message.message}
              time={message.time}
              key={index}
            />
          )
        } else {
          return (
            <OutGoingMessage
              message={message.message}
              time={message.time}
              key={index}
            />
          )
        }
      })}
      <div ref={bottomRef} />
    </div>
  )
}
