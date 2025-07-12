<template>
	<section v-if="!basketStore.isLoading" class="min-h-screen bg-gray-50">
		<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
			<!-- Header -->
			<div class="mb-8">
				<div class="flex items-center justify-between mb-6">
					<div>
						<h1 class="text-3xl font-bold text-gray-900">
							Корзина
						</h1>
						<p class="text-gray-600 mt-1">
							{{ basketStore.totalItems }}
							{{
								basketStore.totalItems === 1
									? 'товар'
									: basketStore.totalItems < 5
									? 'товара'
									: 'товаров'
							}}
						</p>
					</div>
					<button
						@click="router.push('/')"
						class="text-lime-600 hover:text-lime-700 font-medium transition-colors flex items-center space-x-2 cursor-pointer"
					>
						<svg
							class="w-5 h-5"
							fill="currentColor"
							viewBox="0 0 24 24"
						>
							<path
								d="M19 7h-3V6a4 4 0 0 0-8 0v1H5a1 1 0 0 0-1 1v11a3 3 0 0 0 3 3h10a3 3 0 0 0 3-3V8a1 1 0 0 0-1-1zM10 6a2 2 0 0 1 4 0v1h-4V6zm8 13a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V9h2v1a1 1 0 0 0 2 0V9h4v1a1 1 0 0 0 2 0V9h2v10z"
							/>
						</svg>
						<span>Продолжить покупки</span>
					</button>
				</div>
			</div>

			<div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
				<!-- Items List -->
				<div class="lg:col-span-2 space-y-6">
					<!-- Basket Items -->
					<div
						v-if="basketStore.basketItems.length > 0"
						class="space-y-4"
					>
						<h3 class="text-lg font-semibold text-gray-900">
							В наличии
						</h3>

						<basket-card
							v-for="product in basketStore.basketItems"
							:key="product.cartId"
							:product
							@remove="onRemove"
							@moveToWishlist="onMoveToWishlist"
						></basket-card>
					</div>

					<!-- Empty State -->
					<div
						v-if="basketStore.basketItems.length === 0"
						class="text-center py-12"
					>
						<div
							class="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4"
						>
							<svg
								class="w-12 h-12 text-gray-400"
								fill="currentColor"
								viewBox="0 0 24 24"
							>
								<path
									d="M7 4V2C7 1.45 7.45 1 8 1H16C16.55 1 17 1.45 17 2V4H20C20.55 4 21 4.45 21 5S20.55 6 20 6H19V19C19 20.1 18.1 21 17 21H7C5.9 21 5 20.1 5 19V6H4C3.45 6 3 5.55 3 5S3.45 4 4 4H7Z"
								/>
							</svg>
						</div>
						<h3 class="text-lg font-medium text-gray-900 mb-2">
							Корзина пуста
						</h3>
						<p class="text-gray-600 mb-6">
							Добавьте товары в корзину, чтобы оформить заказ
						</p>
						<button
							@click="router.push('/')"
							class="bg-lime-500 hover:bg-lime-600 text-white px-6 py-3 rounded-xl font-medium transition-colors"
						>
							Перейти к покупкам
						</button>
					</div>
				</div>

				<!-- Order Summary -->
				<div class="lg:col-span-1">
					<div
						class="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 sticky top-8"
					>
						<h3 class="text-lg font-semibold text-gray-900 mb-4">
							Итого
						</h3>

						<div class="space-y-3 mb-6">
							<div class="flex justify-between text-sm">
								<span class="text-gray-600"
									>Товары ({{
										basketStore.basketItems.length
									}})</span
								>
								<span class="text-gray-900"
									>{{
										basketStore.totalOriginalPrice.toLocaleString()
									}}
									₽</span
								>
							</div>
							<div
								v-if="basketStore.totalDiscount > 0"
								class="flex justify-between text-sm"
							>
								<span class="text-gray-600">Скидка</span>
								<span class="text-green-600"
									>-{{
										basketStore.totalDiscount.toLocaleString()
									}}
									₽</span
								>
							</div>
							<div class="border-t border-gray-200 pt-3">
								<div class="flex justify-between">
									<span
										class="text-lg font-semibold text-gray-900"
										>К оплате</span
									>
									<span
										class="text-xl font-bold text-gray-900"
										>{{
											basketStore.totalPrice.toLocaleString()
										}}
										₽</span
									>
								</div>
							</div>
						</div>

						<button
							@click="basketStore.proceedToCheckout"
							:disabled="basketStore.basketItems.length === 0"
							class="w-full bg-lime-500 hover:bg-lime-600 disabled:bg-gray-300 disabled:cursor-not-allowed text-white py-3 rounded-xl font-medium transition-colors mb-4 cursor-pointer"
						>
							Перейти к оформлению
						</button>

						<div class="space-y-3 text-sm text-gray-600">
							<div class="flex items-center space-x-2">
								<svg
									class="w-4 h-4 text-green-500"
									fill="currentColor"
									viewBox="0 0 24 24"
								>
									<path
										d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"
									/>
								</svg>
								<span>Безопасная оплата</span>
							</div>
							<div class="flex items-center space-x-2">
								<svg
									class="w-4 h-4 text-blue-500"
									fill="currentColor"
									viewBox="0 0 24 24"
								>
									<path
										d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"
									/>
								</svg>
								<span>Гарантия возврата</span>
							</div>
							<div class="flex items-center space-x-2">
								<svg
									class="w-4 h-4 text-orange-500"
									fill="currentColor"
									viewBox="0 0 24 24"
								>
									<path
										d="M20 8h-3V4H3c-1.1 0-2 .9-2 2v11h2c0 1.66 1.34 3 3 3s3-1.34 3-3h6c0 1.66 1.34 3 3 3s3-1.34 3-3h2v-5l-3-4zM6 18.5c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zm13.5-9l1.96 2.5H17V9.5h2.5zm-1.5 9c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5z"
									/>
								</svg>
								<span>Быстрая доставка</span>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</section>
</template>

<script setup lang="ts">
import { useBasketStore } from '#imports'
import type { basketProduct } from '~/types/basketTypes'

const basketStore = useBasketStore()
const router = useRouter()

// Basket items state
onMounted(async () => {
	await basketStore.fetchUserBasket()
})

async function onRemove(cartId: number) {
	await basketStore.removeItem(cartId)
}

async function onMoveToWishlist(product: basketProduct) {
	await basketStore.moveToWishlist(product)
}
</script>

<style scoped>
.line-clamp-2 {
	display: -webkit-box;
	-webkit-line-clamp: 2;
	-webkit-box-orient: vertical;
	overflow: hidden;
}
</style>
