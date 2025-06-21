<template>
	<section class="bg-gray-50">
		<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
			<div v-if="user" class="grid grid-cols-1 lg:grid-cols-4 gap-8">
				<!-- Sidebar Menu -->
				<div class="lg:col-span-1">
					<div
						class="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden sticky top-8"
					>
						<!-- Profile Header -->
						<div
							class="p-6 bg-gradient-to-r from-lime-500 to-lime-600 text-white"
						>
							<div class="flex items-center space-x-4">
								<div
									class="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm"
								>
									<svg
										class="w-8 h-8 text-white"
										fill="currentColor"
										viewBox="0 0 24 24"
									>
										<path
											d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"
										/>
									</svg>
								</div>
								<div>
									<h2 class="text-xl font-bold">
										{{ user!.username }}
									</h2>
									<button
										class="text-lime-100 hover:text-white text-sm transition-colors"
									>
										Изменить профиль
									</button>
								</div>
							</div>
						</div>

						<!-- Navigation Menu -->
						<nav class="p-4 space-y-1">
							<div
								class="px-3 py-2 text-xs font-semibold text-gray-500 uppercase tracking-wider"
							>
								Личная информация
							</div>
							<button
								@click="router.push('/profile')"
								class="w-full flex items-center px-3 py-2 text-sm font-medium text-white bg-lime-500 rounded-lg transition-colors"
							>
								<svg
									class="mr-3 w-5 h-5"
									fill="currentColor"
									viewBox="0 0 24 24"
								>
									<path
										d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"
									/>
								</svg>
								Главная
							</button>
							<button
								@click="router.push('/balance')"
								class="w-full flex items-center px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
							>
								<svg
									class="mr-3 w-5 h-5"
									fill="currentColor"
									viewBox="0 0 24 24"
								>
									<path
										d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1.41 16.09V20h-2.67v-1.93c-1.71-.36-3.16-1.46-3.27-3.4h1.96c.1 1.05.82 1.87 2.65 1.87 1.96 0 2.4-.98 2.4-1.59 0-.83-.44-1.61-2.67-2.14-2.48-.6-4.18-1.62-4.18-3.67 0-1.72 1.39-2.84 3.11-3.21V4h2.67v1.95c1.86.45 2.79 1.86 2.85 3.39H14.3c-.05-1.11-.64-1.87-2.22-1.87-1.5 0-2.4.68-2.4 1.64 0 .84.65 1.39 2.67 1.91s4.18 1.39 4.18 3.91c-.01 1.83-1.38 2.83-3.12 3.16z"
									/>
								</svg>
								Баланс средств
							</button>

							<div
								class="px-3 py-2 text-xs font-semibold text-gray-500 uppercase tracking-wider mt-4"
							>
								Заказы
							</div>
							<button
								@click="router.push('/orders')"
								class="w-full flex items-center px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
							>
								<svg
									class="mr-3 w-5 h-5"
									fill="currentColor"
									viewBox="0 0 24 24"
								>
									<path
										d="M7 4V2C7 1.45 7.45 1 8 1H16C16.55 1 17 1.45 17 2V4H20C20.55 4 21 4.45 21 5S20.55 6 20 6H19V19C19 20.1 18.1 21 17 21H7C5.9 21 5 20.1 5 19V6H4C3.45 6 3 5.55 3 5S3.45 4 4 4H7ZM9 3V4H15V3H9ZM7 6V19H17V6H7Z"
									/>
								</svg>
								Мои заказы
							</button>
							<button
								class="w-full flex items-center px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
							>
								<svg
									class="mr-3 w-5 h-5"
									fill="currentColor"
									viewBox="0 0 24 24"
								>
									<path
										d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"
									/>
								</svg>
								Мои возвраты
							</button>
							<button
								@click="router.push('/basket')"
								class="w-full flex items-center px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
							>
								<svg
									class="mr-3 w-5 h-5"
									fill="currentColor"
									viewBox="0 0 24 24"
								>
									<path
										d="M7 4V2C7 1.45 7.45 1 8 1H16C16.55 1 17 1.45 17 2V4H20C20.55 4 21 4.45 21 5S20.55 6 20 6H19V19C19 20.1 18.1 21 17 21H7C5.9 21 5 20.1 5 19V6H4C3.45 6 3 5.55 3 5S3.45 4 4 4H7Z"
									/>
								</svg>
								Корзина
							</button>

							<div
								class="px-3 py-2 text-xs font-semibold text-gray-500 uppercase tracking-wider mt-4"
							>
								Отзывы
							</div>
							<button
								class="w-full flex items-center px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
							>
								<svg
									class="mr-3 w-5 h-5"
									fill="currentColor"
									viewBox="0 0 24 24"
								>
									<path
										d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"
									/>
								</svg>
								Мои отзывы
							</button>

							<div
								class="px-3 py-2 text-xs font-semibold text-gray-500 uppercase tracking-wider mt-4"
							>
								Для продавца
							</div>
							<button
								class="w-full flex items-center px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
							>
								<svg
									class="mr-3 w-5 h-5"
									fill="currentColor"
									viewBox="0 0 24 24"
								>
									<path
										d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"
									/>
								</svg>
								Стать продавцом
							</button>
							<button
								class="w-full flex items-center px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
							>
								<svg
									class="mr-3 w-5 h-5"
									fill="currentColor"
									viewBox="0 0 24 24"
								>
									<path
										d="M16 6l2.29 2.29-4.88 4.88-4-4L2 16.59 3.41 18l6-6 4 4 6.3-6.29L22 12V6z"
									/>
								</svg>
								Мои продажи
							</button>
							<button
								class="w-full flex items-center px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
							>
								<svg
									class="mr-3 w-5 h-5"
									fill="currentColor"
									viewBox="0 0 24 24"
								>
									<path
										d="M11.8 10.9c-2.27-.59-3-1.2-3-2.15 0-1.09 1.01-1.85 2.7-1.85 1.78 0 2.44.85 2.5 2.1h2.21c-.07-1.72-1.12-3.3-3.21-3.81V3h-3v2.16c-1.94.42-3.5 1.68-3.5 3.61 0 2.31 1.91 3.46 4.7 4.13 2.5.6 3 1.48 3 2.41 0 .69-.49 1.79-2.7 1.79-2.06 0-2.87-.92-2.98-2.1h-2.2c.12 2.19 1.76 3.42 3.68 3.83V21h3v-2.15c1.95-.37 3.5-1.5 3.5-3.55 0-2.84-2.43-3.81-4.7-4.4z"
									/>
								</svg>
								Мой счёт
							</button>
						</nav>

						<!-- Logout Button -->
						<div class="p-4 border-t border-gray-100">
							<button
								@click="logout"
								class="w-full flex items-center justify-center px-4 py-2 text-sm font-medium text-red-600 hover:bg-red-50 rounded-lg transition-colors"
							>
								<svg
									class="mr-2 w-5 h-5"
									fill="currentColor"
									viewBox="0 0 24 24"
								>
									<path
										d="M17 7l-1.41 1.41L18.17 11H8v2h10.17l-2.58 2.58L17 17l5-5zM4 5h8V3H4c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h8v-2H4V5z"
									/>
								</svg>
								Выйти
							</button>
						</div>
					</div>
				</div>

				<!-- Main Content -->
				<div class="lg:col-span-3 space-y-8">
					<!-- Balance and Stats Section -->
					<div class="grid grid-cols-1 md:grid-cols-2 gap-6">
						<!-- Balance Card -->
						<BalanceCard />

						<!-- Quick Stats -->
						<ProfileQuickInfo />
					</div>

					<!-- Account Settings Section -->
					<div class="space-y-6">
						<!-- Email Settings -->
						<settings-section :type="'text'">
							<template #title
								>Почта, привязанная к аккаунту</template
							>
							<template #icon
								><svg
									class="w-5 h-5 text-lime-600"
									fill="currentColor"
									viewBox="0 0 24 24"
								>
									<path
										d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"
									></path>
								</svg>
							</template>
							<template #text>{{ user!.email }}</template>
							<template #textButton
								>Привязать другую почту</template
							>
						</settings-section>

						<!-- Registration Date -->
						<settings-section :type="'text'">
							<template #title
								>Дата регистрации аккаунта</template
							>
							<template #icon
								><svg
									class="w-5 h-5 text-blue-600"
									fill="currentColor"
									viewBox="0 0 24 24"
								>
									<path
										d="M9 11H7v2h2v-2zm4 0h-2v2h2v-2zm4 0h-2v2h2v-2zm2-7h-1V2h-2v2H8V2H6v2H5c-1.1 0-1.99.9-1.99 2L3 20c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 16H5V9h14v11z"
									></path>
								</svg>
							</template>
							<template #text>{{
								formatDate(new Date(user.regDate))
							}}</template>
						</settings-section>

						<!-- Promo Code -->
						<settings-section
							:type="'input'"
							v-model:inputModel="promoQuery"
							:placeholder="'Введите промокод'"
						>
							<template #title>Активировать промокод </template>
							<template #inputButton>Активировать</template>
						</settings-section>
					</div>
				</div>
			</div>
		</div>
	</section>
</template>

<script setup lang="ts">
import type { AuthState, IUser } from '~/types/types'
import { useProfileStore } from '#imports'

const profileStore = useProfileStore()
const { user } = storeToRefs(profileStore)

const promoQuery = ref<string>('')

const currentUser = inject<AuthState>('auth')

const token = useCookie('token')
const router = useRouter()

const logout = () => {
	token.value = null

	if (currentUser?.isAuthUser) {
		currentUser.isAuthUser.value = false
	}
	if (currentUser?.currentUser) {
		currentUser.currentUser.value = null
	}

	router.push('/')
}

definePageMeta({
	middleware: 'auth',
})

const promoCode = ref('')

const go = (path: string) => {
	router.push(path)
}

const formatDate = (date: Date) =>
	date.toLocaleDateString('ru-RU', {
		year: 'numeric',
		month: 'long',
		day: 'numeric',
	})

const applyPromo = () => {
	console.log('Promo code applied:', promoCode.value)
}
</script>

<style scoped></style>
