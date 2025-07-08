import { defineStore } from 'pinia'

export const useAppStore = defineStore('appStore', () => {
	const isAuthModal = ref(false)
	const toggleAuthModal = (): void => {
		isAuthModal.value = !isAuthModal.value
	}

	return {
		isAuthModal,
		toggleAuthModal,
	}
})
