import { defineStore } from 'pinia'
import type { IUser } from '~/types/types'

export const useProfileStore = defineStore('profileStore', () => {
	const user = reactive<IUser>({
		balance: '',
		consent: 0,
		email: '',
		regDate: '',
		role: '',
		userId: 0,
		username: '',
	})

	return { user }
})
