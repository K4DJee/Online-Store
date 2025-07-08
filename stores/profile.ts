import { defineStore } from 'pinia'
import type { IUser } from '~/types/types'
export const useProfileStore = defineStore('profileStore', () => {
	const token = useCookie('token')
	//state
	const user = ref<IUser | null>(null)
	const isAuthenticated = ref(false)
	//actions
	const setUser = (userData: IUser) => {
		user.value = userData
		isAuthenticated.value = true
	}
	const useLogout = () => {
		user.value = null
		isAuthenticated.value = false
		token.value = null
	}
	//getters
	const isAdmin = computed(() => user.value?.role === 'admin')

	return {
		token,
		user,
		isAuthenticated,

		setUser,
		useLogout,

		isAdmin,
	}
})
