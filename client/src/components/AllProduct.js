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
    // console.log({product});
    return (
      <Wrapper>
        <Test>
          <Link to={`/products/${product._id}`} onClick={handleClickDetails}>
            <img src={product.imageSrc} />
          </Link>
          <SubContainer>
            <h2> {product.name}</h2>
            <p>{product.price}</p>

            <p>
              {product.numInStock ? (
                <span>in Stock</span>
              ) : (
                <span>out of stock</span>
              )}
            </p>

            <Button
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
          </SubContainer>
        </Test>
      </Wrapper>
    );
  });
  return (
    <>
      <ItemWrapper>{item}</ItemWrapper>
    </>
  );
};
const Test = styled.div`
  width: 300px;
`;

const ItemWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin-left: 20px;
  margin-right: 20px;
  align-items: baseline;
`;

const Button = styled.button`
  width: 200px;
  height: 30px;
  background-color: var(--color-secondary);
  cursor: pointer;
  border: none;
  border-radius: 10px;
  color: white;
  margin-bottom: 30px;
`;
const Wrapper = styled.div`
  display: flex;
  align-items: space-between;
  flex-direction: column;
`;
const SubContainer = styled.div`
  display: block;
  margin-left: 25px;
  height: 200px;
`;
export default AllProduct;
