import { Product } from "src/app/services/product.model"


export interface AppState{
    cart: Array<Product>
}

export const initialState:AppState ={
    cart:[]
}