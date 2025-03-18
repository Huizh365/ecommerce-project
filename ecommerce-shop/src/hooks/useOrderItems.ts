import { useState } from "react"
import { deleteOrderItem, updateOrderItem } from "../services/orderItemService"
import { getOrderById } from "../services/orderService"
import { IOrder, IOrderItem, OrderItemUpdate } from "../types/Order"
import { useParams } from 'react-router'

export const useOrderItems = () => {
    const [order, setOrder] = useState<IOrder | null>(null)
    const [orderItemId, setOrderItemId] = useState<number | null>(null)
    const [changedQuantity, setChangedQuantity] = useState<number>(0)
    const [error, setError] = useState<string>("");
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const params = useParams() 
    
    const handleFetchOrderById = async(id:number) => {
        setIsLoading(true)
        try {
            const data = await getOrderById(id)
            setOrder(data)
        } catch (error) {
            setError("Error fetching orders")
            throw error
        } finally {
            setIsLoading(false)
        }
    }

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
    return {
        order,
        orderItemId,
        changedQuantity,
        setOrderItemId,
        setChangedQuantity,
        handleFetchOrderById,
        handleDelete,
        handleUpdateQuantity,
        handleSaveQuantity,
        error,
        isLoading,
        params
    }
}