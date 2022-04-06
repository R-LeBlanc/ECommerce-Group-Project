import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const DropdownMenu = () => {
  return (
    <>
      <Wrapper>
        <LifeStyle>
          <Img src="../lions.jpg" />
          <Text>Lifestyle</Text>
        </LifeStyle>
        <Fitnes>
          <Img src="../cheeta.jpg" />
          <Text>Fitness</Text>
        </Fitnes>
        <Medical>
          <Img src="../scared-cat.jpg" />
          <Text>Medical</Text>
        </Medical>
        <Entertainment>
          <Img src="../funny-cat.jpg" />
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
  display: flex;
  left: 0;
  position: absolute;
  top: 60px;
  width: 100%;
  z-index: 5;
`;

const LifeStyle = styled.div`
  height: 30vh;
  width: 25vw;
`;

const Fitnes = styled.div`
  height: 30vh;
  width: 25vw;
`;

const Medical = styled.div`
  height: 30vh;
  width: 25vw;
`;

const Entertainment = styled.div`
  height: 30vh;
  width: 25vw;
`;

const Img = styled.img`
  /* border: 1px solid white; */
  overflow: hidden;
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const Text = styled.h2`
  background-color: rgba(0, 0, 0, 0.4);
  color: white;
  padding: 15px 0;
  text-align: center;
  z-index: 10;
  bottom: 0;
  position: absolute;
  width: 25vw;
`;
