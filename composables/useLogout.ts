import type { AuthState } from '~/types/types'

export const useLogout = () => {
	const token = useCookie('token')
	const router = useRouter()
	const currentUser = inject<AuthState>('auth')

	token.value = null

	if (currentUser?.isAuthUser) {
		currentUser.isAuthUser.value = false
	}
	if (currentUser?.currentUser) {
		currentUser.currentUser.value = null
	}

	router.push('/')
}
