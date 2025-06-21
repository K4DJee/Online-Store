export interface basketResponse{
    cartProductsRow:{
        cartId:number,
        userId:number,
        productId:number,
        quantity:number,
        addedAt:Date
    }
}

export interface addProductInBasket{
    token:string
    productId:number
    quantity:number
}