import { startLoading, finishLoading } from '@/redux/stateSlice'
import axios from 'axios'
import { useRouter } from 'next/router'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import styles from '../../styles/Profile/VerificationAlertBox.module.css'
import { showSnackBar } from '@/redux/notistackSlice'

const VerificationAlertBox = ({ profile }) => {
    const dispatch = useDispatch()
    const router = useRouter()
    const userInfo = useSelector(state => state.user.userInfo)

    const resend = async () => {
        dispatch(startLoading())

        try {
            const { data } = await axios.put(
                '/api/user/verify',
                {
                    id: userInfo.id
                },
                {
                    headers: {
                        Authorization: 'Bearer ' + userInfo.token
                    }
                }
            )

            if (data && !data.error) {
                dispatch(
                    showSnackBar({
                        message: 'Verification Code Sent To Your Phone '
                    })
                )
            }

            if (data.error) {
                // setCooldown(60)

                dispatch(
                    showSnackBar({
                        message: data.error,
                        option: {
                            variant: 'info'
                        }
                    })
                )
            }
            dispatch(finishLoading())
            router.push('/verify')

        } catch (error) {
            dispatch(
                showSnackBar({
                    message: 'Something Went Wrong !',
                    option: {
                        variant: 'error'
                    }
                })
            )
            dispatch(finishLoading())

            console.log(error)
        }
    }
    return (
        !profile.isVerified && <div className={styles.alertBox} onClick={() => {
            resend()

        }}>
            <i>Your Phone Number isn't Verified Yet .</i>

            <i >
                Click Here to verify ..
            </i>

        </div>
    )
}

export default VerificationAlertBox
