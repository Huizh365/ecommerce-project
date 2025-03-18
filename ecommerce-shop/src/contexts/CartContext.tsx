import { createContext, Dispatch,  PropsWithChildren, useReducer } from "react";
import { CartItem } from "../models/CartItem";
import { CartReducer, ICartAction } from "../reducers/CartReducer";

export interface ICartContext {
    cart: CartItem[]
    dispatch: Dispatch<ICartAction>
}

const CartContext = createContext<ICartContext>({cart:[], dispatch: ()=> null})

export const CartProvider = ({children}: PropsWithChildren) => {
    const [cart, dispatch] = useReducer(CartReducer, [])

    return (
        <CartContext.Provider value={{cart, dispatch}}>
            {children}
        </CartContext.Provider>
    )
}

export default CartContext

