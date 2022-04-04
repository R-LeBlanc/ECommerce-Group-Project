import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
// the header should be shown at each page
const Header = () => {
  return (
    <>
      <Wrapper>
        <Logo>
          <Img src="../garfield.png" />
          <Title>Reservoir Cats</Title>
        </Logo>
        <Products>
          <AllProduct>All Products</AllProduct>

          <Categories>Categories</Categories>
        </Products>
        <SubContainer>
          <Signin>Sign in</Signin>
          <Cart>Cart</Cart>
        </SubContainer>
      </Wrapper>
    </>
  );
};
const Title = styled.h1`
  color: var(--color-accent);
`;
const Logo = styled.span`
  display: flex;
`;
const AllProduct = styled.span`
  margin-right: 10px;
`;
const Categories = styled.span``;
const Signin = styled.span`
  margin-right: 10px;
`;
const Cart = styled.span``;
const SubContainer = styled.span`
  display: flex;
  cursor: pointer;
`;
const Products = styled.span`
  display: flex;
  justify-content: center;
  cursor: pointer;
`;
const Img = styled.img`
  height: 50px;
  width: 40px;
`;

const Wrapper = styled.div`
  display: flex;
  height: 60px;
  justify-content: space-between;
  align-items: center;
  /* font-family: Arial, Helvetica, sans-serif; */
`;

export default Header;
