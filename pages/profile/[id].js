import React from 'react'
import styles from "../../styles/Profile/Dr.module.css"
import Basic from '@/components/Profile/Basic'
import Info from '@/components/Profile/Info'
const Dr = () => {
    return (
        <div className={styles.wrapper}>
            <Basic />
            <div className={styles.heading}>
                <div className={styles.option}>
                    Info
                </div>
                <div className={styles.option}>
                    Experiance
                </div>
                <div className={styles.option}>
                    Reviews
                </div>
            </div>
            <Info />
        </div>
    )
}

export default Dr