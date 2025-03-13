import { ICustomer } from "../types/Customer";
import { BASE_URL, handleRequest } from "./baseService";
import axios from "axios"

export const getCustomers = async ():Promise<ICustomer[]> => {
    return await handleRequest<ICustomer[]>(axios.get(`${BASE_URL}customers`))
}