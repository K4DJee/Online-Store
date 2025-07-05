export interface basketResponse{
        cartProductsRow:basketProduct[]
};

export interface basketProduct{
        cartId:number,
        productId:number,
        quantity:number,
        addedAt:Date,
        productName:string,
        productDescription:string,
        productPrice:number,
        imageUrl:string,
        isActive: number
        sellerName:string
        productSalePrice: number
}

export interface addProductInBasket{
    token:string
    productId:number
    quantity:number
}