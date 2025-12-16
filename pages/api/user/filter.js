import db from '@/database/connection'
import User from '@/database/model/User'
import { isAuth } from '@/utility'
import { calculateDistance } from '@/utility/helper'
import nextConnect from 'next-connect'
const handler = nextConnect()

handler.get(async (req, res) => {
    try {
        const {
            lat,
            lng,
            radius = 10,
            role,
            speciality,
            department,
            minExperience,
            maxFee,
        } = req.query;
        const filters = {};

        if (role) filters.role = role;
        if (speciality) filters.speciality = speciality;
        if (department) filters.departments = department;
        if (minExperience) filters.totalExperience = { $gte: Number(minExperience) };
        if (maxFee) filters.consultationFee = { $lte: Number(maxFee) };

        // First, get all users matching basic filters
        await db.connect
        let users = await User.find(filters)

        // If lat/lng provided, filter manually by distance
        if (lat && lng) {
            const userLat = Number(lat);
            const userLng = Number(lng);

            users = users.filter((u) => {
                if (!u.location || !u.location.coordinates) return false;
                return calculateDistance([userLat, userLng], u.location.coordinates) <= radius;
            });

        }

        res.json({ success: true, count: users.length, data: users });
    } catch (error) {
        console.error(error)
        res.status(500).json({ message: 'Server Error' })
    }
})

export default handler