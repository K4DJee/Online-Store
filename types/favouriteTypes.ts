export interface responceFavouriteProducts{
    favouriteProducts: favouriteProduct[]
}

export interface favouriteProduct{
    productName: string,
    productDescription: string,
    productPrice: number,
    productSalePrice: number,
    productImage: string,
    sellerName: string
}