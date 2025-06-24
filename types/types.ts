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
}

export interface IProduct {
	categoryId: number
	createdAt: string
	description: string
	imageUrl: string
	isActive: number
	name: string
	price: string
	productId: number
	quantity: number
	updatedAt: string
	averageRating: number
	reviewCount: number,
	sellerId: number
}
