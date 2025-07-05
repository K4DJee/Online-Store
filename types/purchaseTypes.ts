export interface responsePurchases{
    userPurchases:purchase[],
    success:boolean,
    message:string
}

export interface purchase{
    sellerName: string,
            quantity: number,
            price: string,
            purchasedAt: Date,
            received: number
}