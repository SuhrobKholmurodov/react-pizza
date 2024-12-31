import React, { useCallback, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { Helmet } from 'react-helmet'
import {
  Categories,
  Sort,
  PizzaBlock,
  Skeleton,
  CustomPagination
} from '../components'
import { useAppDispatch } from '../redux/store'
import { selectFilter } from '../redux/filter/selectors'
import { selectPizzaData } from '../redux/pizza/selectors'
import { setCategoryId, setCurrentPage } from '../redux/filter/slice'
import { fetchPizzas } from '../redux/pizza/asyncActions'

const Home: React.FC = () => {
  const dispatch = useAppDispatch()
  const { items, status } = useSelector(selectPizzaData)
  const { categoryId, sort, currentPage, searchValue } =
    useSelector(selectFilter)

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

  
  const pizzas = items.map(obj => <PizzaBlock ingredients={[]} isNew={false} moreDetails={''} spicyLevel={0} preparationTime={0} calories={0} key={obj.id} {...obj} />)
  const skeletons = [...new Array(4)].map((_, index) => (
    <Skeleton key={index} />
  ))

  return (
    <div>
      <div className='flex items-center sm:gap-[10px] sm:flex-col justify-between'>
        <Categories value={categoryId} onChangeCategory={onChangeCategory} />
        <Sort value={sort} />
      </div>
      <Helmet>
        <title>React Pizza | Главная</title>
      </Helmet>
      <h2 className='text-[24px] pl-[7px] dark:text-mainTextColor mt-[20px] font-[600] mb-[20px]'>
        Все пиццы
      </h2>
      {status === 'error' ? (
        <div className='flex items-center text-center h-[300px] justify-center flex-col gap-[20px]'>
          <h2 className='text-[28px] font-[700]'>Произошла ошибка 😕</h2>
          <p className='text-[20px] font-[500]'>
            К сожалению, не удалось получить пиццы. Попробуйте повторить попытку
            позже.
          </p>
        </div>
      ) : (
        <div className='grid grid-cols-4 sm:grid-cols-1 md:grid-cols-3 mb-[-20px] gap-6'>
          {status === 'loading' ? skeletons : pizzas}
        </div>
      )}
      <div className='px-[5%] fixed left-0 right-0 bottom-0 dark:bg-[#1b1b1f] dark:border-t-[black]  p-4 border-t bg-gray-100 flex justify-center'>
        <CustomPagination
          currentPage={currentPage}
          onChangePage={onChangePage}
        />
      </div>
    </div>
  )
}

export default Home
