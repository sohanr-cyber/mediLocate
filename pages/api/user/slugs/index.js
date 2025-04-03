import db from '@/database/connection'
import User from '@/database/model/User'
import nextConnect from 'next-connect'

const handler = nextConnect()

handler.get(async (req, res) => {
    try {
        await db.connect()
        const profiles = await User.find({}, { slug: 1, _id: 1 }).lean() // Select only the slug field
        const slugs = profiles.map(profile => profile._id) // Extract slugs from profiles
        await db.disconnect()
        res.json(profiles) // Return only the slugs
    } catch (error) {
        console.error(error)
        res.status(500).json({ message: 'Server Error' })
    }
})

export default handler
