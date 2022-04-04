import React, {createContext, useEffect, useState} from "react";

export const ProductsContext = createContext(null);

export const ProductsProvider = ({children}) => {

    const [allProducts, setAllProducts] = useState("");

    async function getAllProducts(){
        const response = await fetch(`/products`);
        const data = await response.json();
        setAllProducts(data.data);
    }

    // fetching all products from DB.
    useEffect(() => {
        getAllProducts();
    }, [])

    return (
        <ProductsContext.Provider
        value={{allProducts}}
        >
            {children}
        </ProductsContext.Provider>
    )
}