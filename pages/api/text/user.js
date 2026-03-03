
import db from '@/database/connection'
import User from '@/database/model/User'
import { calculateDistance } from '@/utility/helper'
import nextConnect from 'next-connect'

const handler = nextConnect()
handler.get(async (req, res) => {
    try {
        await db.connect()
        const users = await User.find({ role: "doctor" }).select("_id firstName lastName")
            // .limit(parseInt(50))
            // .sort({ createdAt: -1 })
            .exec()

        res.status(200).json(users)
    } catch (error) {
        res.status(400)
    }
})

export default handler