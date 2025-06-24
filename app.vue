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

const profileStore = useProfileStore()

//variables
const token = useCookie('token')
const isAuthUser = ref(false)
const currentUser = ref<IUser | null>(null)
interface validateTokenResponse {
	valid: boolean
}
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
			console.log('enough token')
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
			return console.log('wrong valid')
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
		currentUser.value = userResponse
		profileStore.user = userResponse
		// profileStore.setUser(userResponse)
		console.log(userResponse)

		return console.log('success')
	} catch (error) {
		console.error(error)
	}
}

//Логирование

//hooks
onMounted(async () => {
	if (token.value) {
		await fetchUserData(token.value)
	} else {
		console.log('Not enough token')
	}
})
</script>
<style></style>
