import React from 'react'
import { formattedDateTime } from '../shared/formatter'
import styles from '../../styles.module.css'

export function IncomingMessage(props) {
  return (
    <div className='row w-100'>
      <div className='col-1'>
        <img src={props.imageUrl} className={styles.botImageClass} alt='Bot' />
      </div>
      <div className={'col-11 pull-left ' + styles.received_withd_msg}>
        <p>{props.message}</p>
        <span className={styles.time_date}>
          {' '}
          {formattedDateTime(props.time)}{' '}
        </span>
      </div>
    </div>
    //
    // <div className={styles.incoming_msg}>
    //   <div className={styles.incoming_msg_img}>
    //
    //   </div>
    //   <div className={styles.incoming_msg_text}>
    //     <div className={styles.received_withd_msg}>
    //       <p>{props.message}</p>
    //       <span className={styles.time_date}>
    //         {' '}
    //         {formattedDateTime(props.time)}{' '}
    //       </span>
    //     </div>
    //   </div>
    // </div>
  )
}

export function OutGoingMessage(props) {
  return (
    <div className={styles.outgoing_msg}>
      <div className={styles.sent_msg}>
        <p>{props.message}</p>
        <span className={styles.time_date}>
          {' '}
          {formattedDateTime(props.time)}
        </span>
      </div>
    </div>
  )
}
