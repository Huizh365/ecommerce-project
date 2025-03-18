import { useEffect } from 'react'
import { Link } from 'react-router'
import "../styles/admin.css"
import { useOrderItems } from '../hooks/useOrderItems'

export const OrderDetails = () => {
    const {
        order,
        orderItemId,
        changedQuantity,
        setChangedQuantity,
        handleFetchOrderById,
        handleDelete,
        handleUpdateQuantity,
        handleSaveQuantity,
        error,
        isLoading,
        params
    } = useOrderItems()

    useEffect (() => {
        if(!params.id) return
        handleFetchOrderById(+params.id)
    },[])

    return (
        <>
        <h2>Manage Order Details</h2>
        {isLoading && <p>Loading...</p>}
        {error && <p>{error}</p>}
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
                    <td>{order?.created_at.slice(0, 10)}</td>
                    <td>{order?.payment_status}</td>
                    <td>{order?.payment_id}</td>
                    <td>{order?.order_status}</td>
                </tr>
            </tbody>
        </table>

        <h4 className='small-title'>Customer Information</h4>
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

        <h4 className='small-title'>Order Items</h4>
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