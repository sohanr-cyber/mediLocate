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
        const booking = await Booking.findById(req.body.id)
            .populate('patient', 'fullName phone location image')
            .populate('doctor', 'fullName phone speciality workingIn location image');
        if (!booking) return res.status(404).json({ error: 'Booking not found' });
        res.status(200).json(booking);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
})

export default handler