import { useCart } from "../hooks/useCart"
import { CartItem } from "../models/CartItem"
import { ICartActionType } from "../reducers/CartReducer"
import { IProduct } from "../types/Product"
import "../styles/cart.css"
import { useNavigate, Link } from "react-router"

export const Cart = () => {

    const {cart, dispatch} = useCart()
    const navigate = useNavigate()

    const totalPrice = cart.reduce((total, item: CartItem) => (
        total + (item.quantity * item.product.price)
    ), 0)

    const changeQuantity = (product: IProduct, quantity: number) => {
        dispatch ({
            type: ICartActionType.CHANGE_QUANTITY,
            payload: new CartItem(product, quantity)
        })
    }

    const removeItem = (item: CartItem) => {
        dispatch({
            type: ICartActionType.REMOVE_ITEM,
            payload: item
        })
    }

    const clearCart = () => {
        dispatch({
            type: ICartActionType.RESET_CART,
            payload: null
        })
    }


    return (
        <>
        <div className="container">
            <h3>My Cart</h3>
            {cart.length === 0 
                ? <h3>Your cart is currently empty. <br/><Link to="/products">Continue shopping</Link></h3> 
                : (
                    <>
                    <button className="clear-btn" onClick={clearCart}>Clear Cart</button>
                    <div className="cart-list">
                    {cart.map((item) => (
                    <div className="item-wrapper" key={item.product.id}>
                        <img src={item.product.image} className="item-img"/>
                        <div className="item-info">
                            <p className="item-name">{item.product.name}</p>
                            <p className="item-price">{item.product.price} kr</p>
                        </div>
                        <div className="quantity-change">
                            <button className="quantity-btn"
                                onClick={() => changeQuantity(item.product, -1)}
                            >-</button>
                            <span className="item-quantity">{item.quantity}</span>
                            <button className="quantity-btn"
                                onClick={() => changeQuantity(item.product, 1)}
                            >+</button>
                        </div>
            
                        <button className="remove-item-btn" 
                            onClick={() => {removeItem(item)}}
                        >Remove</button>
                    </div>
                ))}
                    </div>
                    <div className="check-out-wrapper">
                    <h4 className="total-price">Total Price: {totalPrice} kr</h4>
                    <button className="checkout-btn" onClick={() => navigate("/checkout")}>Checkout</button>
                    </div>
                    </>
                )
                }
            
        </div>
        </>
    )
}