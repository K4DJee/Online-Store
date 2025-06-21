export interface basketResponse{
    cartProductsRow:{
        cartId:number,
        productId:number,
        quantity:number,
        addedAt:Date,
        productName:string,
        productDescription:string,
        productPrice:number,
        imageUrl:string,
    }
}

export interface addProductInBasket{
    token:string
    productId:number
    quantity:number
}