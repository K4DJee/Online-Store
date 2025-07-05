export interface responceFavouriteProducts{
    favouriteProducts: favouriteProduct[]
}

export interface favouriteProduct{
    favouriteId: number,
    productId: number,
    productName: string,
    productDescription: string,
    productPrice: number,
    productSalePrice: number,
    productImage: string,
    sellerName: string
}

export interface responseFavouriteActions{
    message:string,
    success:boolean
}