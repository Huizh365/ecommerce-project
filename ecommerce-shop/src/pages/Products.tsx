import { useEffect } from "react"
import { useProducts } from "../hooks/useProducts"
import "../styles/shop.css"
import { useCart } from "../hooks/useCart"
import { CartItem } from "../models/CartItem"
import { ICartActionType } from "../reducers/CartReducer"
import { IProduct } from "../types/Product"

export const Products = () => {
    const {products, fetchProductsHandler, isLoading, error, navigate} = useProducts()
    const {dispatch} = useCart()
    
    useEffect (() => {
        fetchProductsHandler()
    },[])

    const handleClick = (id:number) => {
        navigate(`/products/${id}`)
    }
    const addToCart = (product: IProduct, quantity: number) => {
            dispatch({
                type: ICartActionType.ADD_ITEM,
                payload: new CartItem(product, quantity)
            })
        }

    return (
        <>
        <div className="filter-wrapper">Filters</div>
        <div className="products">
        {isLoading && <p>Loading...</p>}
        {error && <p>{error}</p>}
        {
            products.map((p) =>(
                <div 
                    className="product-item" 
                    key={p.id}
                >
                    <img src={p.image} alt={p.name} onClick={() => handleClick(p.id)}></img>
                    <p>{p.name}</p>
                    <div className="card-last-line">
                        <p>Price: {p.price} kr</p>
                        <button className="small-add-btn" onClick={()=> addToCart(p, 1)}>+</button>
                    </div>
                </div>
            ))
        }
        </div>
        </>
    )
}