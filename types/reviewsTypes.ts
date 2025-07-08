export interface responseReviewActions {
    message:string,
    success:boolean
}

export interface responseAllUserReviews{
    allUserReviews: userReviewsRows[]
    message:string,
    success:boolean
}

export interface userReviewsRows{
    reviewId: number,
    productId: number,
    reviewUsername: string,
    sellerName: string,
    rating: number,
    comment: string,
    createdAt: Date
}

export interface responseAllProductReviews{
    reviewRows: userReviewsRows[]
    message:string,
    success:boolean
}