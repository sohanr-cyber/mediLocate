import Image from 'next/image'
import React from 'react'
import styles from '../../styles/Cart/OrderSummary.module.css'
import { calculateSubtotal, extractRGBA, getPrice } from '@/utility/helper'
import { useRouter } from 'next/router'
import { orderStatusColors } from '@/utility/const'
import RouteMap from '../Utility/RouteMap'
const OrderSummary = ({
  user
}) => {
  const router = useRouter()

  return (
    <div className={styles.wrapper}>
      <div className={styles.image__container}>
        <Image src={user.image} width={100} height={100} />
        <div className={styles.name}>
          {user.fullName}
        </div>
        <div className={styles.degree}>
          {user.speciality}
        </div>
        <div className={styles.location}>City Medical Center</div>
        <div></div>
        <button onClick  = {() => router.push(`/profile/${user._id}`)}>Visit Profile</button>
      </div>

    </div>
  )
}

export default OrderSummary
