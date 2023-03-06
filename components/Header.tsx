import React, { useContext } from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { solid } from '@fortawesome/fontawesome-svg-core/import.macro';
import { BasketContext } from '../pages/_app';

const Container = styled.div`
  width: 100%;
  margin: 0;
  padding: 8rem 0 2rem 0;

  background-color: #9ccda1;
  font-size: 1.8rem;
  text-align: center;
`;

const ShoppingCart = styled.div`
  position: absolute;
  top: 10px;
  right: 10px;

  cursor: pointer;

  svg {
    height: 2rem;
  }
`;

const CartBadge = styled.span`
  position: absolute;
  bottom: 0;
  left: 0;
  background-color: #d23636;
  color: white;
  border-radius: 100px;
  height: 20px;
  width: 20px;
  font-size: 15px;
`;

export const PageHeader: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const { products, toggleBasketModal } = useContext(BasketContext);

  const basketSize = products?.reduce((acc, { quantity }) => quantity + acc, 0);

  return (
    <Container>
      <ShoppingCart onClick={toggleBasketModal}>
        <FontAwesomeIcon icon={solid('cart-shopping')} />
        {basketSize ? <CartBadge>{basketSize}</CartBadge> : null}
      </ShoppingCart>
      <h1>{children}</h1>
    </Container>
  );
};
