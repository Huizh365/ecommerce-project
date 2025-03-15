import { IProduct, ProductCreate } from "../types/Product"
import { handleRequest, BASE_URL } from "./baseService"
import axios from "axios"


export const getProducts = async ():Promise<IProduct[]> => {
    return await handleRequest<IProduct[]>(axios.get(`${BASE_URL}products`))
}

export const getProductById = async (id:number):Promise<IProduct> => {
    return await handleRequest<IProduct>(axios.get(`${BASE_URL}products/${id}`))
}

export const deleteProduct = async (id:number):Promise<void> => {
    return await handleRequest<void>(axios.delete(`${BASE_URL}products/${id}`))
}

export const updateProduct = async (id:number, payload:ProductCreate):Promise<IProduct> => {
    return await handleRequest<IProduct>(axios.patch(`${BASE_URL}products/${id}`, payload))
}

export const createProduct = async (payload:ProductCreate):Promise<IProduct> => {
    return await handleRequest<IProduct>(axios.post(`${BASE_URL}products`, payload))
}