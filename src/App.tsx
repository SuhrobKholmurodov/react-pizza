import { Suspense } from 'react'
import { Routes, Route } from 'react-router-dom'
import { Home } from 'lucide-react'
import { Toaster } from 'react-hot-toast'
import MainLayout from './layouts/MainLayout'
import { Cart, Favorites, NotFound } from './pages'
import { Loader } from './components'

function App () {
  return (
    <div className='pl-[5%] dark:bg-mainBgColor pr-[5%]'>
      <Toaster />
      <Routes>
        <Route path='/' element={<MainLayout />}>
          <Route path='' element={<Home />} />
          <Route
            path='cart'
            element={
              <Suspense fallback={<Loader />}>
                <Cart />
              </Suspense>
            }
          />
          <Route
            path='favorites'
            element={
              <Suspense fallback={<Loader />}>
                <Favorites />
              </Suspense>
            }
          />
          <Route
            path='*'
            element={
              <Suspense fallback={<Loader />}>
                <NotFound />
              </Suspense>
            }
          />
        </Route>
      </Routes>
    </div>
  )
}

export default App
