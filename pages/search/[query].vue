<template>
	<div class="mt-6 m-auto max-w-[1350px]">
		<section class="mb-4">
			<SearchInput></SearchInput>
			<div class="flex gap-8 p-5">
				<div
					class="hidden sm:block sm:w-[300px] border border-gray-200 rounded-2xl bg-white px-5 font-medium text-lg"
				>
					<h2 class="mt-5">Фильтры</h2>
					<div class="border border-gray-200 mt-5"></div>
					<h2 class="mt-2.5 text-sm text-gray-500 font-normal">
						Категории
					</h2>
					<ul class="gap-1.25 grid justify-start mt-2.5">
						<li class="flex gap-2.5 items-center">
							<input
								type="checkbox"
								class="size-[15px] accent-lime-600"
							/>
							<span class="text-sm font-normal"
								>Детские товары</span
							>
						</li>
						<li class="flex gap-2.5 items-center">
							<input
								type="checkbox"
								class="size-[15px] accent-lime-600"
							/>
							<span class="text-sm font-normal">Одежда</span>
						</li>
						<li class="flex gap-2.5 items-center">
							<input
								type="checkbox"
								class="size-[15px] accent-lime-600"
							/>
							<span class="text-sm font-normal">Электроника</span>
						</li>
						<li class="flex gap-2.5 items-center">
							<input
								type="checkbox"
								class="size-[15px] accent-lime-600"
							/>
							<span class="text-sm font-normal">Обувь</span>
						</li>
					</ul>
					<!-- <ais-refinement-list></ais-refinement-list> -->
					<div class="border border-gray-200 mt-5"></div>

					<h2 class="text-gray-500 mt-2.5 text-sm font-normal">
						Ценовой диапозон
					</h2>

					<div class="mt-2.5 flex justify-between">
						<input
							class="h-[35px] w-[70px] border rounded-sm px-1 font-normal text-base"
							type="number"
							placeholder="1000"
							min="0"
							max="1000000"
						/>
						<div>-</div>
						<input
							class="h-[35px] w-[70px] border rounded-sm px-1 font-normal text-base"
							type="number"
							placeholder="10000"
							min="0"
							max="1000000"
						/>
					</div>

					<div class="mt-2.5">
						<input
							type="range"
							class="w-full accent-lime-500 accent-regal-blue"
						/>
						<div class="flex justify-between">
							<h2 class="font-normal text-gray-500 text-sm">
								0 ₽
							</h2>
							<h2 class="font-normal text-gray-500 text-sm">
								100 000 ₽
							</h2>
						</div>
					</div>

					<div class="border border-gray-200 mt-5"></div>

					<button
						class="mt-5 cursor-pointer text-white font-normal rounded-sm w-full h-[35px] bg-linear-to-r from-lime-400 to-lime-500 hover:from-lime-500 hover:to-lime-600 transition-colors text-base"
					>
						Очистить фильтры
					</button>
				</div>
				<div
					v-if="query.trim()"
					class="border border-gray-200 rounded-2xl bg-white min-w-0 w-full grid p-5"
				>
					<p class="text-lg font-medium">
						Поиск по запросу: "{{ query }}"
					</p>
					<div
						class="mt-5 grid gap-[50px] justify-center items-stretch grid-cols-[repeat(auto-fit,minmax(250px,1fr))]"
					>
						<product-card
							class="max-w-[310px]"
							v-for="(product, index) in products"
							:key="index"
							:product="product"
						/>
					</div>
				</div>
			</div>
		</section>
	</div>
</template>
<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import type { SearchResponse } from '@nuxtjs/algolia'
import SearchInput from '~/components/searchInput.vue'
import { adaptAlgoliaToProduct } from '~/entities/helpers/algoliaAdapter'
// import { } from 'vue-instantsearch'
const ProductCard = defineAsyncComponent(
	() => import('~/entities/ui/ProductCard.vue')
)

const route = useRoute()
const router = useRouter()
const searchResults = ref<SearchResponse<unknown> | null>(null)
const products = computed(() =>
	searchResults.value?.hits.map(hit => adaptAlgoliaToProduct(hit))
)

const query = ref(decodeURIComponent(route.params.query as string))

const { result, search } = useAlgoliaSearch('products')

onMounted(async () => {
	if (query.value.trim()) {
		try {
			await search({ query: query.value })
			searchResults.value = result.value
			console.log('products: ', products)
		} catch (error) {
			console.error('Ошибка при поиске:', error)
			searchResults.value = null
		}
	}
})
</script>
