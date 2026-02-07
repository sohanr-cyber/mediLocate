import db from '@/database/connection'
import User from '@/database/model/User'
import { calculateDistance } from '@/utility/helper'
import nextConnect from 'next-connect'

const handler = nextConnect()

handler.get(async (req, res) => {
    try {
        const {
            lat,
            lng,
            radius,

            role = 'doctor',
            speciality,
            department,

            minExperience,
            maxExperience,

            minFee,
            maxFee,

            sortBy,
            sortOrder,

            page = 1,
            limit = 10,
        } = req.query

        const filters = {}

        // 🔹 Role filter (default doctor)
        if (role && role !== 'all') {
            filters.role = role
        }

        if (speciality) filters.speciality = speciality
        if (department) filters.departments = department

        // 🔹 Experience range
        if (minExperience || maxExperience) {
            filters.totalExperience = {}
            if (minExperience) filters.totalExperience.$gte = Number(minExperience)
            if (maxExperience) filters.totalExperience.$lte = Number(maxExperience)
        }

        // 🔹 Fee range
        if (minFee || maxFee) {
            filters.consultationFee = {}
            if (minFee) filters.consultationFee.$gte = Number(minFee)
            if (maxFee) filters.consultationFee.$lte = Number(maxFee)
        }

        await db.connect()

        let users = await User.find(filters).lean()

        // 🔹 Distance filtering (JS)
        if (lat && lng && radius) {
            const userLat = Number(lat)
            const userLng = Number(lng)
            const maxRadius = Number(radius)

            users = users.filter((u) => {
                if (!u.location?.coordinates) return false

                const distance = calculateDistance(
                    [userLat, userLng],
                    u.location.coordinates
                )

                return distance <= maxRadius
            })
        }

        // 🔹 Sorting (IMPORTANT: after distance filtering)
        if (sortBy) {
            let field = null

            if (sortBy === 'fee') field = 'consultationFee'
            if (sortBy === 'date') field = 'createdAt'

            if (field) {
                users.sort((a, b) => {
                    if (a[field] < b[field]) return sortOrder === 'desc' ? 1 : -1
                    if (a[field] > b[field]) return sortOrder === 'desc' ? -1 : 1
                    return 0
                })
            }
        }

        // 🔹 Pagination
        const pageNumber = Number(page)
        const pageSize = Number(limit)

        const total = users.length
        const totalPages = Math.ceil(total / pageSize)

        const startIndex = (pageNumber - 1) * pageSize
        const endIndex = startIndex + pageSize

        const paginatedUsers = users.slice(startIndex, endIndex)

        res.json({
            success: true,
            total,
            page: pageNumber,
            limit: pageSize,
            totalPages,
            count: paginatedUsers.length,
            users: paginatedUsers,
        })
    } catch (error) {
        console.error(error)
        res.status(500).json({ message: 'Server Error' })
    }
})

export default handler
