import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import GlobalStyle from './styles/GlobalStyle';
import ROUTER from './routes';
import { RecoilRoot } from 'recoil';
import { worker } from './mocks/browser';

worker.start();

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <RecoilRoot>
      <GlobalStyle />
      <RouterProvider router={ROUTER} />
    </RecoilRoot>
  </React.StrictMode>
);
