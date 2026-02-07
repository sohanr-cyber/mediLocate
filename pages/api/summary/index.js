import db from '@/database/connection'
import Booking from '@/database/model/Booking'
import nc from 'next-connect'
import { isAuth, isAdmin } from '@/utility'
import { convertToCamelCase, dateDevider, getTime } from '@/utility/helper'

const handler = nc()

function getSummary(data, date) {
  let total = 0
  let totalAmount = 0

  const stats = {
    pending: 0,
    confirmed: 0,
    completed: 0,
    cancelled: 0,
    noShow: 0,
  }

  const amounts = {
    pending: 0,
    confirmed: 0,
    completed: 0,
    cancelled: 0,
    noShow: 0,
  }

  data.forEach(b => {
    total += 1
    totalAmount += b.consultationFee || 0

    switch (b.status) {
      case 'pending':
        stats.pending++
        amounts.pending += b.consultationFee || 0
        break
      case 'confirmed':
        stats.confirmed++
        amounts.confirmed += b.consultationFee || 0
        break
      case 'completed':
        stats.completed++
        amounts.completed += b.consultationFee || 0
        break
      case 'cancelled':
        stats.cancelled++
        amounts.cancelled += b.consultationFee || 0
        break
      case 'no-show':
        stats.noShow++
        amounts.noShow += b.consultationFee || 0
        break
    }
  })

  return {
    date,
    total,
    totalAmount,
    ...stats,
    ...Object.fromEntries(
      Object.entries(amounts).map(([k, v]) => [`${k}Amount`, v])
    ),
  }
}

// handler.use(isAuth, isAdmin)

handler.get(async (req, res) => {
  let { period, startDate, endDate } = req.query
  period = period && convertToCamelCase(period)

  let dateFilter = {}
  const now = new Date()

  if (period === 'last_3_days') {
    dateFilter.createdAt = { $gte: new Date(now.setDate(now.getDate() - 3)) }
  } else if (period === 'last_7_days') {
    dateFilter.createdAt = { $gte: new Date(now.setDate(now.getDate() - 7)) }
  } else if (period === 'last_month') {
    const start = new Date(now.getFullYear(), now.getMonth() - 1, 1)
    const end = new Date(now.getFullYear(), now.getMonth(), 1)
    dateFilter.createdAt = { $gte: start, $lt: end }
  } else if (period === 'custom' && startDate && endDate) {
    dateFilter.createdAt = {
      $gte: new Date(startDate),
      $lte: new Date(endDate),
    }
  }

  try {
    await db.connect()

    const bookings = await Booking.find(dateFilter, {
      patient: 0,
      doctor: 0,
      symptoms: 0,
      statusTimeline: 0,
    }).sort({ createdAt: 1 })

    if (!bookings.length) {
      return res.status(200).json([])
    }

    let start = new Date(bookings[0].createdAt)
    start.setUTCHours(0, 0, 0, 0)

    let end = new Date(bookings[bookings.length - 1].createdAt)
    end.setUTCHours(0, 0, 0, 0)

    const daysDiff = (end - start) / (1000 * 60 * 60 * 24)
    const diff = dateDevider(daysDiff)

    let dateList = []
    let current = new Date(start)

    while (current <= end) {
      dateList.push(new Date(current))
      current.setUTCDate(current.getUTCDate() + diff)
    }

    const summary = []

    dateList.forEach((date, i) => {
      if (i + 1 < dateList.length) {
        summary.push(
          getSummary(
            bookings.filter(
              b => b.createdAt >= date && b.createdAt < dateList[i + 1]
            ),
            getTime(date).split(' ')[0]
          )
        )
      }
    })

    summary.push(
      getSummary(
        bookings.filter(b => b.createdAt >= dateList.at(-1)),
        getTime(dateList.at(-1)).split(' ')[0]
      )
    )

    res.status(200).json(summary)
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Server Error' })
  } finally {
    await db.disconnect()
  }
})

export default handler
