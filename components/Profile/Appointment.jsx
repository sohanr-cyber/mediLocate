import React from 'react'
import AppointmentCard from './AppointmentCard'
import styles from './../../styles/Profile/Appointment.module.css'

const Appointment = ({ items }) => {
  return (
       <div className={styles.wrapper}>
      <b className={styles.title}>
        Appointment List
      </b>
      <p></p>
      <div className={styles.grid}>
      {items?.map((b, i) => (
        <AppointmentCard item={b} />
      ))}
    </div>
    </div>
  )
}

export default Appointment