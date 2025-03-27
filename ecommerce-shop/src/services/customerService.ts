import { CustomerCreate, ICustomer } from "../types/Customer";
import { BASE_URL, handleRequest } from "./baseService";
import axios from "axios"

export const getCustomers = async ():Promise<ICustomer[]> => {
    return await handleRequest<ICustomer[]>(axios.get(`${BASE_URL}customers`))
}

export const getCustomerById = async (id:number):Promise<ICustomer> => {
    return await handleRequest<ICustomer>(axios.get(`${BASE_URL}customers/${id}`))
}

export const getCustomerByEmail = async (email:string):Promise<ICustomer> => {
    return await handleRequest<ICustomer>(axios.get(`${BASE_URL}customers/email/${email}`))
}

export const deleteCustomer = async (id:number):Promise<void> => {
    return await handleRequest<void>(axios.delete(`${BASE_URL}customers/${id}`))
}

export const updateCustomer = async (id:number, payload:CustomerCreate):Promise<ICustomer> => {
    return await handleRequest<ICustomer>(axios.patch(`${BASE_URL}customers/${id}`, payload))
}

export const createCustomer = async (payload:CustomerCreate):Promise<ICustomer> => {
    return await handleRequest<ICustomer>(axios.post(`${BASE_URL}customers`, payload))
}