import React, { useState } from 'react'
import styles from '@/styles/Admin/DatePicker.module.css'
import { useRouter } from 'next/router'
import { useDispatch, useSelector } from 'react-redux'
import { showSnackBar } from '@/redux/notistackSlice'
import { finishLoading, startLoading } from '@/redux/stateSlice'
import axios from 'axios'

const TimePicker = ({ setOpen, order }) => {
    const router = useRouter()
    const dispatch = useDispatch()
    const [dateOfConsultation, setDateOfConsultation] = useState(
        order.dateOfConsultation
            ? new Date(order.dateOfConsultation).toISOString().split('T')[0]
            : ''
    )
    const [startTime, setStartTime] = useState(
        order.startTime || ''
    )
    const userInfo = useSelector(state => state.user.userInfo)
    const headers = { Authorization: `Bearer ${userInfo?.token}` }


    const [endTime, setEndTime] = useState(
        order.endTime || ''
    )

    const updateTime = async () => {
        try {
            dispatch(startLoading())
            const { data } = await axios.patch(
                `/api/booking/${router.query.id}`,
                {
                    dateOfConsultation, startTime, endTime
                },
                {
                    headers
                }
            )
            const { data: order } = await axios.get(`/api/booking/${router.query.id}`)
            setOrder(order)
            dispatch(finishLoading())
        } catch (error) {
            dispatch(finishLoading())

            console.log(error)
        }
    }
    return (
        <div className={styles.container}>
            <div className={styles.wrapper}>
                <div className={styles.field}>
                    <span>Date </span>
                    <input
                        type='date'
                        value={dateOfConsultation}
                        onChange={e => setDateOfConsultation(e.target.value)}
                    />
                </div>
                <div className={styles.field}>
                    <span>From</span>
                    <input
                        type="time"
                        value={startTime}
                        onChange={(e) => setStartTime(e.target.value)}
                        max={endTime || undefined}
                    />
                </div>

                <div className={styles.field}>
                    <span>To</span>
                    <input
                        type="time"
                        value={endTime}
                        onChange={(e) => setEndTime(e.target.value)}
                        min={startTime || undefined}
                    />
                </div>

                <div className={styles.field}>
                    <button
                        onClick={() =>
                            updateTime()
                        }
                    >
                        Apply
                    </button>
                    <button onClick={() => setOpen(false)}>Cancel</button>
                </div>
            </div>
        </div>
    )
}

export default TimePicker
