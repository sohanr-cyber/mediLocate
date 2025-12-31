import nextConnect from 'next-connect';
import { isAuth } from '@/utility';
import Booking from '@/database/model/Booking';
import User from '@/database/model/User'
import db from '@/database/connection';
import { generateUniqueID } from '@/utility/helper';

const handler = nextConnect();

// GET booking by ID
handler.get(async (req, res) => {
    try {
        await db.connect();
        const booking = await Booking.findById(req.query.id)
            .populate('patient', 'fullName phone location image')
            .populate('doctor', 'fullName speciality workingIn location image');
        if (!booking) return res.status(404).json({ error: 'Booking not found' });
        res.status(200).json(booking);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

handler.put(async (req, res) => {
  const { id: bookingId } = req.query
  const { newStatus } = req.body

  const ALLOWED_STATUS = [
    "pending",
    "confirmed",
    "completed",
    "cancelled",
    "no-show",
  ]

  try {
    await db.connect()

    // Validate status
    if (!ALLOWED_STATUS.includes(newStatus)) {
      return res.status(400).json({ message: "Invalid status value" })
    }

    const booking = await Booking.findById(bookingId)
      .populate("patient", "name phone email")
      .populate("doctor", "name department")

    if (!booking) {
      return res.status(404).json({ message: "Booking not found" })
    }

    // Prevent changing final states
    if (["completed", "cancelled", "no-show"].includes(booking.status)) {
      return res
        .status(400)
        .json({ message: "Booking status cannot be changed" })
    }

    // Same status check
    if (booking.status === newStatus) {
      return res
        .status(400)
        .json({ message: "New status is same as current status" })
    }

    const previousStatus = booking.status

    // Update status
    booking.status = newStatus

    // Optional: status timeline (recommended)
    if (!booking.statusTimeline) {
      booking.statusTimeline = []
    }

    booking.statusTimeline.push({
      status: newStatus,
      timestamp: Date.now(),
    })

    await booking.save()

    return res.status(200).json({
      message: `Booking status updated from ${previousStatus} to ${newStatus}`,
      booking,
    })
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: "Internal Server Error" })
  }
})


export default handler