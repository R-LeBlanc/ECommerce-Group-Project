import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";

// this page will show a single item selected from the Homepage.
const SingleItemPage = () => {
  const [add, setAdd] = useState("add to cart");
  const { _id } = useParams();
  const [items, setItems] = useState(null);

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
  console.log(items);
  return (
    <>
      <Wrapper>
        <img src={items.imageSrc} />
        <SubContainer>
          <p>{items.name}</p>
          <p>{items.price}</p>
          <p>we have {items.numInStock} in stock act fast!!</p>

          <Button onClick={() => setAdd("added to your cart")}>{add}</Button>
        </SubContainer>
      </Wrapper>
    </>
  );
};

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
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: Arial, Helvetica, sans-serif;
`;
const SubContainer = styled.div`
  display: block;
  margin-left: 25px;
  width: 200px;
`;
export default SingleItemPage;
