import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

// after you make a purchase you will be automatically redirected to this page
const ConfirmationPage = () => {
  return (
    <>
      <Container>
        <Img src="../5.png" />
        <SubContainer>
          <Wrapper>
            <Title>Thank you for your purchase </Title>
            <Info>
              <Bold>Confirmation number: </Bold>
            </Info>
            <Info>
              <Bold> Items purchased: </Bold>
            </Info>
            <Info>
              <Bold>Name: </Bold>
            </Info>
            <Info>
              <Bold>Address </Bold>
            </Info>
            <Info>
              <Bold>A confirmation email was sent to:</Bold>
            </Info>
          </Wrapper>
        </SubContainer>
        <Img src="../1.png" />
      </Container>
      <BtnContainer>
        <Link to="/products" style={{ textDecoration: "none" }}>
          <Button>Go back to shopping</Button>
        </Link>
      </BtnContainer>
    </>
  );
};
const BtnContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 30px;
`;
const Button = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 40px;
  width: 550px;
  height: 50px;
  background-color: var(--color-secondary);
  cursor: pointer;
  border: none;
  border-radius: 10px;
  color: white;
`;
const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;
const Wrapper = styled.div`
  display: grid;
  justify-content: center;
  margin-top: 100px;
  border: solid 1px #6d807b;
  padding: 20px;
  border-radius: 10px;
`;

const Img = styled.img`
  height: 150px;
  width: 150px;
`;
const Info = styled.div`
  display: flex;
  margin-top: 30px;
`;
const SubContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const Bold = styled.span`
  font-weight: bold;
  margin-right: 10px;
`;

const Title = styled.h1`
  font-size: 30px;
`;

export default ConfirmationPage;
