export interface responceFavouriteProducts{
    message:string,
    success:boolean,
    favouriteProducts: IProduct[]
}

import type { IProduct } from "./types"

export interface responseFavouriteActions{
    message:string,
    success:boolean
}