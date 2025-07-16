<template>
	<NuxtLayout name="default">
		<NuxtLoadingIndicator />
		<Suspense>
			<template #default>
				<NuxtPage />
			</template>
			<template #fallback>
				<Loader :variant="'dots'" />
			</template>
		</Suspense>
	</NuxtLayout>
</template>
<script setup lang="ts">
import type { AuthState, IUser } from './types/types'
import { useProfileStore } from '#imports'
import { useBasketStore } from '#imports'
import { Loader } from '#components'

const profileStore = useProfileStore()
const basketStore = useBasketStore()

//variables
const token = useCookie('token')
const isAuthUser = ref(false)
const currentUser = ref<IUser | null>(null)
interface validateTokenResponse {
	valid: boolean
}
// definePageMeta({
// 	middleware: 'auth',
// })

provide<AuthState>('auth', {
	isAuthUser,
	currentUser,
	fetchUserData,
})
//functions
async function fetchUserData(actualToken: string) {
	try {
		if (actualToken) {
			token.value = actualToken
		}
		if (!token.value) {
			return
		}
		const response = await $fetch<validateTokenResponse>(
			'http://localhost:8000/api/validateToken',
			{
				method: 'POST',
				body: {
					token: token.value,
				},
			}
		)
		if (!response?.valid === true) {
			return
		}
		isAuthUser.value = true
		const userResponse = await $fetch<IUser>(
			'http://localhost:8000/api/userdata',
			{
				method: 'POST',
				body: {
					token: token.value,
				},
			}
		)
		// currentUser.value = userResponse
		// profileStore.user = userResponse
		profileStore.setUser(userResponse)

		return
	} catch (error) {
		console.error(error)
	}
}

//Логирование

//hooks
onMounted(async () => {
	if (token.value) {
		await fetchUserData(token.value)
		await basketStore.fetchUserBasket()
	} else {
		console.log('Not enough token')
	}
})
</script>
<style></style>
