<template>
	<header
		class="relative bg-gradient-to-r from-lime-400 via-lime-500 to-lime-600 h-16 shadow-lg flex items-center justify-center"
	>
		<div
			class="w-full max-w-7xl mx-auto px-4 flex items-center justify-between"
		>
			<!-- Logo -->
			<NuxtLink to="/" class="w-fit">
				<div class="text-2xl font-bold text-gray-900">
					<NuxtImg src="/assets/Klan.svg"></NuxtImg>
				</div>
			</NuxtLink>

			<!-- Navigation -->
			<nav class="hidden md:flex items-center gap-8">
				<!-- Delivery -->
				<NuxtLink
					to="/orders"
					class="flex items-center p-2 justify-center gap-3 rounded-xl text-white hover:text-lime-100 transition-colors duration-200"
					:class="[{ 'bg-lime-500': isOrdersActive }]"
				>
					<NuxtImg src="/icons/delivery.png" class="size-6"></NuxtImg>
					<span class="font-medium">Заказы</span>
				</NuxtLink>

				<!-- Favorite -->
				<NuxtLink
					to="/favourite"
					class="flex items-center p-2 justify-center gap-3 rounded-xl text-white hover:text-lime-100 transition-colors duration-200"
					:class="[{ 'bg-lime-500': isFavouriteActive }]"
				>
					<NuxtImg src="/icons/package.png" class="size-6"></NuxtImg>
					<span class="font-medium">Избранное</span>
				</NuxtLink>

				<!-- Shopping basket -->
				<NuxtLink
					to="/basket"
					class="flex items-center p-2 justify-center gap-3 rounded-xl text-white hover:text-lime-100 transition-colors duration-200"
					:class="[{ 'bg-lime-500': isBasketActive }]"
				>
					<NuxtImg src="/icons/basket.png" class="size-6"></NuxtImg>
					<span class="font-medium">Корзина</span>
				</NuxtLink>

				<!-- Profile / Login -->
				<button
					@click="onProfileClick"
					class="flex items-center p-2 justify-center cursor-pointer gap-3 rounded-xl text-white hover:text-lime-100 transition-colors duration-200"
					:class="[{ 'bg-lime-500': isProfileActive }]"
				>
					<NuxtImg src="/icons/profile.png" class="size-6"></NuxtImg>
					<span class="font-medium">{{
						profileStore.isAuthenticated ? 'Профиль' : 'Войти'
					}}</span>
				</button>
			</nav>

			<!-- Mobile menu button -->
			<button @click="toggleMobileMenu" class="md:hidden text-white">
				<svg
					class="w-6 h-6"
					fill="none"
					stroke="currentColor"
					viewBox="0 0 24 24"
				>
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="2"
						d="M4 6h16M4 12h16M4 18h16"
					/>
				</svg>
			</button>
		</div>

		<!-- Блюр & бекдроп -->
		<transition
			name="fade"
			appear
			enter-active-class="transition-transform duration-300"
			leave-active-class="transition-transform duration-200"
		>
			<div
				v-if="mobileMenuOpen"
				class="fixed inset-0 bg-opacity-30 backdrop-blur-sm z-40 transition"
				@click="toggleMobileMenu"
			></div>
		</transition>

		<!-- Mobile menu -->
		<transition
			appear
			enter-active-class="transition-transform duration-300"
			enter-from-class="translate-x-full"
			enter-to-class="translate-x-0"
			leave-active-class="transition-transform duration-200"
			leave-from-class="translate-x-0"
			leave-to-class="translate-x-full"
		>
			<nav
				v-if="mobileMenuOpen"
				class="fixed inset-y-0 right-0 w-64 bg-lime-500 z-50 p-6 flex flex-col space-y-6"
			>
				<button
					@click="toggleMobileMenu"
					class="self-end text-white focus:outline-none"
				>
					<svg
						class="w-6 h-6"
						fill="none"
						stroke="currentColor"
						viewBox="0 0 24 24"
					>
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M6 18L18 6M6 6l12 12"
						/>
					</svg>
				</button>

				<ul class="flex flex-col space-y-4">
					<!-- Main Page -->
					<li>
						<NuxtLink
							to="/"
							class="flex items-center rounded-xl p-2 cursor-pointer gap-3 text-white hover:text-lime-100 transition-colors duration-200"
							:class="[{ 'bg-lime-600': isMainActive }]"
						>
							<NuxtImg
								src="/icons/delivery.png"
								class="w-6 h-6"
							/>
							Главная
						</NuxtLink>
					</li>

					<!-- Orders -->
					<li>
						<NuxtLink
							to="/delivery"
							class="flex items-center rounded-xl p-2 cursor-pointer gap-3 text-white hover:text-lime-100 transition-colors duration-200"
							:class="[{ 'bg-lime-600': isOrdersActive }]"
						>
							<NuxtImg
								src="/icons/delivery.png"
								class="w-6 h-6"
							/>
							Доставка
						</NuxtLink>
					</li>

					<!-- Favorite -->
					<li>
						<NuxtLink
							to="/favourite"
							class="flex items-center rounded-xl p-2 cursor-pointer gap-3 text-white hover:text-lime-100 transition-colors duration-200"
							:class="[{ 'bg-lime-600': isFavouriteActive }]"
						>
							<NuxtImg src="/icons/package.png" class="w-6 h-6" />
							Избранное
						</NuxtLink>
					</li>

					<!-- Shopping basket -->
					<li>
						<NuxtLink
							to="/basket"
							class="flex items-center rounded-xl p-2 cursor-pointer gap-3 text-white hover:text-lime-100 transition-colors duration-200"
							:class="[{ 'bg-lime-600': isBasketActive }]"
						>
							<NuxtImg src="/icons/basket.png" class="w-6 h-6" />
							Корзина
						</NuxtLink>
					</li>

					<!-- Profile / Login -->
					<li>
						<button
							@click="onProfileClick"
							class="flex items-center p-2 cursor-pointer rounded-xl gap-3 text-white hover:text-lime-100 transition-colors duration-200 w-full text-left"
							:class="[{ 'bg-lime-600': isProfileActive }]"
						>
							<NuxtImg src="/icons/profile.png" class="w-6 h-6" />
							{{
								profileStore.isAuthenticated
									? 'Профиль'
									: 'Войти'
							}}
						</button>
					</li>
				</ul>
			</nav>
		</transition>
	</header>

	<!-- Auth Modal -->

	<AuthModal
		:is-open="appStore.isAuthModal"
		@close="appStore.toggleAuthModal()"
	></AuthModal>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useAppStore } from '#imports'

const appStore = useAppStore()
const profileStore = useProfileStore()

const route = useRoute()
const router = useRouter()

watch(
	() => route.fullPath,
	() => {
		mobileMenuOpen.value = false
	}
)

type AuthState = {
	isAuthUser: Ref<boolean>
}
const auth = inject<AuthState>('auth')

const isAuthUser = computed(() => auth?.isAuthUser.value)
const mobileMenuOpen = ref(false)

const toggleMobileMenu = () => {
	mobileMenuOpen.value = !mobileMenuOpen.value
}

const isMainActive = computed(() => route.path === '/')
const isOrdersActive = computed(() => route.path === '/orders')
const isFavouriteActive = computed(() => route.path === '/favourite')
const isBasketActive = computed(() => route.path === '/basket')
const isProfileActive = computed(() => route.path === '/profile')

function onProfileClick() {
	if (profileStore.isAuthenticated) {
		router.push('/profile')
	} else {
		appStore.toggleAuthModal()
		mobileMenuOpen.value = false
	}
}
</script>

<style scoped></style>
