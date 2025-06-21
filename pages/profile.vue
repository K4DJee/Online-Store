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
						<ProfileHeader />

						<!-- Navigation Menu -->
						<SidebarNav />

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
