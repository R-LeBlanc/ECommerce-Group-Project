import { useState, useEffect } from "react";
import Header from "./header";
import SingleItemPage from "./SingleItemPage";
import { BrowserRouter as Router } from "react-router-dom";
import { Routes, Route } from "react-router";
import AllProduct from "./AllProduct";
import Cart from "./Cart";
import GlobalStyles from "./GlobalStyles";

function App() {
  return (
    <>
      <GlobalStyles />
      <Router>
        <Header></Header>
        <Routes>
          <Route path="/products/:_id" element={<SingleItemPage />} />
          <Route path="/products" element={<AllProduct />} />
          <Route path="/cart" element={<Cart/>} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
