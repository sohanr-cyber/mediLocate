import React, { useEffect, useState } from 'react'
import styles from '../styles/Product.module.css'

import Image from 'next/image'
import { useRouter } from 'next/router'
import { calculateDistance, getPrice, hexToRgba } from '@/utility/helper'
import { useDispatch, useSelector } from 'react-redux'
import { handleViewProduct } from '@/redux/pixelSlice'
import { motion } from 'framer-motion'
import axios from 'axios'
import { setProduct } from '@/redux/productSlice'
import Rating from './Utility/Rating'
import CartItems from './Cart/CartItems'

const Product = ({ item, redirect, rowDirection }) => {
  const userInfo = useSelector(state => state.user.userInfo)
  const router = useRouter()
  const dispatch = useDispatch()
  const [myColor, setMyColor] = useState("")
  const location = useSelector(state => state.user.location)
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  const handleClick = () => {
    redirect && router.push(`/profile/${item._id}`)
    dispatch(handleViewProduct(item))
  }



  return (
    <motion.div
      // initial={{ opacity: 0.4, scale: 0.9 }}
      // whileInView={{ opacity: 1 }}
      // transition={{ duration: 0.9 }}
      className={`${styles.wrapper} ${rowDirection && styles.wrapperC}`}
      onClick={() => handleClick()}
      onDoubleClick={() => { userInfo?.role == "admin" && router.push(`/admin/product/create?id=${item._id}`) }}
    // style={{ background: `${hexToRgba(item.thumbnailColors[0], 0.5)}` }}
    >
      <div className={styles.pic} >
        {isClient && location?.lat && <div className={styles.distance}>
          In {" "}{calculateDistance([location.lat, location.lng], item.location.coordinates).toFixed(2)} {" "}KM
        </div>}
        <Image src={"/images/dr2.png"} width={250} height={250} alt='Not Found' />
      </div>
      <div className={styles.details}>
        <div className={styles.category}>
          {item.categories?.map(i => i.name)[0]}
        </div>
        <div className={styles.title}>{item.firstName} {" "}{item.lastName}</div>
        <div className={styles.departments}>{item.departments.map(i => <span>{i} {" "}</span>)} </div>

        <Rating ratings={item.ratings} id={item._id} />


        <div className={styles.price}>৳{getPrice(item.consultationFee)}</div>

      </div>
    </motion.div>
  )
}

export default Product
