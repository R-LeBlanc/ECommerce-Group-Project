// THIS CONTEXT HANDLES SHOPPING CART-RELATED STATE AND EVENTS

import React, {createContext, useState, useReducer} from "react";


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
        // more cases will go here.
        // (ex: "REMOVE-FROM-CART", "RESET-CART", etc)
        default:
            console.log("Error");
            return cartState;
    }
}


export const CartProvider = ({children}) => {

    const [cartState, cartDispatch] = useReducer(cartReducer, initialCartState);
    
    // triggers useEffect in ProductProvider
    const [flipState, setFlipState] = useState(false);

    // functions like this one will call dispatch.
    // they are used to ensure cartState is updated synchronously,
    // and to adhere to single-responsibility principles
    function addToCart(val){
        cartDispatch({type: "ADD-TO-CART", payload: val});
    }


    return (
        <CartContext.Provider
        value={{
            cartState, 
            addToCart,
        }}
        >
            {children}
        </CartContext.Provider>
    )
}