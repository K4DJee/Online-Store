<template>
	<div class="mt-6 m-auto max-w-[1350px]">
		<section class="mb-4">
			<SearchInput></SearchInput>
			<div
				class="bg-gradient-to-r from-lime-500 to-lime-600 rounded-2xl p-8 text-white"
			>
				<h2 class="text-4xl font-bold mb-4">Лучшие технологии</h2>
				<p class="text-lime-100 text-lg mb-6">
					Откройте для себя новейшие гаджеты и электронику по лучшим
					ценам
				</p>
				<button
					class="bg-white text-lime-600 font-semibold py-3 px-6 rounded-lg hover:bg-gray-100 transition-colors"
				>
					Посмотреть каталог
				</button>
			</div>
		</section>

		<h2 class="products-title mb-12">Интернет-магазин</h2>

		<section class="max-w-[1350px] mx-auto px-4">
			<div
				v-if="products.length > 0"
				class="grid gap-[50px] justify-center items-stretch grid-cols-[repeat(auto-fit,minmax(250px,1fr))]"
			>
				<product-card
					v-for="(product, index) in products"
					:key="index"
					:product="product"
				/>
			</div>

			<Loader v-else />
		</section>
	</div>

	<AuthModal :is-open="isAuthModal" @close="isAuthModal = false"></AuthModal>
</template>

<script setup lang="ts">
import type { IProduct } from '~/types/types'

const AuthModal = defineAsyncComponent(
	() => import('~/components/AuthModal.vue')
)
const ProductCard = defineAsyncComponent(
	() => import('~/entities/ui/ProductCard.vue')
)

import Loader from '~/components/Loader.vue'
import SearchInput from '~/components/searchInput.vue'

interface responseProducts {
	products: [IProduct]
	success: boolean
}

const products = ref<IProduct[]>([])
const profileStore = useProfileStore()
const isAuthenticated = computed(() => profileStore.isAuthenticated)
const isAuthModal = ref(false)
async function fetchProducts() {
	try {
		const response = await $fetch<responseProducts>(
			'http://localhost:8000/api/products',
			{
				method: 'GET',
			}
		)
		if (response?.products) {
			products.value = response.products
			return products.value
		}
		console.log('products:', response.products)
	} catch (error: any) {
		const status = error?.status
		switch (status) {
			case 500:
				console.log('Ошибка сервера.')
				break
			default:
				console.log('Произошла неизвестная ошибка.')
				break
		}
	}
}

onMounted(async () => {
	await fetchProducts()
})
</script>

<style>
.products-title {
	text-align: center;
	font-family: 'Roboto';
	font-size: 3rem;
	font-weight: 800;
	background: linear-gradient(135deg, #84cc16, #65a30d);
	-webkit-background-clip: text;
	-webkit-text-fill-color: transparent;
	background-clip: text;
}
</style>
