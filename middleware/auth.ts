export default defineNuxtRouteMiddleware((to, from) => {
	const token = useCookie('token')
	const ProfileStore = useProfileStore();
	if (!token.value) {
		return navigateTo('/')
	}
})
