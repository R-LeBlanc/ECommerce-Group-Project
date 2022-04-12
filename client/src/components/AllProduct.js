import React, { useState, useContext, useEffect } from "react";
import styled from "styled-components";

import { Link } from "react-router-dom";

import { ProductsContext } from "./ProductContext";
import { CartContext } from "./CartContext";
import FilterBar from "./FilterBar";

const AllProduct = () => {
  const { allProducts } = React.useContext(ProductsContext);
  const { cartState, addToCart } = useContext(CartContext);
  const [add, setAdd] = useState("add to cart");
  const [filteredArray, setFilteredArray] = useState([]);
  const [filters, setFilters] = useState({
    isFiltering: false,
    brand: null,
    location: null,
    sortBy: null,
  });

  // Sorting helper functions
  // will reformat the price into a plain interger and sort by ascending
  const sortByAsc = (array) => {
    array.sort(function (a, b) {
      let x = a.price.slice(1).replace(/,/g, "");
      let y = b.price.slice(1).replace(/,/g, "");
      return parseInt(x) - parseInt(y);
    });
    return array;
  };
  // will reformat the price into a plain interger and sort by decending
  const sortByDec = (array) => {
    array.sort(function (a, b) {
      let x = a.price.slice(1).replace(/,/g, "");
      let y = b.price.slice(1).replace(/,/g, "");
      return parseInt(x) - parseInt(y);
    });
    return array.reverse();
  };

  useEffect(() => {
    // This will filter through the allProducts array and return the products
    // that match with the filter brand.
    // Is called every time the filter updates
    if (filters.brand) {
      let array = filteredArray.length > 0 ? filteredArray : allProducts;
      setFilteredArray(
        array.filter((product) => product.companyId === filters.brand)
      );
    }
    // filters the body location
    if (filters.location) {
      let array = filteredArray.length > 0 ? filteredArray : allProducts;
      setFilteredArray(
        array.filter((product) => product.body_location === filters.location)
      );
    }

    if (filters.sortBy === 0) {
      // have to use a spread operator to copy an array
      // otherwise it will BE the array
      let copy = [...allProducts];
      // if the filteredArray exists then use the filteredArray, otherwise use the copy of the allProducts array
      let array = filteredArray.length > 0 ? filteredArray : copy;
      setFilteredArray(sortByAsc(array));
    }

    if (filters.sortBy === 1) {
      // have to use a spread operator to copy an array
      // otherwise it will BE the array
      let copy = [...allProducts];
      // if the filteredArray exists then use the filteredArray, otherwise use the copy of the allProducts array
      let array = filteredArray.length > 0 ? filteredArray : copy;
      setFilteredArray(sortByDec(array));
    }
  }, [filters]);

  if (!allProducts) {
    return <div>...loading</div>;
  }
  function handleClickDetails(event) {
    event.stopPropagation();
  }
  // map to display all products
  const renderItem = (array) => {
    return array.map((product) => {
      // console.log({product});
      return (
        <Wrapper key={product._id}>
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
  };

  return (
    <>
      <FilterBar
        filters={filters}
        setFilters={setFilters}
        setFilteredArray={setFilteredArray}
      />
      {filteredArray.length === 0 && filters.isFiltering && (
        <>
          <h2>No Products Found</h2>{" "}
          <p>Please press the clear button and try again</p>{" "}
        </>
      )}
      <ItemWrapper>
        {/* will render either the allProducts array or the filtered array */}
        {filters.isFiltering
          ? renderItem(filteredArray)
          : renderItem(allProducts)}
      </ItemWrapper>
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
  justify-content: center;
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
