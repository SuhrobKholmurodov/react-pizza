import { EmptyContent } from '../EmptyContent'
import { CartHeader } from './CartHeader'

export const CartEmpty = () => (
  <div>
    <CartHeader />
    <EmptyContent
      title='Корзина пустая 😕'
      subtitle='Вероятней всего, вы не заказывали ещё пиццу. Для того, чтобы заказать пиццу, перейдите на главную страницу.'
      showButton={true}
    />
  </div>
)
