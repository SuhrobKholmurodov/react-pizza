import { Suspense } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom'
import { Toaster } from 'react-hot-toast';
import { AnimatePresence } from 'framer-motion'
import MainLayout from './layouts/MainLayout';
import { Cart, Favorites, Home, NotFound } from './pages';
import { Loader } from './components';

function App() {
  const location = useLocation(); 

  return (
    <div className='pl-[5%] dark:bg-mainBgColor pr-[5%]'>
      <Toaster />
      <AnimatePresence mode='wait'>
        <Routes location={location} key={location.pathname}>
          <Route path='/' element={<MainLayout />}>
            <Route
              path=''
              element={
                <Suspense fallback={<Loader />}>
                  <Home />
                </Suspense>
              }
            />
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
      </AnimatePresence>
    </div>
  );
}

export default App;