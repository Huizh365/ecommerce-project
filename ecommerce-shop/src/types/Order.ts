export interface IOrder {
    id: string
    customer_id: number
    total_price: number
    payment_status: string
    payment_id: string
    order_status: string
    created_at: string
    customer_firstname: string
    customer_lastname: string
    customer_email: string
    customer_phone: string
    customer_street_address: string
    customer_city: string
    customer_country: string
    order_items: IOrderItem[]

}

export interface IOrderItem {
    id: number
    product_id: number
    product_name: string
    quantity: number
    unit_price: number
}

export type OrderItemCreate = Pick<IOrderItem, "product_id" | "product_name" | "quantity" | "unit_price" >

export type OrderItemUpdate = Pick<IOrderItem, "quantity">

export type OrderUpdate = Pick<IOrder, "payment_status" | "order_status">

export interface OrderCreate {
    customer_id: number
    payment_status: string
    payment_id: string
    order_status: string
    order_items: OrderItemCreate[]
}