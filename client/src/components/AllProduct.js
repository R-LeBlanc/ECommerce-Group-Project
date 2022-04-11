import React, { useState, useContext } from "react";
import styled from "styled-components";

import { Link } from "react-router-dom";

import { ProductsContext } from "./ProductContext";
import { CartContext } from "./CartContext";

const AllProduct = () => {
  const { allProducts } = React.useContext(ProductsContext);
  const { cartState, addToCart } = useContext(CartContext);
  // console.log({ cartState });
  const [add, setAdd] = useState("add to cart");

  if (!allProducts) {
    return <div>...loading</div>;
  }
  function handleClickDetails(event) {
    event.stopPropagation();
  }

  // map to display all products
  const item = allProducts.map((product) => {
    return (
      <Wrapper key={product._id}>
        <WidthControl>
          <Link to={`/products/${product._id}`} onClick={handleClickDetails}>
            <ProductImg src={product.imageSrc} />
          </Link>
          <SubContainer>
            <NameDiv>
              <h2> {product.name}</h2>
            </NameDiv>
            <InfoPar>{product.price}</InfoPar>
            <InfoPar>
              {product.numInStock ? (
                <span>{product.numInStock} in stock</span>
              ) : (
                <span>out of stock</span>
              )}
            </InfoPar>
          </SubContainer>
          <Button
              id={product._id}
              className="unclicked"
              onClick={() => {
                addToCart({
                  _id: product._id,
                  name: product.name,
                  price: product.price,
                  stock: product.numInStock,
                  quantityInCart: 1,
                  companyId: product.companyId,
                  body_location: product.body_location,
                  category: product.category,
                  img: product.imageSrc,
                });
                setAdd("Added to your cart");
              }}
            >
              {add}
            </Button>
        </WidthControl>
      </Wrapper>
    );
  });
  return (
    <>
      <ItemWrapper>{item}</ItemWrapper>
    </>
  );
};
const WidthControl = styled.div`
  width: 300px;
  display: flex;
  flex-direction: column;
`;

const ImgLink = styled(Link)`
  display: flex;
  align-self: center;
  justify-content: center;
`
const ProductImg = styled.img`
  height: 190px;
  /* align-self: center;
  justify-self: center; */
  display: block;
  margin-left: auto;
  margin-right: auto;
  /* width: 40%; */
`

const NameDiv = styled.div`
padding: 30px 0 0px 0;
height: 80px;
`

const ItemWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin-left: 20px;
  margin-right: 20px;
  align-items: baseline;
`;

const InfoPar = styled.p`
margin-bottom: 5px;
`
const Button = styled.button`
  width: 200px;
  height: 30px;
  background-color: var(--color-secondary);
  cursor: pointer;
  border: none;
  border-radius: 10px;
  color: white;
  margin-bottom: 30px;
  align-self: center;
  /* justify-self: center; */
`;
const Wrapper = styled.div`
  display: flex;
  align-items: space-between;
  flex-direction: column;
  border-radius: 5px;
  margin: 30px 15px 0px 15px;
  padding: 25px 15px 5px 15px;
  /* Box shadow - secondary colour */
  box-shadow:0 2px 4px 1px rgba(219, 198, 173, 0.4), 0 4px 4px 1px rgba(219, 198, 173, 0.4), -1px -1px 2px 1px rgba(219, 198, 173, 0.4);
  /* Box-shadow - primary colour */
  /* box-shadow: 0 2px 4px 1px rgba(147, 147, 143, 0.2), 0 4px 4px 1px rgba(147, 147, 143, 0.2), -1px -1px 2px 1px rgba(147, 147, 143, 0.2); */

`;
const SubContainer = styled.div`
  display: block;
  margin: 0px 0 0 25px;
  height: 170px;
`;

export default AllProduct;
