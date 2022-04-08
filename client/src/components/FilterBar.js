import React from "react";
import styled from "styled-components";

import { ProductsContext } from "./ProductContext";

const FilterBar = () => {
  const { allProducts } = React.useContext(ProductsContext);
  const [company, setCompany] = React.useState(false);
  const [location, setLocation] = React.useState(false);
  const [sort, setSort] = React.useState(false);

  //   Creates an array of of all the body_locations in the allProducts array
  const bodyLocation = allProducts.map((product) => {
    return product.body_location;
  });
  // Creates a new Set with the bodyLocation array
  // so that we get an array with unique items
  const uniqueLocations = [...new Set(bodyLocation)];

  //   console.log(uniqueLocations);

  const handleCompanyHover = () => {
    if (company) {
      setCompany(false);
    } else {
      setCompany(true);
    }
  };

  const handleLocationHover = () => {
    if (location) {
      setLocation(false);
    } else {
      setLocation(true);
    }
  };

  const handleSortHover = () => {
    if (sort) {
      setSort(false);
    } else {
      setSort(true);
    }
  };

  return (
    <>
      <Wrapper>
        <Title>Shop</Title>
        <FilterWrap>
          <CompanyWrap onMouseLeave={handleCompanyHover}>
            <Company onMouseEnter={handleCompanyHover}>Company</Company>
            {/* if the Company div is hovered over, the dropdown menu will show */}
            {company && (
              <CompanyDropdown>
                <Item>Belkin</Item>
                <Item>Garmin</Item>
                <Item>Lifetrak</Item>
                <Item>Mio</Item>
              </CompanyDropdown>
            )}
          </CompanyWrap>
          <LocationWrap onMouseLeave={handleLocationHover}>
            <BodyLocation onMouseEnter={handleLocationHover}>
              Body Location
            </BodyLocation>
            {/* if the BodyLocation div is hovered over, the dropdown menu will show */}
            {location && (
              <LocationDropdown>
                {uniqueLocations.map((location) => {
                  return <Item key={location}>{location}</Item>;
                })}
              </LocationDropdown>
            )}
          </LocationWrap>
          <SortWrap onMouseLeave={handleSortHover}>
            <Sort onMouseEnter={handleSortHover}>Sort</Sort>
            {/* if the Sort div is hovered over, the dropdown menu will show */}
            {sort && (
              <SortDropdown>
                <Item>By Price: Low to High</Item>
                <Item>By Price: High to Low</Item>
              </SortDropdown>
            )}
          </SortWrap>
        </FilterWrap>
      </Wrapper>
    </>
  );
};

export default FilterBar;

const Wrapper = styled.div`
  box-shadow: 0 10px 5px -5px lightgrey;
  display: flex;
  flex-direction: column;
  padding: 20px 0 55px;
  margin-bottom: 30px;
`;

const Title = styled.h2`
  color: var(--color-secondary);
  display: flex;
  font-size: 2.5rem;
  justify-content: center;
  padding-bottom: 30px;
`;

const FilterWrap = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  font-family: var(--font-body);
`;

const Company = styled.div`
  border-bottom: 3px solid var(--color-primary);
  border-radius: 10px;
  cursor: pointer;
  font-size: 1.5rem;
  padding: 10px 0;
  text-align: center;
  width: 25vw;

  &:hover {
    background-color: lightgrey;
  }
`;

const CompanyWrap = styled.div``;

const CompanyDropdown = styled.div`
  box-shadow: -7px 5px 5px lightgrey, 7px 5px 5px lightgrey;
  background-color: white;
  border-radius: 10px;
  position: absolute;
  width: 25vw;
`;

const Item = styled.div`
  cursor: pointer;
  display: flex;
  justify-content: center;
  padding: 10px 0;

  &:hover {
    background-color: lightgrey;
  }
`;

const LocationWrap = styled.div``;

const BodyLocation = styled.div`
  border-bottom: 3px solid var(--color-primary);
  border-radius: 10px;
  cursor: pointer;
  font-size: 1.5rem;
  padding: 10px 0;
  text-align: center;
  width: 25vw;

  &:hover {
    background-color: lightgrey;
  }
`;

const LocationDropdown = styled.div`
  box-shadow: -7px 5px 5px lightgrey, 7px 5px 5px lightgrey;
  background-color: white;
  border-radius: 10px;
  position: absolute;
  width: 25vw;
`;

const SortWrap = styled.div``;

const Sort = styled.div`
  border-bottom: 3px solid var(--color-primary);
  border-radius: 10px;
  cursor: pointer;
  font-size: 1.5rem;
  padding: 10px 0;
  text-align: center;
  width: 25vw;

  &:hover {
    background-color: lightgrey;
  }
`;

const SortDropdown = styled.div`
  box-shadow: -7px 5px 5px lightgrey, 7px 5px 5px lightgrey;
  background-color: white;
  border-radius: 10px;
  position: absolute;
  width: 25vw;
`;
