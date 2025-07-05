export interface responceShippingProducts{
    shippingProducts: shippingProduct[],
    success:boolean,
    message:string
}

export interface shippingProduct{
    shippingId: number,
    productName: string,
    productDescription: string,
    productPrice: number,
    productSalePrice: number,
    productImage: string,
    sellerName: string,
    receivedDate: Date,
    received: number,
    shippedAt: Date
}