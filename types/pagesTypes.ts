export interface IUserPage{
    username: string,
    regDate: Date,
    reviewCount: number
}

export interface ISellerPage{
    sellerName: string,
    description: string,
    createdAt: Date,
    averageRating: string,
    reviewCount: number
}

export interface IUserPageInfo{
    userPageInfo: IUserPage[],
    message:string,
    success:boolean
}

export interface ISellerPageInfo{
    sellerPageInfo: ISellerPage[],
    message:string,
    success:boolean
}