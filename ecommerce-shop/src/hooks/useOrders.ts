import { useState } from "react"
import { createOrder, deleteOrder, getOrderBySessionId, getOrders, updateOrder } from "../services/orderService"
import { IOrder, OrderCreate, OrderUpdate } from "../types/Order"

export const useOrders = () => {
    const [orders, setOrders] = useState<IOrder[]>([])
    const [orderId, setOrderId] = useState<number | null>(null)
    const [changedPaymentStatus, setChangedPaymentStatus] = useState<string>('')
    const [changedOrderStatus, setChangedOrderStatus] = useState<string>('')
    const [error, setError] = useState<string>("");
    const [isLoading, setIsLoading] = useState<boolean>(false); 
    const [order, setOrder] = useState<IOrder | null>(null)


    const handleFetchorders = async () => {
        setIsLoading(true)
        try {
            const data = await getOrders()
            setOrders(data)
        } catch (error) {
            setError("Error fetching orders")
            throw error
        } finally {
            setIsLoading(false)
        }
    }

    const handleDelete = async (id:number) => {
        setIsLoading(true)
        try {        
            await deleteOrder(id)
            const newOrders = orders.filter(o => +o.id !== id)
            setOrders(newOrders)
        } catch (error) {
            setError("Error deleting order")
            throw error
        } finally {
            setIsLoading(false)
        }
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
        setIsLoading(true)
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
            setError("Error updating order")
        } finally {
            setIsLoading(false)
        }
    }

    const handleCreateOrder = async(payload: OrderCreate) => {
        setIsLoading(true)
        try {
            const data = await createOrder(payload)
            return data 
        } catch (error) {
            setError("Error creating order")
            throw error
        } finally {
            setIsLoading(false)
        }
    }

    const handleFetchOrderBySessionId = async(sessionId:string) => {
        setIsLoading(true)
        try {
            const data = await getOrderBySessionId(sessionId)
            setOrder(data)
        } catch (error) {
            setError("Error fetching order")
            throw error
        } finally {
            setIsLoading(false)
        }
    }

    return {
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
        handleCreateOrder,
        isLoading,
        error,
        setError,
        handleFetchOrderBySessionId,
        order,
    }
}