import { IOrder, OrderCreate, OrderUpdate } from "../types/Order";
import { BASE_URL, handleRequest } from "./baseService";
import axios from "axios"

export const getOrders = async ():Promise<IOrder[]> => {
    return await handleRequest<IOrder[]>(axios.get(`${BASE_URL}orders`))
}

export const getOrderById = async (id:number):Promise<IOrder> => {
    return await handleRequest<IOrder>(axios.get(`${BASE_URL}orders/${id}`))
}


export const deleteOrder = async (id:number):Promise<void> => {
    return await handleRequest<void>(axios.delete(`${BASE_URL}orders/${id}`))
}

export const updateOrder = async (id:number, payload:OrderUpdate):Promise<IOrder> => {
    return await handleRequest<IOrder>(axios.patch(`${BASE_URL}orders/${id}`, payload))
}

export const createOrder = async (payload:OrderCreate):Promise<IOrder> => {
    return await handleRequest<IOrder>(axios.post(`${BASE_URL}orders`, payload))
}

export const getOrderBySessionId = async (sessionId:string) => {
    return await handleRequest<IOrder>(axios.get(`${BASE_URL}orders/payment/${sessionId}`))
}