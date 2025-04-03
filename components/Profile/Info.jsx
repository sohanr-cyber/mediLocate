import React from 'react'
import styles from '../../styles/Profile/Info.module.css'
const Info = ({ profile }) => {
  return (
    <div className={styles.wrapper}>
      <b className={styles.title}>
        About Doctor
      </b>
      <p className={styles.about}>
        {profile.about}
      </p>
      <div className={styles.services}>

        <div className={styles.service}>
          <div className={styles.title}>
            Consultaion Fee
          </div>
          <div className={styles.fee}>
            BDT {profile.consultationFee || 300}
          </div>
        </div>
        <div className={styles.service}>
          <div className={styles.title}>
            Follow-Up Fee
          </div>
          <div className={styles.fee}>
            BDT {profile.followUpFee || 200}
          </div>
        </div>
        <div className={styles.service}>
          <div className={styles.title}>
            Patient Attended
          </div>
          <div className={styles.fee}>
            {profile.patientAttended || 0}
          </div>
        </div>

        <div className={styles.service}>
          <div className={styles.title}>
            Avg. Consultation Time
          </div>
          <div className={styles.fee}>
            {profile.avgConsultationTime || 10} minutes
          </div>
        </div>
        <div className={styles.service}>
          <div className={styles.title}>
            Doctor Code
          </div>
          <div className={styles.fee}>
            {profile.uid}
          </div>
        </div>

      </div>
    </div >
  )
}

export default Info