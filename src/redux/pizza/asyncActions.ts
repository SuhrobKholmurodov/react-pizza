const apiUrl = import.meta.env.VITE_API_URL
import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import { Pizza, SearchPizzaParams } from './types'
import { pickBy } from 'lodash'
import identity from 'lodash/identity'

export const fetchPizzas = createAsyncThunk<Pizza[], SearchPizzaParams>(
  'pizza/fetchPizzasStatus',
  async params => {
    const { sortBy, order, category, search, currentPage } = params
    const { data } = await axios.get<Pizza[]>(`${apiUrl}`, {
      params: pickBy(
        {
          page: currentPage,
          limit: 4,
          category,
          sortBy,
          order,
          search
        },
        identity
      )
    })

    return data
  }
)
