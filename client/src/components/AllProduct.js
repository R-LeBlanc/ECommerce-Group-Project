import React, { useEffect, useState } from "react";
import styled from "styled-components";
const AllProduct = () => {
  const [allProducts, setAllProducts] = useState(null);
  const [add, setAdd] = useState("add to cart");
  useEffect(() => {
    const allItems = async () => {
      const response = await fetch(`/products`);
      const data = await response.json();

      setAllProducts(data.data);
    };
    allItems();
  }, []);
  if (!allProducts) {
    return <div>...loading</div>;
  }
  const item = allProducts.map((product) => {
    return (
      <Container>
        <Wrapper>
          <img src={product.imageSrc} />
          <SubContainer>
            <p> {product.name}</p>
            <p>{product.price}</p>
            <p>we have {product.numInStock}items in stock</p>
            <Button onClick={() => setAdd("added to your cart")}>{add}</Button>
          </SubContainer>
        </Wrapper>
      </Container>
    );
  });
  return (
    <>
      <div>{item}</div>
    </>
  );
};
const Container = styled.div`
  display: flex;
  justify-content: space-around;
`;

const Button = styled.button`
  width: 200px;
  height: 30px;
  background-color: #dbc6ad;
  cursor: pointer;
  border: none;
  border-radius: 10px;
  color: white;
`;
const Wrapper = styled.div`
  display: grid;
  grid-template-columns: auto auto auto;
  display: space-between;
  column-gap: 50px;
  row-gap: 50px;

  font-family: Arial, Helvetica, sans-serif;
`;
const SubContainer = styled.div`
  display: block;
  margin-left: 25px;
  width: 200px;
`;
export default AllProduct;
