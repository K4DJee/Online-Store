export interface AuthState {
	isAuthUser: { value: boolean }
	currentUser: Ref<IUser | null>
	fetchUserData: (actualToken: string) => Promise<void>
}

export interface IUser {
	balance: string
	consent: number
	email: string
	regDate: string
	role: string
	userId: number
	username: string
	productsInCart: number
	reviewCount: number
}

export interface IProduct {
	productId: number,
	name: string,
	description: string,
	price: number,
	salePrice: number,
	quantity: number
	productCategory: string,
	imageUrl: string,
	createdAt: Date,
	updatedAt: Date,
	isActive: number,
	sellerName: string,
	averageRating: number,
	reviewCount: number
}
