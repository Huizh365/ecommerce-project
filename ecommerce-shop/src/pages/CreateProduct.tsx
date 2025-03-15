import { ChangeEvent, FormEvent, useState } from "react"
import { useNavigate } from 'react-router'
import { ProductCreate } from "../types/Product"
import { createProduct } from "../services/productService"


export const CreateProduct = () => {
    const [product, setProduct] = useState<ProductCreate>({
        name: "",
        description: "",
        price: 0,
        stock: 0,
        category: "",
        image: ""
    })
    const navigate = useNavigate()

    const handleChange = (e:ChangeEvent<HTMLInputElement>) => {
        setProduct(product => ({...product, [e.target.id]: e.target.value}))
        }
    
    const handleCreateProduct = async (e:FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if(!product) return
        await createProduct(product) 
        navigate("/admin/products")
        }

        return (
        <>
        <h2>Create Customer</h2>
        <form onSubmit={handleCreateProduct}>
            <label htmlFor="name">Name
            <input id="name" type="text" value={product.name} onChange={handleChange}></input>
            </label>
            
            <label htmlFor="category">Category
            <input id="category" type="text" value={product.category} onChange={handleChange}></input>
            </label>

            <label htmlFor="price">Price
            <input id="price" type="number" value={product.price} onChange={handleChange}></input>
            </label>

            <label htmlFor="stock">Stock
            <input id="stock" type="number" value={product.stock} onChange={handleChange}></input>
            </label>

            <label htmlFor="description" id="description-label">Description
            <input id="description" type="textarea" value={product.description} onChange={handleChange}></input>
            </label>

            <button className="submit-btn" type="submit">Save</button>
            <button className="cancel-btn" type="button" onClick={()=>navigate("/admin/products")}>Cancel</button>

        </form>
         
        </>
    )
}