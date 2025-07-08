export interface responseProductPageInfo {
	productRow: {
		productId: number
		sellerName: string
		name: string
		description: string
		price: string
		quantity: number
		categoryId: number | null
		imageUrl: string
		createdAt: string
		updatedAt: string
		isActive: number
		averageRating: number
		reviewCount: number
		images: {
			imageId: number
			productId: number
			imageUrl: string
			sortOrder?: number
			createdAt?: string
		}
	}
}

export interface responseProductPageReviews {
	reviewRows: [
		{
			reviewId: number
			productId: number
			userId: number
			rating: number
			comment: string
			updatedAt: Date
			reviewerUsername: string
		}
	]
}
