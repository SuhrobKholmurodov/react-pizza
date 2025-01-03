import React, { Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Cart from './pages/Cart';
import MainLayout from './layouts/MainLayout';
// const NotFound = React.lazy(() => import(/* webpackChunkName: "NotFound" */ './pages/NotFound'));
import NotFound from './pages/NotFound';

function App() {
  return (
  <div className='pl-[5%] dark:bg-[#1b1b1f] pr-[5%]'>
      <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route path="" element={<Home />} />
        <Route
          path="cart"
          element={
            <Suspense fallback={<div>Идёт загрузка корзины...</div>}>
              <Cart />
            </Suspense>
          }
        />
        <Route
          path="*"
          element={
            <Suspense fallback={<div>Идёт загрузка...</div>}>
              <NotFound />
            </Suspense>
          }
        />
      </Route>
    </Routes>
  </div>
  );
}

export default App;
