import { defineStore } from 'pinia'
import type { IUser } from '~/types/types'

export const useProfileStore = defineStore('profileStore', () => {
	//state
	const user = ref<IUser | null>(null)
	const isAutheticated = ref(false);
	//actions
	const setUser = (userData:IUser) =>{
		user.value = userData;
		isAutheticated.value = true;
	}
	const clearUser = ()=>{
		user.value = null;
		isAutheticated.value = false
	}
	//getters
	const isAdmin = computed(() => user.value?.role === 'admin');
	
	return {
		user, isAutheticated,

		setUser, clearUser,

		isAdmin
	}
})
