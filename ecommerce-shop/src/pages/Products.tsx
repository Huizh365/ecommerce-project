import { useEffect } from "react"
import { useNavigate } from 'react-router'
import { useProducts } from "../hooks/useProducts"
import "../styles/shop.css"

export const Products = () => {
    const {products, fetchProductsHandler, isLoading, error} = useProducts()
    const navigate = useNavigate()

    useEffect (() => {
        fetchProductsHandler()
    },[])

    const handleClick = (id:number) => {
        navigate(`/products/${id}`)
    }

    return (
        <>
        <div className="filter-wrapper">Filters</div>
        <div className="products">
        {
            products.map((p) =>(
                <div 
                    className="product-item" 
                    key={p.id}
                    onClick={() => handleClick(p.id)}
                >
                    <img src={p.image} alt={p.name}></img>
                    <p>{p.name}</p>
                    <p>Price: {p.price} kr</p>
                </div>
            ))
        }
        </div>
        </>
    )
}