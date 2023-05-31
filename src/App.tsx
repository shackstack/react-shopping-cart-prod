import React from 'react';
import { Outlet } from 'react-router-dom';
import { RecoilRoot } from 'recoil';
import { styled } from 'styled-components';
import Header from './components/Header/Header';
import OnLoading from './components/OnLoading/OnLoading';
import { WIDTH } from './styles/mediaQuery';

const App = () => {
  return (
    <RecoilRoot>
      <React.Suspense fallback={<OnLoading />}>
        <Header />
        <Layout>
          <Outlet />
        </Layout>
      </React.Suspense>
    </RecoilRoot>
  );
};

export default App;

const Layout = styled.div`
  display: flex;
  justify-content: center;

  padding: 32px 0px;

  width: 100%;
  min-width: ${WIDTH.SM};

  @media (max-width: ${WIDTH.LG}) {
    padding: 24px 0px;
  }
`;
