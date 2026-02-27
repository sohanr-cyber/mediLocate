import nextConnect from 'next-connect'
import UserService from '@/services/user-service'
import { isAuth } from '@/utility'
import User from '@/database/model/User'
import db from '@/database/connection'

const handler = nextConnect()
handler.get(async (req, res) => {
  try {

    // const service = new UserService()
    // const user = await service.FindUserProfileById(req.user._id)
    await db.connect()
    const user = await User.findById(req.query.id);
    return res.status(200).json(user)
  } catch (error) {
    console.log(error)
    return res.status(500).json({ error: 'Internal Server Error' })
  }
})

handler.use(isAuth)
handler.put(async (req, res) => {
  try {
    const service = new UserService()
    const user = await service.UpdateUser({
      ...req.body,
      _id: req.user._id
    })
    console.log(user)
    res.status(200).json(user)
  } catch (error) {
    console.log(error)
  }
})

handler.delete(async (req, res) => {
  try {
    console.log("05325")
    await db.connect()
    const data = await User.findByIdAndDelete(req.query.id)
    console.log(data)
    res.status(200).json(data)
  } catch (error) {
    console.log(error)
  }
})
export default handler
