import { useEffect } from "react"
import { useNavigate, useSearchParams } from "react-router"
import { useOrders } from "../hooks/useOrders"

export const OrderConfirmation = () => {
    const [searchParams] = useSearchParams()
    const navigate = useNavigate()
    const { order, handleFetchOrderBySessionId, isLoading, error, setError } = useOrders()

    useEffect(()=> {
        const sessionId = searchParams.get("session_id")
        if (!sessionId) {
            navigate("/")
            return
        }
        const fetchOrder = async () => {
            try {
                handleFetchOrderBySessionId(sessionId) 

                localStorage.removeItem("cart")
                localStorage.removeItem("customer")
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
                <p>Thank you for shopping with us! Your order is confirmed. <br/> Order ID is {order?.id}</p>
                <div className="customer-info-wrapper">
                    <p>Name: {order?.customer_firstname} {order?.customer_lastname}</p>
                    <p>Email: {order?.customer_email}</p>
                    <p>Phone: {order?.customer_phone}</p>
                    <p>Address: {order?.customer_street_address}, {order?.customer_city}, {order?.customer_country}</p>
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
                    <p>Total Price: {order?.total_price}</p>
          
                </div>
            </div>

        </div>
        </>
    )
}