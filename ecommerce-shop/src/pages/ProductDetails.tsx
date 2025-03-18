import { useEffect, useState } from "react"
import { useProducts } from "../hooks/useProducts"
import { IProduct } from "../types/Product"
import "../styles/shop.css"
import { useCart } from "../hooks/useCart"
import { ICartActionType } from "../reducers/CartReducer"
import { CartItem } from "../models/CartItem"


export const ProductDetails = () => {
    const {fetchProductByIdHandler, isLoading, error, params} = useProducts()
    const [product, setProduct] = useState<IProduct | null>(null)
    const {dispatch} = useCart()

    useEffect(()=>{
        if(!params.id) return
        fetchProductByIdHandler(+params.id).then((data) => setProduct(data))
    },[])

    const addToCart = (product: IProduct, quantity: number) => {
        dispatch({
            type: ICartActionType.ADD_ITEM,
            payload: new CartItem(product, quantity)
        })
    }

    return (
        <>
        {isLoading && <p>Loading...</p>}
        {error && <p>{error}</p>}
        <div className="product-detail">
            <img src={product?.image} alt={product?.name}></img>
            <div className="info-wrapper">
                <h2>{product?.name}</h2>
                <h4>{product?.price} kr</h4>
                <p>{product?.description}</p>
                {product?.stock ? <p className="in-stock">In Stock</p> : <p className="out-stock">Out of Stock</p>}
                <button className="add-btn" 
                    onClick={() => {product && addToCart(product, 1)}}
                    disabled={!product || product.stock === 0}
                >Add to Cart</button>
            </div>
        </div>
        </>
    )
}