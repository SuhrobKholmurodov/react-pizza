import { useCallback, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { Helmet } from 'react-helmet'
import {
  Categories,
  Sort,
  PizzaBlock,
  Skeleton,
  SwiperPizza,
  CustomPagination,
  EmptyContent,
  CartSummary
} from '../components'
import { useAppDispatch } from '../redux/store'
import { selectFilter } from '../redux/filter/selectors'
import { selectPizzaData } from '../redux/pizza/selectors'
import { selectCart } from '../redux/cart/selectors'
import { setCategoryId, setCurrentPage } from '../redux/filter/slice'
import { fetchPizzas } from '../redux/pizza/asyncActions'

export const Home = () => {
  const dispatch = useAppDispatch()
  const { items, status } = useSelector(selectPizzaData)
  const { categoryId, sort, currentPage, searchValue } =
    useSelector(selectFilter)
  const { items: cartItems, totalPrice } = useSelector(selectCart)

  const totalCount = cartItems.reduce(
    (sum: number, item) => sum + item.count,
    0
  )

  const onChangeCategory = useCallback(
    (idx: number) => {
      dispatch(setCategoryId(idx))
    },
    [dispatch]
  )

  const onChangePage = (page: number) => {
    dispatch(setCurrentPage(page))
  }

  const getPizzas = useCallback(async () => {
    const sortBy = sort.sortProperty.replace('-', '')
    const order = sort.sortProperty.includes('-') ? 'asc' : 'desc'
    const category = categoryId > 0 ? String(categoryId) : ''
    const search = searchValue

    dispatch(
      fetchPizzas({
        sortBy,
        order,
        category,
        search,
        currentPage: String(currentPage)
      })
    )

    window.scrollTo(0, 0)
  }, [categoryId, sort.sortProperty, searchValue, currentPage, dispatch])

  useEffect(() => {
    getPizzas()
  }, [getPizzas])

  const pizzas = items.map(obj => <PizzaBlock key={obj.id} {...obj} />)
  const skeletons = [...new Array(4)].map((_, index) => (
    <Skeleton key={index} />
  ))

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [])

  return (
    <div>
      <div className='sm:-mx-[5%]'>
        <SwiperPizza />
      </div>
      <div className='flex mt-[20px] items-center sm:gap-[20px] sm:flex-col justify-between'>
        <Categories value={categoryId} onChangeCategory={onChangeCategory} />
        <Sort value={sort} />
      </div>
      <Helmet>
        <title>Pizza house | Главная</title>
      </Helmet>
      <h2 className='text-[24px] pl-[7px] dark:text-mainTextColor mt-[20px] font-[600] mb-[20px]'>
        Все пиццы
      </h2>
      {status === 'error' ? (
        <div className='mt-[-50px]'>
          <EmptyContent
            title='Произошла ошибка 😕'
            subtitle='К сожалению, не удалось получить пиццы. Попробуйте повторить попытку позже.'
            showButton={false}
          />
        </div>
      ) : (
        <div className='grid grid-cols-4 sm:grid-cols-1 md:grid-cols-3 mb-[-20px] sm:mb-[-5px] gap-6'>
          {status === 'loading' ? skeletons : pizzas}
        </div>
      )}
      <div className='px-[5%] dark:text-mainTextColor sm:pl-[3%] fixed left-0 right-0 sm:flex-row-reverse bottom-0 dark:bg-mainBgColor dark:border-t-[black] p-4 border-t bg-gray-100 flex justify-center sm:justify-between items-center'>
        <CartSummary totalPrice={totalPrice} totalCount={totalCount} />
        <CustomPagination
          currentPage={currentPage}
          onChangePage={onChangePage}
        />
      </div>
    </div>
  )
}
