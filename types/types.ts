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
