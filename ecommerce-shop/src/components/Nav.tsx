import logo from "../assets/logo.png"
import { useCart } from "../hooks/useCart"
import { CartItem } from "../models/CartItem"
import "../styles/nav.css"

export const Nav = () => {
    const {cart} = useCart()
    const cartItemCount = cart.reduce((total, item:CartItem) => total + item.quantity, 0)

    return (
        <nav className="navbar">
            <div className="nav-left">
                <img src={logo} alt="snacktpia logo" className="nav-logo" />
            </div>

            <div className="nav-links">
                <a href="/" className="navbar-link">HOME</a>
                <a href="/products" className="navbar-link">ALL SNACKS</a>
            </div>

            <div className="nav-right">
                <a id="user-enter" href="/admin/orders">
                <svg xmlns="http://www.w3.org/2000/svg" height="30" width="26.25" viewBox="0 0 448 512"><path fill="#5eaaa2" d="M224 256A128 128 0 1 0 224 0a128 128 0 1 0 0 256zm-45.7 48C79.8 304 0 383.8 0 482.3C0 498.7 13.3 512 29.7 512l388.6 0c16.4 0 29.7-13.3 29.7-29.7C448 383.8 368.2 304 269.7 304l-91.4 0z"/></svg>
                </a>
                <div id="cart-number">
                    <a  href="/cart" id="cart-enter">
                    <svg xmlns="http://www.w3.org/2000/svg" height="30" width="33.75" viewBox="0 0 576 512"><path fill="#5eaaa2" d="M0 24C0 10.7 10.7 0 24 0L69.5 0c22 0 41.5 12.8 50.6 32l411 0c26.3 0 45.5 25 38.6 50.4l-41 152.3c-8.5 31.4-37 53.3-69.5 53.3l-288.5 0 5.4 28.5c2.2 11.3 12.1 19.5 23.6 19.5L488 336c13.3 0 24 10.7 24 24s-10.7 24-24 24l-288.3 0c-34.6 0-64.3-24.6-70.7-58.5L77.4 54.5c-.7-3.8-4-6.5-7.9-6.5L24 48C10.7 48 0 37.3 0 24zM128 464a48 48 0 1 1 96 0 48 48 0 1 1 -96 0zm336-48a48 48 0 1 1 0 96 48 48 0 1 1 0-96z"/></svg>
                    {cartItemCount > 0 && (
                       <span id="cart-count">{cartItemCount}</span>
                    )}
                    </a>
                </div>
            </div>


        </nav>
    )
}