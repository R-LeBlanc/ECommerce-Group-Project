// THIS CONTEXT HANDLES SHOPPING CART-RELATED STATE AND EVENTS

import React, { createContext, useState, useReducer } from "react";

export const CartContext = createContext(null);

const initialCartState = {
  user: null,
  items: [],
};

// this reducer function will govern changes to the cart's state
function cartReducer(cartState, action) {
  switch (action.type) {
    // this case will require more logic
    // (ex: only add item if item not in items array, etc)
    case "ADD-TO-CART":
      return {
        ...cartState,
        items: [...cartState.items, action.payload],
      };
    case "INCREASE-QUANTITY":
      return action.payload;
    case "DECREASE-QUANTITY":
      return action.payload;
    case "REMOVE-FROM-CART":
      return action.payload;
    case "RESET-CART":
      return initialCartState;
    default:
      console.log("Error");
      return cartState;
  }
}

export const CartProvider = ({ children }) => {
  const [cartState, cartDispatch] = useReducer(cartReducer, initialCartState);
  const [forceRerender, setForceRerender] = useState(false);
  const [info, setInfo] = useState(null);
  // triggers useEffect in ProductProvider
  const [flipState, setFlipState] = useState(false);

  // the following functions manipulate cartState by calling dispatch
  // they also ensure that cartState is updated synchronously

  function addToCart(val) {
    let arrayOfDuplicate = [];
    let newCartState = cartState;
    let targetItem;
    let targetItemPosition;

    for (let i = 0; i < newCartState.items.length; i++) {
      if (newCartState.items[i]._id === val._id) {
        arrayOfDuplicate.push(newCartState.items[i]._id);
        targetItemPosition = i;
      }
    }

    if (arrayOfDuplicate.length > 0) {
      newCartState.items.forEach((el) => {
        if (el._id === arrayOfDuplicate[0]) {
          targetItem = el;
          targetItem.quantityInCart += 1;
        }
      });

      newCartState.items.splice(targetItemPosition, 1);

      newCartState.items.splice(targetItemPosition, 0, targetItem);

      cartDispatch({ type: "INCREASE-QUANTITY", payload: newCartState });
      setForceRerender(!forceRerender);
    } else {
      cartDispatch({ type: "ADD-TO-CART", payload: val });
      setForceRerender(!forceRerender);
    }
  }

  function removeFromCart(val) {
    let newCartState = cartState;
    let targetItem;
    let targetItemPosition;

    console.log({ newCartState });

    for (let i = 0; i < newCartState.items.length; i++) {
      if (newCartState.items[i]._id === val._id) {
        targetItemPosition = i;
      }
    }
    console.log({ targetItemPosition });

    if (newCartState.items[targetItemPosition].quantityInCart <= 1) {
      newCartState.items.splice(targetItemPosition, 1);
      cartDispatch({ type: "REMOVE-FROM-CART", payload: newCartState });
      setForceRerender(!forceRerender);
    } else {
      newCartState.items.forEach((el) => {
        if (el._id === newCartState.items[targetItemPosition]._id) {
          targetItem = el;
          targetItem.quantityInCart -= 1;
        }
      });

      console.log({ targetItem });

      newCartState.items.splice(targetItemPosition, 1);

      console.log("newCartState after removal: ", newCartState);

      newCartState.items.splice(targetItemPosition, 0, targetItem);

      console.log("newCartState after adding targetItem: ", newCartState);

      cartDispatch({ type: "DECREASE-QUANTITY", payload: newCartState });
      setForceRerender(!forceRerender);
    }
  }

  function resetCart() {
    cartDispatch({ type: "RESET-CART" });
    setForceRerender(!forceRerender);
  }

  return (
    <CartContext.Provider
      value={{
        forceRerender,
        cartState,
        addToCart,
        removeFromCart,
        resetCart,
        info,
        setInfo,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
