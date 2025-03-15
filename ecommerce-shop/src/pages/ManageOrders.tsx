import { useEffect, useState } from "react"
import { IOrder } from "../types/Order"
import { deleteOrder, getOrders } from "../services/orderService"
import { Link } from "react-router"


export const ManageOrders = () => {
    const [orders, setOrders] = useState<IOrder[]>([])

    useEffect (() => {
        getOrders().then((data) => setOrders(data))
    },[])

    const handleDelete = async (id:number) => {
            await deleteOrder(id)
            const newOrders = orders.filter(o => +o.id !== id)
            setOrders(newOrders)
        }


    return (
        <>
        <h2>Manage Orders</h2>
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
                        <td>{o.id}</td>
                        <td>{o.customer_firstname} {o.customer_lastname}</td>
                        <td>{o.customer_email}</td>
                        <td>{o.total_price}</td>
                        <td>{o.created_at}</td>
                        <td>{o.payment_status}</td>
                        <td>{o.payment_id}</td>
                        <td>{o.order_status}</td>
                        <td><Link to={`${o.id}`}>UPDATE </Link> <a href="#" className="delete-link" onClick={()=>handleDelete(+o.id)}> DELETE</a></td>
                    </tr>
                ))
            }
            </tbody>
        </table>     
        </>
    )
}