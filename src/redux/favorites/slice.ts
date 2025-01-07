import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { FavoriteSliceState } from './types'
import { Pizza } from '../pizza/types'

const saveFavoritesToLS = (items: Pizza[]) => {
  localStorage.setItem('favorites', JSON.stringify(items))
}

const getFavoritesFromLS = (): Pizza[] => {
  const data = localStorage.getItem('favorites')
  return data ? JSON.parse(data) : []
}

const initialState: FavoriteSliceState = {
  items: getFavoritesFromLS()
}

const favoriteSlice = createSlice({
  name: 'favorite',
  initialState,
  reducers: {
    addFavorite (state, action: PayloadAction<Pizza>) {
      const findItem = state.items.find(obj => obj.id === action.payload.id)

      if (!findItem) {
        state.items.push({
          ...action.payload
        })
        saveFavoritesToLS(state.items)
      }
    },
    removeFavorite (state, action: PayloadAction<string>) {
      state.items = state.items.filter(obj => obj.id !== action.payload)
      saveFavoritesToLS(state.items)
    },
    clearFavorites (state) {
      state.items = []
      saveFavoritesToLS(state.items)
    }
  }
})

export const { addFavorite, removeFavorite, clearFavorites } =
  favoriteSlice.actions

export default favoriteSlice.reducer
