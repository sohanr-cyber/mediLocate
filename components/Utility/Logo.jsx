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
      {Array.from(name).map((char, index) => (
        <div key={index} style={{ color }}>
          {char}
        </div>
      ))}

    </div>
  )
}

export default Logo
