import { useState } from "react";
import { IProduct, ProductCreate } from "../types/Product";
import { createProduct, deleteProduct, getProductById, getProducts, updateProduct } from "../services/productService";
import { useNavigate, useParams } from 'react-router'

export const useProducts = () => {
    const [products, setProducts] = useState<IProduct[]>([])
    const [error, setError] = useState<string>("");
    const [isLoading, setIsLoading] = useState<boolean>(false); 
    const navigate = useNavigate()
    const params = useParams()

    const fetchProductsHandler = async () => {
        setIsLoading(true)
        try {
            const data = await getProducts()
            setProducts(data)
        } catch (error) {
            setError("Error fetching products")
            throw error
        } finally {
            setIsLoading(false)
        }
    }

    const fetchProductByIdHandler = async (id:number) => {
        setIsLoading(true)
        try {
            const data = await getProductById(id)
            return data
        } catch (error) {
            setError("Error fetching product")
            throw error
        } finally {
            setIsLoading(false)
        }
    }

    const updateProductHandler = async (id: number, payload: IProduct) => {
        setIsLoading(true)
        try {
            const data = await updateProduct(id, payload)
            return data
        }catch (error) {
            setError("Error updating product")
            throw error
        } finally {
            setIsLoading(false)
        }
    }

    const createProductHandler = async (payload: ProductCreate) => {
        setIsLoading(true)
        try {
            const data = await createProduct(payload)
            return data
        }catch (error) {
            setError("Error creating product")
            throw error
        } finally {
            setIsLoading(false)
        }
    }

    const deleteProductHandler = async (id:number) => {
        setIsLoading(true)
        try {
            await deleteProduct(id)
            const newProducts = products.filter(p => p.id !== id)
            setProducts(newProducts)
        } catch (error) {
            setError("Error deleting products")
            throw error
        } finally {
            setIsLoading(false)
        }
    }

    return {
        navigate,
        params,
        products,
        isLoading,
        error,
        fetchProductsHandler,
        deleteProductHandler,
        fetchProductByIdHandler,
        updateProductHandler,
        createProductHandler
    }
}