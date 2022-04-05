import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import SingleItemPage from "./SingleItemPage";
// this page will show all products from the database
const AllProduct = ({ _id }) => {
  const [allProducts, setAllProducts] = useState(null);

  const [add, setAdd] = useState("add to cart");
  //fetch to the database to display all items
  useEffect(() => {
    const allItems = async () => {
      const response = await fetch(`/products`);
      const data = await response.json();

      setAllProducts(data.data);
    };
    allItems();
  }, []);
  //loading
  if (!allProducts) {
    return <div>...loading</div>;
  }
  function handleClickDetails(event) {
    event.stopPropagation();
  }
  // map to display all products
  const item = allProducts.map((product) => {
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
          </SubContainer>
        </Test>
        <div>
          {product.numInStock ? (
            <Button onClick={() => setAdd("added to your cart")}>{add}</Button>
          ) : undefined}
        </div>
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
