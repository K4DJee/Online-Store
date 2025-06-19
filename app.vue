<template>
	<NuxtLayout name="default">
		<NuxtLoadingIndicator />
		<NuxtPage />
	</NuxtLayout>
</template>
<script setup lang="ts">
import axios from 'axios'
import type { AuthState, IUser } from './types/types'
import { useProfileStore } from '#imports'

const profileStore = useProfileStore()

//variables
const token = useCookie('token')
const isAuthUser = ref(false)
const currentUser = ref<IUser | null>(null)
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
		const response = await axios.post(
			'http://localhost:8000/api/validateToken',
			{ token: token.value }
		)
		if (!response.data.valid === true) {
			return console.log('wrong valid')
		}
		isAuthUser.value = true
		const userResponse = await axios.post(
			'http://localhost:8000/api/userdata',
			{ token: token.value }
		)
		currentUser.value = userResponse.data
		profileStore.user = userResponse.data
		console.log(userResponse.data)

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
