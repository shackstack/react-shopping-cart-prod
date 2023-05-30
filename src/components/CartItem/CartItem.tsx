import { styled } from 'styled-components';
import ProductImg from '../ProductCard/ProductImg/ProductImg';
import { ReactComponent as TrashCan } from '../../assets/icon/trash-can.svg';
import Counter from '../common/Counter/Counter';
import CheckBox from '../common/CheckBox/CheckBox';
import { Select } from '../CartItemList/CartItemList';
import { WIDTH } from '../../styles/mediaQuery';
import useFetchCart from '../../hooks/useFetchCart';
import { Cart } from '../../types/responseData';

interface CartItemProps {
  cart: Cart;
  cartItemState: Select;
  setIsSelectedList: React.Dispatch<React.SetStateAction<Select[]>>;
  setIsAllSelected: React.Dispatch<React.SetStateAction<boolean>>;
}

const CartItem = ({
  cart,
  cartItemState,
  setIsSelectedList,
  setIsAllSelected,
}: CartItemProps) => {
  const { id, product, quantity } = cart;
  const { name, imageUrl, price } = product;
  const { updateCartItem, deleteCartItem } = useFetchCart();

  const toggleSelect = () => {
    setIsAllSelected(false);

    setIsSelectedList((prev) => [
      ...prev.filter((item) => item.id !== id),
      { id, isSelected: !cartItemState.isSelected },
    ]);
  };

  const onClickDelete = () => {
    deleteCartItem(id);
  };

  const plusOne = () => {
    if (!id || !quantity) return;

    updateCartItem(id, quantity + 1);
  };

  const minusOne = () => {
    if (!id || !quantity || quantity <= 1) return;

    updateCartItem(id, quantity - 1);
  };

  return (
    <Wrapper>
      <CheckBoxWrapper>
        <CheckBox checked={cartItemState.isSelected} onClick={toggleSelect} />
      </CheckBoxWrapper>

      <ProductImgContainer>
        <ProductImg imageUrl={imageUrl} />
      </ProductImgContainer>

      <DetailWrapper>
        <ProductName>{name}</ProductName>
        <DeleteButton onClick={onClickDelete}>
          <TrashCan />
        </DeleteButton>
        <CounterWrapper>
          <Counter plusOne={plusOne} minusOne={minusOne} quantity={quantity} />
        </CounterWrapper>
        <Price>{(price * quantity).toLocaleString()}원</Price>
      </DetailWrapper>
    </Wrapper>
  );
};

const Wrapper = styled.li`
  display: flex;
  align-items: center;

  width: 100%;
  height: 160px;
  min-width: ${WIDTH.SM};

  @media (max-width: ${WIDTH.LG}) {
    width: 90vw;

    font-size: 12px;
  }
`;

const CheckBoxWrapper = styled.div`
  height: 100%;

  padding: 8px 12px;
`;

const ProductName = styled.div`
  width: 85%;
`;

const ProductImgContainer = styled.div`
  display: flex;
  align-items: center;

  width: 144px;
  height: 144px;
  overflow: hidden;
`;

const DetailWrapper = styled.div`
  position: relative;

  flex: 1;
  height: 100%;

  padding: 12px;
`;

const DeleteButton = styled.button`
  position: absolute;

  top: 12px;
  right: 12px;
`;

const CounterWrapper = styled.div`
  position: absolute;

  top: 64px;
  right: 12px;
`;

const Price = styled.span`
  position: absolute;

  bottom: 12px;
  right: 12px;
`;
export default CartItem;
