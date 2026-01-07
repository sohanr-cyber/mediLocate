import React from 'react'
import styles from '../../styles/Profile/Experiance.module.css'

const Experiance = ({ profile }) => {
  return (
    <div className={styles.wrapper}>
      <b className={styles.title}>
        Experiance
      </b>
      <p></p>
      <div className={styles.details}>
        {profile.experienceDetails && <div dangerouslySetInnerHTML={{ __html: profile.experienceDetails }} />
        }
      </div>
    </div>
  )
}

export default Experiance