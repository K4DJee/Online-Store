<template>
	<form class="flex flex-col gap-5" @submit.prevent="submitForm">
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

		<div class="relative">
			<input
				v-model="confirmPassword"
				type="password"
				placeholder="Подтвердите пароль"
				class="w-full h-12 px-4 border-2 border-gray-200 rounded-xl text-base text-gray-700 bg-white transition-all duration-200 outline-none focus:border-lime-500 focus:ring-4 focus:ring-lime-100 placeholder-gray-400"
			/>
		</div>

		<div class="my-2">
			<label
				class="flex items-start gap-3 cursor-pointer leading-relaxed"
			>
				<input v-model="consent" type="checkbox" class="sr-only" />
				<div
					class="relative w-5 h-5 border-2 border-gray-300 rounded-md bg-white transition-all duration-200 flex-shrink-0 mt-0.5 hover:border-lime-500"
				>
					<div
						v-if="consent"
						class="absolute inset-0 bg-lime-500 border-lime-500 rounded-md flex items-center justify-center"
					>
						<svg
							class="w-3 h-3 text-white"
							viewBox="0 0 16 16"
							fill="none"
							xmlns="http://www.w3.org/2000/svg"
						>
							<path
								d="M13.5 4.5L6 12L2.5 8.5"
								stroke="currentColor"
								stroke-width="2"
								stroke-linecap="round"
								stroke-linejoin="round"
							/>
						</svg>
					</div>
				</div>
				<span class="text-sm text-gray-600 select-none"
					>Согласие на обработку персональных данных</span
				>
			</label>
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
			<span v-if="!loading">Зарегистрироваться</span>
			<div v-else class="flex items-center gap-2">
				<div
					class="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"
				></div>
				<span>Регистрация...</span>
			</div>
		</button>
	</form>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import type { AuthState } from '../types/types'
const router = useRouter()
interface User {
	username: string
	email: string
	password: string
	consent: boolean
	regDate: string
	role: string
}
interface registerResponse {
	token: string
}
const username = ref('')
const email = ref('')
const password = ref('')
const confirmPassword = ref('')
const consent = ref(false)
const errorMessage = ref('')
const token = useCookie('token')
const auth = inject<AuthState>('auth')
const loading = ref(false)
const emit = defineEmits<{
	(e: 'close'): void
}>()

//functions
const submitForm = async () => {
	errorMessage.value = ''
	if (
		!username.value ||
		!email.value ||
		!password.value ||
		!confirmPassword.value
	) {
		return (errorMessage.value = 'Введите данные')
	}
	if (password.value != confirmPassword.value) {
		errorMessage.value = 'Пароли не совпадают'
		return
	}
	if (consent.value === false) {
		errorMessage.value =
			'Чтобы зарегистрироваться, вы должны согласиться на обработку персональных данных'
		return
	}
	const user: User = {
		username: username.value,
		email: email.value,
		password: password.value,
		consent: consent.value,
		regDate: new Date().toISOString(),
		role: 'user',
	}
	try {
		loading.value = true
		if (user.username.length <= 3) {
			return (errorMessage.value =
				'Количество символов в имени должно быть больше 3')
		}
		if (!isValidEmail(user.email)) {
			return (errorMessage.value = 'Введите корректный email')
		}
		const data = await $fetch<registerResponse>(
			'http://localhost:8000/api/register',
			{
				method: 'POST',
				body: user,
			}
		)
		if (data?.token) {
			token.value = data.token
			auth?.fetchUserData(data.token)
			emit('close')
			router.push('/profile')
		} else {
			console.log('Error register')
			errorMessage.value = 'Error register'
		}
	} catch (error: any) {
		const status = error?.status
		switch (status) {
			case 400:
				errorMessage.value = 'Указаны неполные данные'
				break
			case 401:
				errorMessage.value =
					'Пользователь с такой почтой или никнейном уже существует'
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

<style scoped></style>
