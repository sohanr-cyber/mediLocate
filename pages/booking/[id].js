import React, { useEffect, useState } from 'react'
import styles from '../../styles/Order/Details.module.css'
import OrderSummary from '@/components/Order/OrderSummary'
import { useDispatch, useSelector } from 'react-redux'
import BASE_URL from '@/config'
import axios from 'axios'
import OrderStatus from '@/components/Order/OrderStatus'
import { useRouter } from 'next/router'
import { calculateDistance, getTime } from '@/utility/helper'
import { orderDetailSeoData, statusMessages } from '@/utility/const'
import { finishLoading, startLoading } from '@/redux/stateSlice'
import { NextSeo } from 'next-seo'
import RouteMap from '@/components/Utility/RouteMap'
import QueryBuilderIcon from '@mui/icons-material/QueryBuilder';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import HealthAndSafetyIcon from '@mui/icons-material/HealthAndSafety';
import CallIcon from '@mui/icons-material/Call';
import SocialDistanceIcon from '@mui/icons-material/SocialDistance';
import TimePicker from '@/components/Order/TimePicker'
const statuses = ["pending", "confirmed", "completed", "cancelled", "no-show"]
const Order = ({ order: orderDetail }) => {
  const [isClient, setIsClient] = useState(false)
  const router = useRouter()
  const [order, setOrder] = useState(orderDetail)
  const userInfo = useSelector(state => state.user.userInfo)
  const dispatch = useDispatch()
  const headers = { Authorization: `Bearer ${userInfo?.token}` }
  const [updateTime, setUpdateTime] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  const updateOrderStatus = async status => {
    if (
      order.statusTimeline.find(
        i =>
          i.status == 'cancelled' ||
          i.status == 'completed'
      )
    ) {
      return
    }
    try {
      dispatch(startLoading())
      const { data } = await axios.put(
        `/api/booking/${router.query.id}`,
        {
          newStatus: status
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

  const openGoogleMapsDirection = ({
    originLat,
    originLng,
    destLat,
    destLng,
  }) => {
    const url = `https://www.google.com/maps/dir/?api=1&origin=${originLat},${originLng}&destination=${destLat},${destLng}&travelmode=driving`;

    window.open(url, "_blank"); // opens Google Maps
  };


  const handleCall = (e, number) => {
    router.push(`tel:+88${number}`)
  }



  return (
    <>
      {updateTime && <TimePicker setOpen={setUpdateTime} order={order} />}
      <NextSeo {...orderDetailSeoData} />
      <div className={styles.wrapper}>
        <div className={styles.left}>
          <div className={styles.flex}>
            <h2>
              Appointment Details
            </h2>
          </div>
          <div className={styles.details}>
            <div className={styles.item}>
              <CalendarMonthIcon className={styles.icon} />
              <div className={styles.text}>Date :{order.dateOfConsultation ? new Date(order.dateOfConsultation).toLocaleDateString('en-GB')
                : " Yet To Set"}                 {<button onClick={() => { setUpdateTime(true) }}> Set Date</button>}
              </div>
            </div>
            <hr />

            <div className={styles.item}>
              <QueryBuilderIcon className={styles.icon} />

              <div className={styles.text}> Time Slot : {order?.startTime && order?.endTime
                ? `${order.startTime} - ${order.endTime} `
                : 'Not Set'}
                {userInfo?.id == order.doctor._id && <button onClick={() => { setUpdateTime(true) }}> Set Time</button>
                }              </div>
            </div>
            <hr />

            <div className={styles.item}>
              <CallIcon className={styles.icon} />
              <div className={styles.text}>Doctor Number : {order.doctor.phone} <button onClick={(e) => handleCall(e, order.doctor.phone)}>Call Now</button></div>
            </div>
            <hr />

            <div className={styles.item}>
              <CallIcon className={styles.icon} />
              <div className={styles.text}>Patient Number :{order.patient.phone} <button onClick={(e) => handleCall(e, order.patient.phone)}>Call Now</button> </div>
            </div>
            <hr />
            <div className={styles.item}>
              <SocialDistanceIcon className={styles.icon} />
              <div className={styles.text}>Distance  :{calculateDistance(order.doctor.location.coordinates, order.patient.location.coordinates).toFixed(2)} KM <button onClick={(e) =>
                openGoogleMapsDirection({
                  originLat: order.patient.location.coordinates[0],
                  originLng: order.patient.location.coordinates[1],
                  destLat: order.doctor.location.coordinates[0],
                  destLng: order.doctor.location.coordinates[1],
                })

              }>Get Direction</button> </div>
            </div>
            <hr />

          </div>
          {order.symptoms && <div className={styles.note}>
            <h3>Patient Note</h3>
            <div className={styles.text}>
              <i>
                {order.symptoms}
              </i>
            </div>
          </div>}
          <div className={styles.status__steps}>
            <OrderStatus order={order} />
          </div>
          {isClient && userInfo?.role == 'admin' || userInfo?.id == order.doctor._id && (
            <div className={styles.update__status}>
              {[
                statuses?.map((item, index) => (
                  <span
                    key={index}
                    onClick={() => updateOrderStatus(item)}
                    style={
                      order?.statusTimeline?.find(i => i.status == item)
                        ? { background: 'black', color: 'white' }
                        : {}
                    }
                  >
                    {item}
                  </span>
                ))
              ]}
            </div>
          )}
          <div className={styles.statusTimeline}>
            {order?.statusTimeline?.map((_, index) => (
              <div
                className={styles.item}
                key={index}
                style={
                  _.status === 'cancelled' || _.status === 'no-show'
                    ? { color: 'red' }
                    : _.status == 'Delivered'
                      ? { color: 'green' }
                      : {}
                }
              >
                <div className={styles.timeline}>{getTime(_.timestamp)}</div>
                <div className={styles.status}>
                  {statusMessages[_.status.toLowerCase()]}
                </div>
              </div>
            ))}
          </div>
          <button onClick={() => router.push('/')}>
            Go Back
          </button>{' '}
          {/* <button
            onClick={() => router.push('/shop')}
            style={{ color: 'white', marginLeft: '10px', background: 'red' }}
          >
            Cancel Order{' '}
          </button> */}
        </div>
        <div className={styles.right}>
          {isClient && (
            <OrderSummary
              user={order.doctor} />
          )}

          {isClient && (
            <div className={styles.mapWrapper}>
              <div className={styles.title}>
                Location And Dictions
              </div>
              <RouteMap origin={
                {
                  lat: order.patient.location.coordinates[0],
                  lng: order.patient.location.coordinates[1]
                }
              } destination={{
                lat: order.doctor.location.coordinates[0],
                lng: order.doctor.location.coordinates[1]
              }} containerStyle={{
                width: "100%",
                height: "200px"
              }} />
              <button onClick={e => openGoogleMapsDirection({
                originLat: order.patient.location.coordinates[0],
                originLng: order.patient.location.coordinates[1],
                destLat: order.doctor.location.coordinates[0],
                destLng: order.doctor.location.coordinates[1],
              })}>Get Direction</button>
            </div>
          )}
        </div>
      </div>
    </>
  )
}

export default Order

export async function getServerSideProps(context) {
  const { id } = context.query
  try {
    const { data: order } = await axios.get(`${BASE_URL}/api/booking/${id}`)

    return {
      props: {
        order
      }
    }
  } catch (error) {
    console.error('Error fetching products:', error)
    return {
      props: {
        order: {}
      }
    }
  }
}
