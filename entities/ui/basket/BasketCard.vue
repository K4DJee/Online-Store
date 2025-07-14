<template>
	<div
		v-if="product"
		:to="`/product/${product.productId}`"
		class="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
	>
		<div class="flex items-start space-x-4">
			<!-- Product Image -->
			<div class="flex-shrink-0">
				<NuxtLink :to="`/product/${product.productId}`">
					<img
						:src="product.imageUrl"
						:alt="product.productName"
						class="w-24 h-24 object-cover rounded-xl"
					/>
				</NuxtLink>
			</div>

			<!-- Product Info -->
			<div class="flex-1 min-w-0">
				<div class="flex items-start justify-between">
					<div class="flex-1">
						<NuxtLink :to="`/product/${product.productId}`">
							<h4
								class="text-lg font-semibold text-gray-900 mb-1"
							>
								{{ product.productName }}
							</h4>
						</NuxtLink>
						<p class="text-sm text-gray-600 mb-2">
							Продавец: {{ product.sellerName }}
						</p>

						<!-- Price -->
						<div class="flex items-center space-x-2 mb-4">
							<!-- sale price -->
							<div
								v-if="product.salePrice"
								className="flex items-center space-x-3"
							>
								<!--  Current Price  -->
								<span class="text-xl font-bold text-green-700">
									{{ product.salePrice.toLocaleString() }} ₽
								</span>

								<!-- Original Price (if on sale)  -->
								<span
									class="text-sm text-gray-400 line-through"
								>
									{{ product.productPrice.toLocaleString() }}
									₽
								</span>
							</div>

							<!-- no sale  -->
							<span v-else class="text-sm text-gray-600">
								{{
									Number(
										product.productPrice
									).toLocaleString()
								}}
								₽
							</span>
						</div>
					</div>

					<!-- Actions -->
					<div class="flex flex-col items-end space-y-2">
						<button
							@click="$emit('remove', product.cartId)"
							class="text-gray-400 hover:text-red-500 transition-colors cursor-pointer"
						>
							<svg
								class="w-5 h-5"
								fill="currentColor"
								viewBox="0 0 24 24"
							>
								<path
									d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"
								/>
							</svg>
						</button>
					</div>
				</div>

				<!-- Quantity and Actions -->
				<div class="flex items-center justify-between">
					<div class="flex items-center space-x-3">
						<button
							@click="
								basketStore.updateQuantity(
									product,
									product.quantity - 1
								)
							"
							:disabled="product.quantity <= 1"
							class="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
						>
							<svg
								class="w-4 h-4"
								fill="currentColor"
								viewBox="0 0 24 24"
							>
								<path d="M19 13H5v-2h14v2z" />
							</svg>
						</button>
						<span
							class="text-lg font-medium min-w-[2rem] text-center"
							>{{ product.quantity }}</span
						>
						<button
							@click="
								basketStore.updateQuantity(
									product,
									product.quantity + 1
								)
							"
							class="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-50 transition-colors"
						>
							<svg
								class="w-4 h-4"
								fill="currentColor"
								viewBox="0 0 24 24"
							>
								<path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z" />
							</svg>
						</button>
					</div>

					<div class="flex items-center space-x-4">
						<button
							@click="emit('moveToWishlist', product)"
							class="text-sm text-gray-600 hover:text-lime-600 transition-colors flex items-center space-x-1 cursor-pointer"
						>
							<svg
								class="w-4 h-4"
								fill="currentColor"
								viewBox="0 0 24 24"
							>
								<path
									d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
								/>
							</svg>
							<span>В избранное</span>
						</button>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import type { basketProduct } from '~/types/basketTypes'
import { useBasketStore } from '#imports'
import { NuxtLink } from '#components'

const basketStore = useBasketStore()

const props = defineProps<{
	product: basketProduct
}>()

const emit = defineEmits(['remove', 'moveToWishlist'])
</script>

<style scoped></style>
