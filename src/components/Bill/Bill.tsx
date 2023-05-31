import {
  useRecoilRefresher_UNSTABLE,
  useRecoilValue,
  useResetRecoilState,
  useSetRecoilState,
} from 'recoil';
import { styled } from 'styled-components';
import {
  cartAtom,
  isSelectedListAtom,
  totalAmountAtom,
} from '../../store/cart';
import { WIDTH } from '../../styles/mediaQuery';
import { useNavigate } from 'react-router-dom';
import { PATH } from '../../store/path';
import useFetchOrder from '../../hooks/useFetchOrder';
import { orderAtom } from '../../store/order';

const Bill = () => {
  const isSelectedList = useRecoilValue(isSelectedListAtom);
  const setCartList = useSetRecoilState(cartAtom);
  const refreshOrderList = useRecoilRefresher_UNSTABLE(orderAtom);
  const { postOrders } = useFetchOrder();
  const totalAmount = useRecoilValue(totalAmountAtom);
  const deliveryFee = totalAmount >= 100000 || totalAmount === 0 ? 0 : 4000;

  const navigate = useNavigate();

  const onClickOrder = async () => {
    const orders = isSelectedList
      .filter((item) => item.isSelected)
      .map((item) => item.order);
    await postOrders(orders);
    setCartList((prev) =>
      prev.filter((cart) => {
        if (orders.find((order) => order.id === cart.product.id)) return false;
        return true;
      })
    );
    refreshOrderList();
    navigate(`${PATH.ORDER_LIST_PAGE}`);
  };

  return (
    <Wrapper>
      <SubTitle>결제예상금액</SubTitle>
      <DetailWrapper>
        <Detail>
          총 상품가격 <span>{totalAmount.toLocaleString()} 원</span>
        </Detail>
        <Detail>
          총 배송비 <span>{deliveryFee.toLocaleString()} 원</span>
        </Detail>
        <Message>3만원 이상 주문시 3000원 할인</Message>
        <TotalAmount>
          총 주문금액
          <span>{(totalAmount + deliveryFee).toLocaleString()} 원</span>
        </TotalAmount>
        <OrderButton onClick={onClickOrder}>주문하기</OrderButton>
      </DetailWrapper>
    </Wrapper>
  );
};

export default Bill;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;

  height: 410px;
  width: 448px;
  min-width: 360px;

  border: 1px solid #dddddd;
  margin-top: 64px;

  @media (max-width: ${WIDTH.LG}) {
    width: 95vw;
  }
`;

const SubTitle = styled.div`
  width: 100%;

  border-bottom: 3px solid #dddddd;

  padding: 22px 30px;

  color: #333333;
  font-size: 24px;
`;

const DetailWrapper = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  gap: 24px;

  width: 100%;

  padding: 32px;
`;

const Detail = styled.div`
  display: flex;
  justify-content: space-between;

  font-size: 20px;
  font-weight: bold;
`;

const TotalAmount = styled(Detail)`
  margin: 12px 0px;
`;

const Message = styled.div`
  text-align: right;

  width: 100%;

  color: #747373;
`;

const OrderButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;

  height: 73px;
  width: 100%;

  color: #fff;
  font-size: 24px;

  background-color: #333333;
`;
