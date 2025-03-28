import { useEffect } from "react"
import { useNavigate, useSearchParams } from "react-router"
import { useOrders } from "../hooks/useOrders"
import "../styles/confirmation.css"
import { useCart } from "../hooks/useCart"
import { ICartActionType } from "../reducers/CartReducer"


export const OrderConfirmation = () => {
    const [searchParams] = useSearchParams()
    const navigate = useNavigate()
    const { order, handleFetchOrderBySessionId, isLoading, error, setError } = useOrders()
    const {dispatch} = useCart()

    useEffect(()=> {
        const sessionId = searchParams.get("session_id")
        if (!sessionId) {
            navigate("/")
            return
        }
        const fetchOrder = async () => {
            try {
                handleFetchOrderBySessionId(sessionId) 
                localStorage.removeItem("customer")
                dispatch({ 
                    type: ICartActionType.RESET_CART, 
                    payload: null 
                })
            } catch (error) {
                setError("Failed loading order")
            }
        }
        fetchOrder()
    }, [])


    return (
        <>
        {isLoading && <p>Loading...</p>}
        {error && <p>{error}</p>}
        <div className="confirmation-wrapper">
            <h2>Order Confirmation</h2>
            <div className="order-info">
                <p>Thank you for shopping with us! 
                    <br/>We've received your order and are processing it now. 
                    <br/>A confirmation email with your order details has been sent to your inbox.
                    <br/>If you have any questions or need assistance, please contact our support team at <a href="#">support@example.com</a></p>
                <div className="customer-info-wrapper">
                    <p><strong>Order ID:</strong> {order?.id}</p>
                    <p><strong>Name:</strong> {order?.customer_firstname} {order?.customer_lastname}</p>
                    <p><strong>Email:</strong> {order?.customer_email}</p>
                    <p><strong>Phone:</strong> {order?.customer_phone}</p>
                    <p><strong>Address:</strong> {order?.customer_street_address}, {order?.customer_city}, {order?.customer_country}</p>
                </div>
                <div className="order-items-wrapper">
                    <h3>Products</h3>
                    <table>
                        <thead>
                            <tr>
                                <th>Product</th>
                                <th>Price</th>
                                <th>Quantity</th>
                                <th>Total</th>
                            </tr>
                        </thead>
                        <tbody>
                            {order?.order_items.map(item => (
                                <tr key={item.id}>
                                    <td>{item.product_name}</td>
                                    <td>{item.unit_price}</td>
                                    <td>{item.quantity}</td>
                                    <td>{item.quantity * item.unit_price} SEK</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <p className="t-price">Total Price: {order?.total_price} SEK</p>
                </div>
            </div>

        </div>
        </>
    )
}