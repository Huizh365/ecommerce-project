import { CartItem } from "../models/CartItem"

export interface ICartAction {
    type: ICartActionType
    payload: CartItem | any
}

export enum ICartActionType {
    ADD_ITEM,
    REMOVE_ITEM,
    CHANGE_QUANTITY,
    RESET_CART
}

export const CartReducer = (cart: CartItem[], action: ICartAction) => {
    const {type, payload} = action

    switch(type) {
        case ICartActionType.ADD_ITEM: {
            const itemExist = cart.find((item) => item.product.id === payload.product.id)

            if(!itemExist) return [...cart, payload]

            return cart.map((item) => {
                if (item.product.id === payload.product.id) {
                    return {...item, quantity: item.quantity + payload.quantity}
                } 
                return item
            }
            )
        }

        case ICartActionType.REMOVE_ITEM: {
            return cart.filter((item) => item.product.id !== payload.product.id)
        }

        case ICartActionType.CHANGE_QUANTITY: {
            return cart.map((item) => {
                if(item.product.id === payload.product.id) {
                    const newQuantity = item.quantity + payload.quantity
                    return {...item, quantity: newQuantity > 0 ? newQuantity : 1}
                }
                return item
            })
        }

        case ICartActionType.RESET_CART: {
            return []
        }

        default:
            return cart
    }
}