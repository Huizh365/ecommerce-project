import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router'
import { IOrder, IOrderItem, OrderItemUpdate } from '../types/Order'
import { getOrderById } from '../services/orderService'
import { deleteOrderItem, updateOrderItem } from '../services/orderItemService'

export const OrderDetails = () => {
    const params = useParams()
    const [order, setOrder] = useState<IOrder | null>(null)
    const [orderItemId, setOrderItemId] = useState<number | null>(null)
    const [changedQuantity, setChangedQuantity] = useState<number>(0)

    useEffect (() => {
        if(!params.id) return
        getOrderById(+params.id).then((data) => setOrder(data))
    },[])

    const handleDelete = async (id:number) => {
        await deleteOrderItem(id)
        const newItems = order?.order_items.filter(i => i.id !== id)
        if(!order || !newItems) return
        setOrder({
            ...order,
            order_items: newItems
        })
    }

    const handleUpdateQuantity = (item: IOrderItem) => {
        setOrderItemId(item.id)
        setChangedQuantity(item.quantity)
    }

    const handleSaveQuantity = async (id:number) => {
        const changedOrderItem: OrderItemUpdate = {
            quantity: changedQuantity
        }
        try {
            await updateOrderItem(id, changedOrderItem)
            const updatedOrderItems = order?.order_items.map(i => {
                if(i.id === id) {
                    return {
                        ...i,
                        quantity: changedQuantity
                    }
                }
                return i
            })
            if (order && updatedOrderItems) {
                setOrder({
                    ...order,
                    order_items: updatedOrderItems
                })
            }
            
            setOrderItemId(null)
        } catch (error) {
            console.error("Failed to update quantity:", error)
        }

    }


    return (
        <>
        <h2>Manage Orders</h2>
        <div className='title-wrapper'>
        <h4>Order Information</h4>
        <h4><Link to="/admin/orders">Go Back</Link></h4>
        </div>
        <table id="order-info">
            <thead>
            <tr>
                <th>ID</th>
                <th>Total Price</th>
                <th>Order Date</th>
                <th>Payment Status</th>
                <th>Payment ID</th>
                <th>Order Status</th>
            </tr>
            </thead>
            <tbody>
                <tr>
                    <td>{order?.id}</td>
                    <td>{order?.total_price}</td>
                    <td>{order?.created_at}</td>
                    <td>{order?.payment_status}</td>
                    <td>{order?.payment_id}</td>
                    <td>{order?.order_status}</td>
                </tr>
            </tbody>
        </table>

        <h4>Customer Information</h4>
        <table id="customer-info">
            <thead>
            <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Address</th>
                <th>City</th>
                <th>Country</th>
            </tr>
            </thead>
            <tbody>
                <tr>
                    <td>{order?.customer_firstname} {order?.customer_lastname}</td>
                    <td>{order?.customer_email}</td>
                    <td>{order?.customer_phone}</td>
                    <td>{order?.customer_street_address}</td>
                    <td>{order?.customer_city}</td>
                    <td>{order?.customer_country}</td>
                </tr>
            </tbody>
        </table>

        <h4>Order Items</h4>
        <table id="order-items">
            <thead>
            <tr>
                <th>ID</th>
                <th>Product</th>
                <th>Unit Price</th>
                <th>Quantity</th>
                <th>Action</th>
            </tr>
            </thead>
            <tbody>
                {
                    order?.order_items.map((i) => (
                    <tr key={i.id}>
                        <td>{i.id}</td>
                        <td>{i.product_name}</td>
                        <td>{i.unit_price}</td>
                        <td>
                            {orderItemId === i.id
                            ? (
                                <input 
                                    type="number"
                                    value={changedQuantity}
                                    onChange ={(e) => setChangedQuantity(+e.target.value)}
                                />
                            )
                            : (i.quantity)
                            }
                        </td>
                        <td>{orderItemId === i.id 
                            ? (<a href="#" onClick={() => handleSaveQuantity(i.id)}>SAVE</a>)
                            : (<a href="#" onClick={() => handleUpdateQuantity(i)}>UPDATE</a>)
                            }
                            
                            <a href="#" className="delete-link" onClick={()=>handleDelete(+i.id)}> DELETE</a>
                        </td>
                    </tr>
                        
                    ))
                }
                
            </tbody>
        </table>


        </>
    )
}