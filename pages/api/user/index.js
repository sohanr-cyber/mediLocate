import db from '@/database/connection'
import User from '@/database/model/User'
import UserService from '@/services/user-service'
import { isAuth } from '@/utility'
import nextConnect from 'next-connect'

const handler = nextConnect()

handler.post(async (req, res) => {
  try {
    const service = new UserService()
    const { email, password, firstName, lastName, role, phone } = req.body
    const user = await service.SignUp({ email, password, firstName, lastName, role, phone })
    res.status(200).json(user)
  } catch (error) {
    console.log(error)
    res.status(400)
  }
})



handler.get(async (req, res) => {
  try {
    // Extract filter parameters from the query string
    let {
      name,
      page,
      minPrice, maxPrice,
      sortBy, // New parameter for sorting
      sortOrder, // New parameter for sorting order,
      limit = 10,
      blur,
      categories
    } = req.query

    // Construct the filter object based on the provided parameters
    const filter = {}

    if (name) {
      filter.name = { $regex: name, $options: 'i' } // Case-insensitive search for product name
    }

    if (minPrice && maxPrice && minPrice != 'all' && maxPrice != 'all') {
      filter.priceWithDiscount = { $gte: minPrice, $lte: maxPrice } // Filter products by price range
    } else if (minPrice && minPrice != 'all') {
      filter.priceWithDiscount = { $gte: minPrice } // Filter products with price greater than or equal to minPrice
    } else if (maxPrice && maxPrice != 'all') {
      filter.priceWithDiscount = { $lte: maxPrice } // Filter products with price less than or equal to maxPrice
    }

    if (categories && categories != 'all') {
      filter.categories = { $in: categories.split(',') } // Filter products by category
    }




    page = page || 1
    const skip = (page - 1) * limit
    console.log({ filter })
    await db.connect()

    // Query the database with the constructed filter object
    const count = await User.countDocuments(filter)
    const totalPages = Math.ceil(count / limit)
    let users = await User.find(filter, {
      password: 0,

    })
      .lean()
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(parseInt(limit))

    // if (blur) {
    //   products = await Promise.all(
    //     products.map(async p => {
    //       const blurData = await getPlaceholderImage(p.thumbnail, 5, 10)
    //       return {
    //         ...p.toObject(), // Ensure you're working with plain objects
    //         blurData: blurData.placeholder
    //       }
    //     })
    //   )
    // }





    // Sorting
    if (sortBy && sortOrder) {
      console.log({ sortBy, sortOrder })
      if (sortOrder === 'desc') {
        products = sortArrayByKey(products, sortBy, 'desc')
      } else {
        products = sortArrayByKey(products, sortBy, 'asc')
      }
    }

    return res.status(200).json({ totalPages, count, page, users })
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Server Error' })
  }
})

export default handler
