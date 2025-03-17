import { useEffect, useState } from "react"
import { IOrder, OrderUpdate } from "../types/Order"
import { deleteOrder, getOrders, updateOrder } from "../services/orderService"
import { Link } from "react-router"


export const ManageOrders = () => {
    const [orders, setOrders] = useState<IOrder[]>([])
    const [orderId, setOrderId] = useState<number | null>(null)
    const [changedPaymentStatus, setChangedPaymentStatus] = useState<string>('')
    const [changedOrderStatus, setChangedOrderStatus] = useState<string>('')


    useEffect (() => {
        getOrders().then((data) => setOrders(data))
    },[])

    const handleDelete = async (id:number) => {
            await deleteOrder(id)
            const newOrders = orders.filter(o => +o.id !== id)
            setOrders(newOrders)
    }
    
    const handleUpdateOrder = (order:IOrder) => {
        setOrderId(+order.id)
        setChangedPaymentStatus(order.payment_status)
        setChangedOrderStatus(order.order_status)
    }

    const handleSaveOrder = async (id: number) => {
        const changedOrder: OrderUpdate = {
            payment_status: changedPaymentStatus,
            order_status: changedOrderStatus
        }
        try{
            await updateOrder(id, changedOrder)
            const updatedOrders = orders.map(o => {
                if (+o.id === id) {
                    return {
                        ...o, 
                        payment_status: changedPaymentStatus, 
                        order_status:changedOrderStatus
                    }
                }
                return o;
            })
            setOrders(updatedOrders);
            setOrderId(null);
        } catch (error) {
            console.error("Failed to update order:", error)
        }
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
                        <td><Link to={`${o.id}`}>{o.id}</Link></td>
                        <td>{o.customer_firstname} {o.customer_lastname}</td>
                        <td>{o.customer_email}</td>
                        <td>{o.total_price}</td>
                        <td>{o.created_at}</td>
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