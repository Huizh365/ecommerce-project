import { useState } from "react"
import { useNavigate, useParams } from 'react-router'
import { CustomerCreate, ICustomer } from "../types/Customer"
import { createCustomer, deleteCustomer, getCustomerByEmail, getCustomerById, getCustomers, updateCustomer } from "../services/customerService";
import axios from "axios";

export const useCustomers = () => {
    const [customers, setCustomers] = useState<ICustomer[]>([])
    const [error, setError] = useState<string>("");
    const [isLoading, setIsLoading] = useState<boolean>(false); 
    const navigate = useNavigate()
    const params = useParams()

    const fetchCustomersHandler = async () => {
            setIsLoading(true)
            try {
                const data = await getCustomers()
                setCustomers(data)
            } catch (error) {
                setError("Error fetching customers")
                throw error
            } finally {
                setIsLoading(false)
            }
        }
    
    const fetchCustomerByIdHandler = async (id:number) => {
            setIsLoading(true)
            try {
                const data = await getCustomerById(id)
                return data
            } catch (error) {
                setError("Error fetching customer")
                throw error
            } finally {
                setIsLoading(false)
            }
        }
    
    const fetchCustomerByEmailHandler = async (email: string) => {
        setIsLoading(true)
        try {
            const data = await getCustomerByEmail(email)
            return data
        } catch (error) {
            if (axios.isAxiosError(error)) {
                if (error.response) {
                  if (error.response.status === 404) {
                    return error.response.data;
                  }
                  throw new Error(`Server error: ${error.response.status}`);
                } else if (error.request) {
                  throw new Error('No response from server');
                } else {
                  throw new Error('Request setup error');
                }
              }
              throw error;
        } finally {
            setIsLoading(false)
        }
    }
    
    const deleteCustomerHandler = async (id:number) => {
            setIsLoading(true)
            try {
                await deleteCustomer(id)
                const newCustomers = customers.filter(c => c.id !== id)
                setCustomers(newCustomers)
            } catch (error) {
                setError("Error deleting customer")
                throw error
            } finally {
                setIsLoading(false)
            }
        }
    
    const updateCustomerHandler = async (id: number, payload: CustomerCreate) => {
            setIsLoading(true)
            try {
                const data = await updateCustomer(id, payload)
                return data
            }catch (error) {
                setError("Error updating customer")
                throw error
            } finally {
                setIsLoading(false)
            }
        }
    
        const createCustomerHandler = async (payload: CustomerCreate) => {
            setIsLoading(true)
            try {
                const data = await createCustomer(payload)
                return data
            }catch (error) {
                setError("Error creating customer")
                throw error
            } finally {
                setIsLoading(false)
            }
        }

    
        return {
            navigate,
            params,
            customers,
            isLoading,
            error,
            setError,
            fetchCustomersHandler,
            deleteCustomerHandler,
            fetchCustomerByIdHandler,
            updateCustomerHandler,
            createCustomerHandler,
            fetchCustomerByEmailHandler
        }
}