import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { CartContext } from "./CartContext";

// this page will show a single item selected from the Homepage.
const SingleItemPage = () => {
  const {cartState, addToCart} = useContext(CartContext);
  const [add, setAdd] = useState("add to cart");
  const { _id } = useParams();
  const [items, setItems] = useState(null);

  // console.log({cartState});

  useEffect(() => {
    const findItem = async () => {
      const response = await fetch(`/products/${_id}`);
      const data = await response.json();

      setItems(data.data);
    };
    findItem();
  }, []);
  if (!items) {
    return <div>...loading</div>;
  }
  // console.log(items);
  return (
    <>
      <Wrapper>
        <img src={items.imageSrc} />
        <SubContainer>
          <h2>{items.name}</h2>
          <p>{items.price}</p>
          <p>we have {items.numInStock} in stock act fast!!</p>
          <Button onClick={() => {
              addToCart({
                _id: items._id,
                name: items.name,
                price: items.price,
                stock: items.numInStock,
                companyId: items.companyId,
                body_location: items.body_location,
                category: items.category,
                img: items.imageSrc
              }); 
              setAdd("Added to your cart");
              console.log({cartState});
              }}>
                {add}
              </Button>
        </SubContainer>
      </Wrapper>
    </>
  );
};

const Button = styled.button`
  width: 200px;
  height: 30px;
  background-color: var(--color-secondary);
  cursor: pointer;
  border: none;
  border-radius: 10px;
  color: white;
`;
const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  /* font-family: Arial, Helvetica, sans-serif; */
`;
const SubContainer = styled.div`
  display: block;
  margin-left: 25px;
  width: 200px;
`;
export default SingleItemPage;
