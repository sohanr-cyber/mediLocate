// Import necessary modules and models
import db from '@/database/connection'
import Symptom from '@/database/model/Symptom'
import nc from 'next-connect'
import slugify from 'slugify'
const PAGE_SIZE = 20
const handler = nc()

// get all the category
handler.get(async (req, res) => {
  try {
    await db.connect()
    // Get the page number from the query parameters, default to 1
    // const page = parseInt(req.query.page) || 1

    // Calculate the skip value based on the page number and page size
    // const skip = (page - 1) * (req.query.pageSize || PAGE_SIZE)
    // Retrieve total count of products
    // const totalCount = await Symptom.countDocuments()

    // Calculate total pages
    // const totalPages = Math.ceil(totalCount / PAGE_SIZE)

    // Retrieve products with pagination and sorting
    const symptoms = await Symptom.find({ parent: null })
    const tree = await Promise.all(
      symptoms.map(async item => {
        const { _id, name, image } = item
        const c = await Symptom.find({ parent: _id })

        const subtree = await Promise.all(
          c.map(async item => {
            const { _id, name, image } = item
            const sc = await Symptom.find({ parent: _id })
            return {
              name: name,
              _id: _id,
              image: image,
              children: sc
            }
          })
        )

        return {
          name: name,
          _id: _id,
          image: image,
          children: subtree
        }
      })
    )

    await db.disconnect()
    res.json(tree)
  } catch (error) {
    console.log({ error })
    res.status(500).json({ message: 'Server Error' })
  }
})

export default handler
