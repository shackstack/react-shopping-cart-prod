import { styled } from 'styled-components';
import { WIDTH } from '../styles/mediaQuery';
import OrderList from '../components/OrderList/OrderList';

const OrderListPage = () => {
  return (
    <Wrapper>
      <Title>주문 목록</Title>
      <OrderListContainer>
        <OrderList />
      </OrderListContainer>
    </Wrapper>
  );
};

export default OrderListPage;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  width: 100%;

  @media (max-width: ${WIDTH.LG}) {
    justify-content: start;
  }
`;

const Title = styled.div`
  width: 70%;

  padding: 16px;

  text-align: center;
  font-weight: bold;
  font-size: 32px;

  border-bottom: 4px solid #333333;

  @media (max-width: ${WIDTH.LG}) {
    padding: 4px;
    font-size: 24px;
  }
`;

const OrderListContainer = styled.div`
  width: 70%;

  padding: 32px 0px;
`;
