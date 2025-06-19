<script setup lang="ts">
import type { IProduct } from '~/entities/model/productCard'
import axios from 'axios'

const products = ref<IProduct[]>([])

async function fetchProducts() {
	try {
		const response = await axios.get('http://localhost:8000/api/products')

		products.value = response.data.products
	} catch (error) {
		console.log('Error: ', error)
	}
}

onMounted(async () => {
	await fetchProducts()
	console.log(products.value)
})
</script>

<template>
	<div class="mt-6 m-auto max-w-[1350px]">
		<section class="mb-4">
			<div
				class="bg-gradient-to-r from-lime-500 to-lime-600 rounded-2xl p-8 text-white"
			>
				<h2 class="text-4xl font-bold mb-4">Найкращі технології</h2>
				<p class="text-lime-100 text-lg mb-6">
					Відкрийте для себе новітні гаджети та електроніку за
					найкращими цінами
				</p>
				<button
					class="bg-white text-lime-600 font-semibold py-3 px-6 rounded-lg hover:bg-gray-100 transition-colors"
				>
					Переглянути каталог
				</button>
			</div>
		</section>

		<h2 class="products-title mb-12">Интернет-магазин</h2>

		<section class="max-w-[1350px] mx-auto px-4">
			<div
				v-if="products.length > 0"
				class="grid gap-[50px] justify-center items-start grid-cols-[repeat(auto-fit,minmax(250px,1fr))]"
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
</template>

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
