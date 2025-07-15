// middleware/auth.global.ts

import { useAppStore, useProfileStore } from '#imports'

export default defineNuxtRouteMiddleware(to => {
	const token = useCookie('token')
	const appStore = useAppStore()
	const profileStore = useProfileStore()

	// Якщо немає токена або профіль ще не завантажений
	if (!token.value || !profileStore.isAuthenticated) {
		// Якщо ми вже на головній — не блокуємо
		if (to.path !== '/') {
			appStore.isAuthModal = true
			return abortNavigation()
		}
	}
})
