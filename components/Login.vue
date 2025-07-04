<script setup lang="ts">
import type { AuthState } from '../types/types'
import type { IUser } from '~/types/types'


import { ref, inject } from 'vue'

const router = useRouter()

interface loginResponse {
	token: string
}

//Переменные
const username = ref('')
const email = ref('')
const password = ref('')
const auth = inject<AuthState>('auth')
const errorMessage = ref('')
const loading = ref(false)
const emit = defineEmits<{
	(e: 'close'): void
}>()
const token = useCookie('token')
const submitForm = async () => {
	const user: IUser = {
		username: username.value,
		email: email.value,
		password: password.value,
		regDate: new Date(),
		role: 'user',
	}
	errorMessage.value = ''
	if (!user.username || !user.email || !user.password || !user.role) {
		return (errorMessage.value = 'Введите свои данные')
	}
	if (user.username.length <= 3) {
		return (errorMessage.value =
			'Количество символов в имени должно быть больше 3')
	}
	if (!isValidEmail(user.email)) {
		return (errorMessage.value = 'Введите корректный email!')
	}
	try {
		loading.value = true
		const data = await $fetch<loginResponse>(
			'http://localhost:8000/api/login',
			{
				method: 'POST',
				body: user,
			}
		)
		console.log('User object send: ', user)
		if (data?.token) {
			token.value = data.token
			auth?.fetchUserData(data.token)
			emit('close')
			router.push('/profile')
		} else {
			console.log('User not found')
		}
	} catch (error: any) {
		const status = error?.status
		switch (status) {
			case 404:
				errorMessage.value = 'Пользователь не найден'
				break
			case 400:
				errorMessage.value = 'Указаны неполные данные'
				break
			case 401:
				errorMessage.value = 'Пароль или почта неверные'
				break
			case 500:
				errorMessage.value = 'Ошибка на стороне сервера'
				break
			default:
				errorMessage.value = 'Неизвестная ошибка'
				break
		}
	} finally {
		loading.value = false
	}
}

function isValidEmail(email: string): boolean {
	const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
	return emailRegex.test(email)
}
</script>

<template>
	<form @submit.prevent="submitForm" class="flex flex-col gap-5">
		<div class="relative">
			<input
				v-model="username"
				type="text"
				placeholder="Имя"
				class="w-full h-12 px-4 border-2 border-gray-200 rounded-xl text-base text-gray-700 bg-white transition-all duration-200 outline-none focus:border-lime-500 focus:ring-4 focus:ring-lime-100 placeholder-gray-400"
			/>
		</div>

		<div class="relative">
			<input
				v-model="email"
				type="text"
				placeholder="Почта"
				class="w-full h-12 px-4 border-2 border-gray-200 rounded-xl text-base text-gray-700 bg-white transition-all duration-200 outline-none focus:border-lime-500 focus:ring-4 focus:ring-lime-100 placeholder-gray-400"
			/>
		</div>

		<div class="relative">
			<input
				v-model="password"
				type="password"
				placeholder="Пароль"
				class="w-full h-12 px-4 border-2 border-gray-200 rounded-xl text-base text-gray-700 bg-white transition-all duration-200 outline-none focus:border-lime-500 focus:ring-4 focus:ring-lime-100 placeholder-gray-400"
			/>
		</div>

		<div class="flex justify-end -mt-2">
			<NuxtLink
				to="/recover"
				class="text-sm font-medium text-lime-500 hover:text-lime-600 cursor-pointer hover:underline transition-colors duration-200"
			>
				Забыли пароль?
			</NuxtLink>
		</div>

		<div
			v-if="errorMessage"
			class="bg-red-50 border border-red-200 rounded-lg p-3"
		>
			<p class="text-sm font-medium text-red-600 m-0">
				{{ errorMessage }}
			</p>
		</div>

		<button
			type="submit"
			class="w-full h-12 bg-gradient-to-r from-lime-500 to-lime-600 border-none rounded-xl text-white text-base font-semibold cursor-pointer transition-all duration-200 flex items-center justify-center gap-2 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-lime-500/30 active:translate-y-0 disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none"
			:disabled="loading"
		>
			<span v-if="!loading">Войти</span>
			<div v-else class="flex items-center gap-2">
				<div
					class="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"
				></div>
				<span>Вход...</span>
			</div>
		</button>

		<div class="relative text-center my-2">
			<div class="absolute inset-0 flex items-center">
				<div class="w-full border-t border-gray-200"></div>
			</div>
			<span class="bg-white px-4 text-sm text-gray-500 font-medium"
				>или</span
			>
		</div>

		<div class="flex flex-col gap-3">
			<p class="text-center text-sm text-gray-500 font-medium m-0">
				Войти с помощью
			</p>
			<div class="flex justify-center">
				<button
					type="button"
					class="flex items-center gap-2 px-6 py-3 border-2 border-gray-200 rounded-xl bg-white text-gray-700 text-sm font-medium cursor-pointer transition-all duration-200 hover:border-gray-300 hover:bg-gray-50 hover:-translate-y-0.5 min-w-[140px]"
				>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						height="20"
						viewBox="0 0 24 24"
						width="20"
					>
						<path
							d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
							fill="#4285F4"
						/>
						<path
							d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
							fill="#34A853"
						/>
						<path
							d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
							fill="#FBBC05"
						/>
						<path
							d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
							fill="#EA4335"
						/>
					</svg>
					<span>Google</span>
				</button>
			</div>
		</div>
	</form>
</template>
<style scoped></style>
