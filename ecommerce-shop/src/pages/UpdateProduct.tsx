import { ChangeEvent, FormEvent, useEffect, useState } from "react"
import { IProduct } from "../types/Product"
import "../styles/admin.css"
import { useProducts } from "../hooks/useProducts"


export const UpdateProduct = () => {
    const [product, setProduct] = useState<IProduct | null> (null)
    const { navigate, params, isLoading, error, fetchProductByIdHandler,updateProductHandler } = useProducts()

    useEffect(() => {
        if(!params.id) return
        fetchProductByIdHandler(+params.id).then((data) => setProduct(data))
    },[])

    const handleChange = (e:ChangeEvent<HTMLInputElement>) => {
        setProduct(product => {
            if (!product) return product
            return {...product,[e.target.id]: e.target.value};
        });
    }

    const handleUpdateProduct = async (e:FormEvent<HTMLFormElement>) => {
            e.preventDefault()
            if(!product) return
            await updateProductHandler(product.id, product)
            navigate("/admin/products")
        }


    return (
        <>
        <h2>Update Customer</h2>
        {isLoading && <p>Loading...</p>}
        {error && <p>{error}</p>}
        <form onSubmit={handleUpdateProduct}>
            <label htmlFor="name">Name
            <input id="name" type="text" value={product?.name ?? ""} onChange={handleChange}></input>
            </label>
            
            <label htmlFor="category">Category
            <input id="category" type="text" value={product?.category  ?? ""} onChange={handleChange}></input>
            </label>

            <label htmlFor="price">Price
            <input id="price" type="number" value={product?.price  ?? ""} onChange={handleChange}></input>
            </label>

            <label htmlFor="stock">Stock
            <input id="stock" type="number" value={product?.stock  ?? ""} onChange={handleChange}></input>
            </label>

            <label htmlFor="description" id="description-label">Description
            <input id="description" type="textarea" value={product?.description  ?? ""} onChange={handleChange}></input>
            </label>

            <button className="submit-btn" type="submit">Save</button>
            <button className="cancel-btn" type="button" onClick={()=>navigate("/admin/products")}>Cancel</button>

        </form>
        </>
    )
}