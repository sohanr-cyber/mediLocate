import Image from 'next/image'
import React from 'react'
import styles from './../../styles/Profile/AppointmentCard.module.css'
import { calculateDistance, extractRGBA } from '@/utility/helper'
import { orderStatusColors } from '@/utility/const'
import {  useRouter } from 'next/router'

const AppointmentCard = ({ item }) => {
    const router =useRouter()
    return (
        <div className={styles.wrapper} onClick={() => router.push(`/booking/${item._id}`)}>
            <div className={styles.images}
            >
                <div className={styles.dr}>
                    <Image src={item.doctor?.image} width={40} height={50} />
                </div>
                --- {calculateDistance(item.doctor.location?.coordinates, item.patient.location?.coordinates).toFixed(1)} KM ---
                <div className={styles.dr}>
                    <Image src={item.patient?.image} width={40} height={50} />
                </div>
            </div>
            <div className={styles.details}>
                <div className={styles.date}>
                    {new Date(item.dateOfConsultation).toLocaleDateString('en-GB')}
                </div>
                <div className={styles.time}>
                    {item.startTime} -- {item.endTime}
                </div>
                <div className={styles.status} style={{
                    background: `${extractRGBA(
                        orderStatusColors[item.status.toLowerCase()],
                        0.2
                    )}`,
                    padding: '3px 3px',
                    borderRadius: '5px'
                }}>
                    {item.status}
                </div>
            </div>


        </div>
    )
}

export default AppointmentCard
