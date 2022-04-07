import React, {useContext} from 'react';
// import { Cart } from './CartContext';
import { ProductsContext } from "./ProductContext";
import { CartContext } from "./CartContext";
import { Link } from "react-router-dom";
import styled from 'styled-components';

const Cart = () => {
    const { allProducts } = React.useContext(ProductsContext);
    const { cartState, addToCart } = useContext(CartContext);

    function findProductImg(product){
        for (let i=0; i < allProducts.length; i++){
            if (allProducts[i]._id === product._id){
                return allProducts[i].imageSrc
            }
        }
    }

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
                        </ProductInfo>
                        {/* <Button
                            onClick={() => {
                                addToCart({
                                _id: product._id,
                                name: product.name,
                                price: product.price,
                                stock: product.numInStock,
                                companyId: product.companyId,
                                body_location: product.body_location,
                                category: product.category,
                                findProductImg: product.imageSrc,
                                });
                                setAdd("Added to your cart");
                            }}
                            >
                            {add}
                        </Button> */}
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
        </PurchaseForm>
        </Wrapper>
        
        </>
    )
}

export default Cart;

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
