import React, {useContext} from 'react';
import { ProductsContext } from "./ProductContext";
import { CartContext } from "./CartContext";
import { Link } from "react-router-dom";
import styled from 'styled-components';

const Cart = () => {
    const { allProducts } = React.useContext(ProductsContext);
    const { 
        forceRerender,
        cartState,
        addToCart,
        removeFromCart, 
        resetCart } = useContext(CartContext);

    // Could not render product image from CartState
    // This function allows each CartItem to grab product image from allProducts 
    function findProductImg(product){
        for (let i=0; i < allProducts.length; i++){
            if (allProducts[i]._id === product._id){
                return allProducts[i].imageSrc
            }
        }
    }
    if (!forceRerender || cartState.items.length > 0){
    return (
        <>
        <Wrapper>
            <CartHeading>Your Items</CartHeading>
            <ItemsWrapper>
                {cartState.items.map((el) => {
                    return (
                    <CartItem id={el._id} key={el._id}>
                        <ProductImg src={findProductImg(el)}/>
                        <ProductInfo>
                            <span>{el.name}</span>
                            <span>Price: {el.price}</span>
                            <span>
                                {
                                el.stock > 0 
                                ? `${el.stock} in stock`
                                : "Item is out of stock"
                                }
                            </span>
                            <span>Quantity in cart: {el.quantityInCart}</span>
                        </ProductInfo>
                        <ButtonDiv>
                        <Button
                            onClick={() => {
                                addToCart({
                                    _id: el._id,
                                    // name: el.name,
                                    // price: el.price,
                                    // stock: el.numInStock,
                                    // quantityInCart: el.quantityInCart,
                                    // companyId: el.companyId,
                                    // body_location: el.body_location,
                                    // category: el.category,
                                    // img: el.imageSrc,
                                });
                            }}
                            >
                            Add one
                        </Button>
                        <Button
                            onClick={() => {
                                removeFromCart({
                                _id: el._id,
                                });
                            }}
                            >
                            Remove one
                        </Button>
                        </ButtonDiv>
                    </CartItem>
                    )
                })}
            </ItemsWrapper>
            <PurchaseForm 
            // onSubmit={handleFormSubmit}
            >
                <h3>Customer Information</h3>
                <TextArea 
                    type="text"
                    name="first-name" 
                    placeholder="First Name"
                    />
                <TextArea 
                    type="text"
                    name="last-name" 
                    placeholder="Last Name"
                    />
                <TextArea 
                    type="text"
                    name="email" 
                    placeholder="Email"
                    />
                <TextArea 
                    type="text"
                    name="address" 
                    placeholder="Address"
                    />
                    <FormParagraph>Please review your cart before placing your order.</FormParagraph>
                    <FormParagraph>Out-of-stock items will be placed on backorder, and payment will be collected upon placing order.</FormParagraph>
                <SubmitButton
                    type="submit" 
                    value="Click here to place your order."           
                    />
                <ResetCartButton
                    onClick={resetCart}>
                    Reset cart
                </ResetCartButton>
        </PurchaseForm>


        </Wrapper>
        
        </>
    )
    }
    else {
        return (
        <EmptyCartMessage>
            <h3>
                Your cart is empty
            </h3>
        </EmptyCartMessage>
        )
    }
}

export default Cart;

const EmptyCartMessage = styled.div`
    position: absolute;
    top: 45%;
    left: 45%;
    transform: (translate(-50%, -50%));
`

const Wrapper = styled.div`
    display: flex;
    /* flex-wrap: wrap; */
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
    position: absolute;
    left: 32%;
    top: 10%;
    transform: translateX(-50%);
    margin-top: 5vh;
    @media (max-width: 1439px) {
        left: 50%;
        transform: translateX(-50%);
        }
`
const CartHeading = styled.h2`
    text-align: center;
    margin-bottom: 40px;
    font-size: 2em;
    font-family: var(--font-body);
`
const ItemsWrapper = styled.div`
    display: flex;
    flex-wrap: wrap;
`
const CartItem = styled.div`
    flex: 49%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-around;
    margin-bottom: 30px;
    padding-right: 5px;
`
const ProductImg = styled.img`
    width:225px;
`
const ProductInfo = styled.div`
    display: flex;
    flex-direction: column;
`
const ButtonDiv = styled.div`
    width: 350px;
    display: flex;
    justify-content: space-around;
    align-items: space-around;
`
const PurchaseForm = styled.form`
    border: 1px solid var(--color-primary);
    border-radius: 5px;
    padding: 30px;
    height: 400px;
    width: 350px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-around;
    @media (min-width: 1440px) {
        width: 330px;
        height:400px;
        position: fixed;
        flex-direction: column;
        justify-content: space-around;
        right: -23vw;
        top: 10vh;
        }
`
const TextArea = styled.input`
    width: 300px;
`
const FormParagraph = styled.p`
    align-self: flex-start;
    margin-left: 10px;
`
const SubmitButton = styled.input`
    width: 200px;
    height: 30px;
    background-color: var(--color-secondary);
    cursor: pointer;
    border: none;
    border-radius: 10px;
    color: white;
    margin-bottom: 30px;
`
const Button = styled.button`
    width: 130px;
    height: 30px;
    background-color: var(--color-secondary);
    cursor: pointer;
    border: none;
    border-radius: 10px;
    color: white;
    margin-bottom: 30px;
`
const ResetCartButton = styled.button`
    width: 200px;
    height: 30px;
    background-color: var(--color-secondary);
    cursor: pointer;
    border: none;
    border-radius: 10px;
    color: white;
    margin-bottom: 30px;
`
