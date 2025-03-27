import React from 'react'
import styles from '../../styles/Profile/Basic.module.css'
import Image from 'next/image'
const Basic = () => {
    return (
        <div className={styles.wrapper}>
            <div className={styles.left}>
                <div className={styles.pic}>
                    <Image src='/images/dr2.png' width={200} height={260} alt="" />
                </div>
            </div>
            <div className={styles.right}>
                <div className={styles.name}>Appointment
                    Asst. Prof. Dr. Masrun Mostafa Chowdhury
                </div>
                <div className={styles.education}>
                    MBBS,
                    DDV (Dermatology)
                </div>
                <div className={styles.department}>
                    Dermatologist
                </div>
                <div className={styles.flex}>
                    <div className={styles.item}>
                        <div>Total Experiance</div>
                        <b>15+ Years</b>
                    </div>
                    <div className={styles.item}>
                        <div>BMDC Number
                        </div>
                        <b>A31476</b>
                    </div>
                    <div className={styles.item}>
                        <div>Total Rating</div>
                        <b>4.9
                            (3693)</b>
                    </div>
                    <div className={styles.item}>
                        <div>Working In</div>
                        <b>BIRDEM General Hospital, Dhaka</b>
                    </div>
                </div>
                <div className={styles.book}>
                    <div className={styles.left}>
                        <div>Consulation Fee</div>
                        <div className={styles.fee}>
                            BDT 500
                        </div>
                    </div>
                    <div className={styles.btn}>
                        Book Now
                    </div>
                </div>

            </div>
        </div>
    )
}

export default Basic