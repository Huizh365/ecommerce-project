export interface LineItem {
    price_data: {
        currency: string
        product_data: {
            name: string
            image: string[]
        }
        unit_amount: number
    }
    quantity: number
}