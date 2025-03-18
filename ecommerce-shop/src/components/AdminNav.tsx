import logo from "../assets/logo.png"
import "../styles/nav.css"

export const AdminNav = () => {


    return (
        <nav className="navbar">
            <div className="nav-left">
                <img src={logo} alt="snacktpia logo" className="nav-logo" />
            </div>

            <div className="nav-links">
                <a href="/admin/orders" className="navbar-link">ORDERS</a>
                <a href="/admin/customers" className="navbar-link">CUSTOMERS</a>
                <a href="/admin/products" className="navbar-link">PRODUCTS</a>
            </div>

            <div className="nav-right">
                <a id="user-enter" href="/admin" className="navbar-link">Log out</a>
            </div>


        </nav>
    )
}