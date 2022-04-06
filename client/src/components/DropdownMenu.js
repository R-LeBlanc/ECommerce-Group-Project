import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const DropdownMenu = () => {
  return (
    <>
      <Wrapper>
        <LifeStyle>
          <Text>Lifestyle</Text>
        </LifeStyle>
        <Fitnes>
          <Text>Fitness</Text>
        </Fitnes>
        <Medical>
          <Text>Medical</Text>
        </Medical>
        <Entertainment>
          <Text>Entertainment</Text>
        </Entertainment>
      </Wrapper>
    </>
  );
};

export default DropdownMenu;

const Wrapper = styled.div`
  background-color: var(--color-primary);
  box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
  position: absolute;
  display: flex;
  justify-content: space-evenly;
  top: 60px;
  left: 0;
  width: 100%;
`;

const LifeStyle = styled.div`
  color: white;

  .p {
    color: white;
  }
`;

const Fitnes = styled.div``;

const Medical = styled.div``;

const Entertainment = styled.div``;

const Text = styled.p`
  color: white;
`;
