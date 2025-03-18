import { useEffect } from "react"
import { Link } from "react-router"
import { useOrders } from "../hooks/useOrders"
import "../styles/admin.css"

export const ManageOrders = () => {

    const { 
        orders,
        orderId,
        changedPaymentStatus,
        changedOrderStatus,
        handleFetchorders,
        setChangedPaymentStatus,
        setChangedOrderStatus,
        handleDelete,
        handleUpdateOrder,
        handleSaveOrder,
        isLoading,
        error 
    } = useOrders()

    useEffect (() => {
        handleFetchorders()
    },[])

    return (
        <>
        <h2>Manage Orders</h2>
        {isLoading && <p>Loading...</p>}
        {error && <p>{error}</p>}
        <table id="order-list">
            <thead>
            <tr>
                <th>ID</th>
                <th>Customer</th>
                <th>Email</th>
                <th>Total Price</th>
                <th>Date</th>
                <th>Payment Status</th>
                <th>Payment ID</th>
                <th>Order Status</th>
                <th>Action</th>
            </tr>
            </thead>
            <tbody>
            {
                orders.map((o) =>(
                    <tr className="customer-item" key={o.id}>
                        <td><Link to={`${o.id}`}>{o.id}</Link></td>
                        <td>{o.customer_firstname} {o.customer_lastname}</td>
                        <td>{o.customer_email}</td>
                        <td>{o.total_price}</td>
                        <td>{o.created_at.slice(0, 10)}</td>
                        <td>{orderId === +o.id 
                            ? (
                                <input
                                    type="text"
                                    value={changedPaymentStatus}
                                    onChange={(e) => setChangedPaymentStatus(e.target.value)}
                                />
                            ) 
                            : (
                                o.payment_status
                            )}</td>
                        <td>{o.payment_id}</td>
                        <td>{orderId === +o.id 
                            ? (
                                <input
                                    type="text"
                                    value={changedOrderStatus}
                                    onChange={(e) => setChangedOrderStatus(e.target.value)}
                                />
                            ) 
                            : (
                                o.order_status
                            )}</td>
                        <td>{orderId === +o.id 
                            ? (
                                <a href="#" onClick={() => handleSaveOrder(+o.id)}>SAVE</a>
                            ) 
                            : (
                                <a href="#" onClick={() => handleUpdateOrder(o)}>UPDATE</a>
                            )}  
                            <a href="#" className="delete-link" onClick={()=>handleDelete(+o.id)}> DELETE</a></td>
                    </tr>
                ))
            }
            </tbody>
        </table>     
        </>
    )
}