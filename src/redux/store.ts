import { configureStore } from '@reduxjs/toolkit'
import filter from './filter/slice'
import cart from './cart/slice'
import pizza from './pizza/slice'
import favorite from './favorites/slice'
import commentFilter from './commentFilter/slice'
import { useDispatch } from 'react-redux'

export const store = configureStore({
  reducer: {
    filter,
    cart,
    pizza,
    commentFilter,
    favorite
  }
})

export type RootState = ReturnType<typeof store.getState>

type AppDispatch = typeof store.dispatch

export const useAppDispatch = () => useDispatch<AppDispatch>()
