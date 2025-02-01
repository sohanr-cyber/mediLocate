import { configureStore } from '@reduxjs/toolkit'
import user from './userSlice'
import state from './stateSlice'
import cart from './cartSlice'
import address from './addressSlice'
import product from './productSlice'
import notistack from './notistackSlice'
import pixel from './pixelSlice'
import review from './reviewSlice'
export const store = configureStore({
  reducer: {
    user,
    state,
    cart,
    address,
    product,
    notistack,
    pixel,
    review
  }
})
