import { EmptyContent } from '../EmptyContent'
import cartEmptyImg from '../../assets/img/empty-cart.png'


export const FavoritesEmpty = () => (
  <EmptyContent
    title='Упс, здесь пусто! 😔'
    subtitle='Похоже, вы ещё ничего не добавили в избранное. Начните с главной страницы, чтобы найти что-то особенное!'
    showButton={true}
    imageSrc={cartEmptyImg}

  />
)
