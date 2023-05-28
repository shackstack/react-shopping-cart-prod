import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import App from './App';
import CartPage from './pages/CartPage';
import ProductPage from './pages/ProductPage';
import GlobalStyle from './styles/GlobalStyle';
import OrderListPage from './pages/OrderListPage';

const router = createBrowserRouter(
  [
    {
      path: '/',
      element: <App />,
      children: [
        {
          path: '',
          element: <ProductPage />,
        },
        {
          path: '/cart',
          element: <CartPage />,
        },
        {
          path: '/order-list',
          element: <OrderListPage />,
        },
      ],
    },
  ],
  { basename: process.env.PUBLIC_URL }
);

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <GlobalStyle />
    <RouterProvider router={router} />
  </React.StrictMode>
);
