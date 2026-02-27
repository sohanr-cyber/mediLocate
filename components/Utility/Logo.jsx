import React from 'react'
import styles from '../../styles/Utility/Logo.module.css'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { colors, companyName } from '@/utility/const'
import { useSelector } from 'react-redux'

const Logo = ({ color }) => {
  const router = useRouter()
  const location = useSelector(state => state.user.location)
  const name = `Med${location?.lat ? "📍"
    : "i"}Locate`

  return (
    <div className={styles.wrapper} onClick={() => router.push('/')}>
      <div className={styles.logo}>
        <Image
          src="/images/logo.png"
          width={210}
          height={55}
          alt="mediLocate"
          priority
          unoptimized
        />

      </div>
      <div className={styles.mobileLogo}>
        <Image
          src="/images/mobileLogo.png"
          width={210}
          height={55}
          alt="mediLocate"
          priority
          unoptimized
        />
      </div>
    </div>
  )
}

export default Logo
