import { defineStore } from 'pinia'
import type { IUser } from '~/types/types'

export const useProfileStore = defineStore('profileStore', () => {
	//state
	const user = ref<IUser | null>(null)
	const isAuthenticated = ref(false);
	//actions
	const setUser = (userData:IUser) =>{
		user.value = userData;
		isAuthenticated.value = true;
	}
	const clearUser = ()=>{
		user.value = null;
		isAuthenticated.value = false
	}
	//getters
	const isAdmin = computed(() => user.value?.role === 'admin');
	
	return {
		user, isAuthenticated,

		setUser, clearUser,

		isAdmin
	}
})
