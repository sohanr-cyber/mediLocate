import React from 'react'
import styles from '../../styles/Profile/Info.module.css'
const Info = () => {
  return (
    <div className={styles.wrapper}>
      <b className={styles.title}>
        About Doctor
      </b>
      <p className={styles.about}>
        Lorem ipsum dolor, sit amet consectetur adipisicing elit.
        Dolorum, cum dicta praesentium ipsum dolores odit alias tenetur repellendus
        molestiae aliquid ea minus ut unde id at assumenda nam totam? Eius!
        Lorem ipsum dolor, sit amet consectetur adipisicing elit.
        Dolorum, cum dicta praesentium ipsum dolores odit alias tenetur repellendus
        molestiae aliquid ea minus ut unde id at assumenda nam totam? Eius!
        Lorem ipsum dolor, sit amet consectetur adipisicing elit.
        Dolorum, cum dicta praesentium ipsum dolores odit alias tenetur repellendus
        molestiae aliquid ea minus ut unde id at assumenda nam totam? Eius!
      </p>
      <div className={styles.services}>

        <div className={styles.service}>
          <div className={styles.title}>
            Consultaion Fee
          </div>
          <div className={styles.fee}>
            BDT 500
          </div>
        </div>
        <div className={styles.service}>
          <div className={styles.title}>
            Follow-Up Fee
          </div>
          <div className={styles.fee}>
            BDT 250
          </div>
        </div>
        <div className={styles.service}>
          <div className={styles.title}>
            Patient Attended
          </div>
          <div className={styles.fee}>
            2834
          </div>
        </div>
        <div className={styles.service}>
          <div className={styles.title}>
            Patient Attended
          </div>
          <div className={styles.fee}>
            2834
          </div>
        </div>
        <div className={styles.service}>
          <div className={styles.title}>
            Avg. Consultation Time
          </div>
          <div className={styles.fee}>
            10 minutes
          </div>
        </div>
        <div className={styles.service}>
          <div className={styles.title}>
            Doctor Code
          </div>
          <div className={styles.fee}>
            DT6334
          </div>
        </div>

      </div>
    </div >
  )
}

export default Info