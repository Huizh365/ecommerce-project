import { IOrderItem, OrderItemUpdate } from "../types/Order"
import { BASE_URL, handleRequest } from "./baseService"
import axios from "axios"


export const deleteOrderItem = async (id:number):Promise<void> => {
    return await handleRequest<void>(axios.delete(`${BASE_URL}order-items/${id}`))
}

export const updateOrderItem = async (id:number, payload:OrderItemUpdate):Promise<IOrderItem> => {
    return await handleRequest<IOrderItem>(axios.patch(`${BASE_URL}order-items/${id}`, payload))
}