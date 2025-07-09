export interface responseReviewActions {
    message:string,
    success:boolean
}

export interface responseAllUserReviews{
    userReviewRows: userReviewRows[]
    message:string,
    success:boolean
}

export interface userReviewRows{
    reviewId: number,
    productId: number,
    productName: string,
    productDescription: string,
    imageUrl: string
    reviewUsername: string,
    sellerName: string,
    rating: number,
    comment: string,
    createdAt: Date
}

export interface responseAllProductReviews{
    reviewRows: userReviewRows[]
    message:string,
    success:boolean
}