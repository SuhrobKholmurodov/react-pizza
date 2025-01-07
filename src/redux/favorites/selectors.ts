import { RootState } from '../store';

export const selectFavorites = (state: RootState) => state.favorite;

export const selectFavoriteItemById = (id: string) => (state: RootState) =>
  state.favorite.items.find((obj) => obj.id === id);