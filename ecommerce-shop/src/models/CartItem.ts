import { IProduct } from "../types/Product";

export class CartItem {
    constructor(
        public product: IProduct,
        public quantity: number
    ){}
}