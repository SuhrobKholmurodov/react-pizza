import { Suspense } from 'react'
import { Routes, Route } from 'react-router-dom'
import { Loader } from 'lucide-react'
import { Toaster } from 'react-hot-toast'
import Home from './pages/Home'
import Cart from './pages/Cart'
import MainLayout from './layouts/MainLayout'
import NotFound from './pages/NotFound'
import Favorites from './pages/Favorites'

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
