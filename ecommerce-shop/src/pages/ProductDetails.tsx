import { useEffect, useState } from "react"
import { useProducts } from "../hooks/useProducts"
import { useNavigate, useParams, Link } from 'react-router'
import { IProduct } from "../types/Product"


export const ProductDetails = () => {
    const {fetchProductByIdHandler, isLoading, error} = useProducts()
    const navigate = useNavigate()
    const params = useParams()
    const [product, setProduct] = useState<IProduct | null>(null)

    useEffect(()=>{
        if(!params.id) return
        fetchProductByIdHandler(+params.id).then((data) => setProduct(data))
    },[])

    return (
        <>
        <Link to="/products">Home</Link>
        <div className="product-detail">
            <img src={product?.image} alt={product?.name}></img>
            <div className="info-wrapper">
                <h3>{product?.name}</h3>
                <h4>{product?.price} kr</h4>
                <p>{product?.description}</p>
                {product?.stock ? <p>In Stock</p> : <p>Out of Stock</p>}
                <button className="add-btn">Add to Cart</button>
            </div>
        </div>
        </>
    )
}