import { Link } from 'react-router-dom';
import { styled } from 'styled-components';
import { ReactComponent as ShoppingCartIcon } from '../../assets/icon/tiffany-co.svg';
import { WIDTH } from '../../styles/mediaQuery';
import { useRecoilState, useResetRecoilState } from 'recoil';
import { ServerName, serverAtom } from '../../store/server';
import CartTextButton from './CartTextButton/CartTextButton';
import { PATH } from '../../store/path';
import { cartAtom } from '../../store/cart';

const Header = () => {
  const [serverName, setServerName] = useRecoilState(serverAtom);
  const resetCartList = useResetRecoilState(cartAtom);

  const onChangeServerNameHandler = (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const serverName = e.target.value as ServerName;
    setServerName(() => serverName);
    resetCartList();
  };

  return (
    <Container>
      <Link to='/'>
        <HomeButton>
          <ShoppingCartIconContainer>
            <ShoppingCartIcon width='100%' />
          </ShoppingCartIconContainer>
        </HomeButton>
      </Link>
      <ButtonContainer>
        <ServerSelectBox
          defaultValue={serverName}
          onChange={onChangeServerNameHandler}>
          <option value='SPLIT'>스플릿</option>
          <option value='ROY'>로이</option>
          <option value='IRAE'>이레</option>
        </ServerSelectBox>
        <Link to={PATH.ORDER_LIST_PAGE}>
          <OrderListButton>Orders</OrderListButton>
        </Link>
        <Link to={PATH.CART_PAGE}>
          <CartTextButton />
        </Link>
      </ButtonContainer>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  height: 75px;

  margin: 0;
  padding: 18px 15%;

  background: var(--main-bg-color);

  min-width: ${WIDTH.SM};

  @media (max-width: ${WIDTH.LG}) {
    padding: 8px 16px;
  }

  @media (max-width: ${WIDTH.MD}) {
    h1 {
      font-size: 20px;
    }

    h2 {
      font-size: 16px;
    }
  }
`;

const HomeButton = styled.div`
  display: flex;
  align-items: center;
  gap: 9px;

  background-color: transparent;

  cursor: pointer;

  @media (max-width: ${WIDTH.MD}) {
    gap: 4px;
  }
`;

const ServerSelectBox = styled.select`
  display: flex;
  align-items: center;

  width: 70px;
  height: 30px;
  padding-left: 2px;

  border: none;

  color: #fff;
  font-size: 16px;

  background-color: transparent;
`;

const ShoppingCartIconContainer = styled.div`
  padding-top: 10px;
  width: 200px;
  fill: #fff;
  padding-bottom: 10px;

  @media (max-width: ${WIDTH.MD}) {
    width: 160px;
  }
`;

const OrderListButton = styled.h2`
  color: white;
  font-size: 24px;
  font-weight: 300;

  cursor: pointer;
`;

const ButtonContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 24px;

  @media (max-width: ${WIDTH.MD}) {
    gap: 16px;
  }
`;

export default Header;
