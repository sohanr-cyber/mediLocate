import db from '@/database/connection'
import User from '@/database/model/User'
import nextConnect from 'next-connect'
const handler = nextConnect()


handler.post(async (req, res) => {

    try {
        // Connect to DB
        await db.connect();


        const createdUsers = await User.insertMany(req.body);

        res.status(201).json({
            success: true,
            message: `${createdUsers.length} users created successfully!`,
            data: createdUsers,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: "Server error: could not create users",
            error: error.message,
        });
    }
})


handler.delete(async (req, res) => {
    try {
        // Time 30 minutes ago
        const thirtyMinutesAgo = new Date(Date.now() - 30 * 60 * 1000);

        const result = await User.deleteMany({
            createdAt: { $gt: thirtyMinutesAgo }
        });

        return res.status(200).json({
            success: true,
            deletedCount: result.deletedCount,
            message: "Users older than 30 minutes deleted"
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: "Server error"
        });
    }
})


export default handler