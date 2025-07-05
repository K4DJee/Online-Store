<template>
	<div>{{ cartData?.cartProductsRow }}</div>
	<section class="min-h-screen bg-gray-50">
		<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
			<!-- Header -->
			<div class="mb-8">
				<div class="flex items-center justify-between mb-6">
					<div>
						<h1 class="text-3xl font-bold text-gray-900">
							Корзина
						</h1>
						<p class="text-gray-600 mt-1">
							{{ totalItems }}
							{{
								totalItems === 1
									? 'товар'
									: totalItems < 5
									? 'товара'
									: 'товаров'
							}}
						</p>
					</div>
					<button
						@click="router.push('/')"
						class="text-lime-600 hover:text-lime-700 font-medium transition-colors flex items-center space-x-2"
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
					<!-- Select All -->
					<div
						class="bg-white rounded-2xl p-6 shadow-sm border border-gray-100"
					>
						<label
							class="flex items-center space-x-3 cursor-pointer"
						>
							<input
								type="checkbox"
								v-model="selectAll"
								@change="toggleSelectAll"
								class="w-5 h-5 text-lime-600 border-gray-300 rounded focus:ring-lime-500"
							/>
							<span class="text-lg font-semibold text-gray-900"
								>Выбрать все товары в наличии</span
							>
							<span class="text-sm text-gray-500"
								>({{ cartData?.cartProductsRow.length }})</span
							>
						</label>
					</div>

					<!-- In Stock Items -->
					<div v-if="inStockItems.length > 0" class="space-y-4">
						<h3 class="text-lg font-semibold text-gray-900">
							В наличии
						</h3>

						<div
							v-for="item in inStockItems"
							:key="item.id"
							class="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
						>
							<div class="flex items-start space-x-4">
								<!-- Checkbox -->
								<input
									type="checkbox"
									:checked="selectedItems.includes(item.id)"
									@change="toggleItemSelection(item.id)"
									class="w-5 h-5 text-lime-600 border-gray-300 rounded focus:ring-lime-500 mt-2"
								/>

								<!-- Product Image -->
								<div class="flex-shrink-0">
									<img
										:src="item.image"
										:alt="item.title"
										class="w-24 h-24 object-cover rounded-xl"
									/>
								</div>

								<!-- Product Info -->
								<div class="flex-1 min-w-0">
									<div
										class="flex items-start justify-between"
									>
										<div class="flex-1">
											<h4
												class="text-lg font-semibold text-gray-900 mb-1"
											>
												{{ item.title }}
											</h4>
											<p
												class="text-sm text-gray-600 mb-2"
											>
												Продавец: {{ item.seller }}
											</p>
											<p
												class="text-sm text-gray-600 mb-3"
											>
												Доставка:
												{{
													new Date(
														item.deliveryDate
													).toLocaleDateString(
														'ru-RU'
													)
												}}
											</p>

											<!-- Price -->
											<div
												class="flex items-center space-x-2 mb-4"
											>
												<span
													class="text-xl font-bold text-gray-900"
													>{{
														item.price.toLocaleString()
													}}
													₽</span
												>
												<span
													v-if="
														item.originalPrice >
														item.price
													"
													class="text-sm text-gray-500 line-through"
												>
													{{
														item.originalPrice.toLocaleString()
													}}
													₽
												</span>
												<span
													v-if="
														item.originalPrice >
														item.price
													"
													class="text-sm text-green-600 font-medium"
												>
													-{{
														Math.round(
															(1 -
																item.price /
																	item.originalPrice) *
																100
														)
													}}%
												</span>
											</div>
										</div>

										<!-- Actions -->
										<div
											class="flex flex-col items-end space-y-2"
										>
											<button
												@click="removeItem(item.id)"
												class="text-gray-400 hover:text-red-500 transition-colors"
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
									<div
										class="flex items-center justify-between"
									>
										<div
											class="flex items-center space-x-3"
										>
											<button
												@click="
													updateQuantity(
														item.id,
														item.quantity - 1
													)
												"
												:disabled="item.quantity <= 1"
												class="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
											>
												<svg
													class="w-4 h-4"
													fill="currentColor"
													viewBox="0 0 24 24"
												>
													<path
														d="M19 13H5v-2h14v2z"
													/>
												</svg>
											</button>
											<span
												class="text-lg font-medium min-w-[2rem] text-center"
												>{{ item.quantity }}</span
											>
											<button
												@click="
													updateQuantity(
														item.id,
														item.quantity + 1
													)
												"
												class="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-50 transition-colors"
											>
												<svg
													class="w-4 h-4"
													fill="currentColor"
													viewBox="0 0 24 24"
												>
													<path
														d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"
													/>
												</svg>
											</button>
										</div>

										<div
											class="flex items-center space-x-4"
										>
											<button
												@click="moveToWishlist(item.id)"
												class="text-sm text-gray-600 hover:text-lime-600 transition-colors flex items-center space-x-1"
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
					</div>

					<!-- Out of Stock Items -->
					<div v-if="outOfStockItems.length > 0" class="space-y-4">
						<h3 class="text-lg font-semibold text-gray-900">
							Нет в наличии
						</h3>

						<div
							v-for="item in outOfStockItems"
							:key="item.id"
							class="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 opacity-60"
						>
							<div class="flex items-start space-x-4">
								<!-- Disabled Checkbox -->
								<input
									type="checkbox"
									disabled
									class="w-5 h-5 text-gray-400 border-gray-300 rounded mt-2 cursor-not-allowed"
								/>

								<!-- Product Image -->
								<div class="flex-shrink-0">
									<img
										:src="item.image"
										:alt="item.title"
										class="w-24 h-24 object-cover rounded-xl grayscale"
									/>
								</div>

								<!-- Product Info -->
								<div class="flex-1 min-w-0">
									<div
										class="flex items-start justify-between"
									>
										<div class="flex-1">
											<h4
												class="text-lg font-semibold text-gray-900 mb-1"
											>
												{{ item.title }}
											</h4>
											<p
												class="text-sm text-gray-600 mb-2"
											>
												Продавец: {{ item.seller }}
											</p>
											<div
												class="bg-red-100 text-red-800 px-3 py-1 rounded-full text-sm font-medium inline-block mb-3"
											>
												Нет в наличии
											</div>

											<!-- Price -->
											<div
												class="flex items-center space-x-2 mb-4"
											>
												<span
													class="text-xl font-bold text-gray-500"
													>{{
														item.price.toLocaleString()
													}}
													₽</span
												>
												<span
													v-if="
														item.originalPrice >
														item.price
													"
													class="text-sm text-gray-400 line-through"
												>
													{{
														item.originalPrice.toLocaleString()
													}}
													₽
												</span>
											</div>
										</div>

										<!-- Actions -->
										<div
											class="flex flex-col items-end space-y-2"
										>
											<button
												@click="removeItem(item.id)"
												class="text-gray-400 hover:text-red-500 transition-colors"
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

									<!-- Actions -->
									<div
										class="flex items-center justify-between"
									>
										<span class="text-sm text-gray-500"
											>Количество:
											{{ item.quantity }}</span
										>
										<div
											class="flex items-center space-x-4"
										>
											<button
												@click="moveToWishlist(item.id)"
												class="text-sm text-gray-600 hover:text-lime-600 transition-colors flex items-center space-x-1"
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
					</div>

					<!-- Empty State -->
					<div
						v-if="basketItems.length === 0"
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
									>Товары ({{ selectedItems.length }})</span
								>
								<span class="text-gray-900"
									>{{
										totalOriginalPrice.toLocaleString()
									}}
									₽</span
								>
							</div>
							<div
								v-if="totalDiscount > 0"
								class="flex justify-between text-sm"
							>
								<span class="text-gray-600">Скидка</span>
								<span class="text-green-600"
									>-{{
										totalDiscount.toLocaleString()
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
											totalPrice.toLocaleString()
										}}
										₽</span
									>
								</div>
							</div>
						</div>

						<button
							@click="proceedToCheckout"
							:disabled="selectedItems.length === 0"
							class="w-full bg-lime-500 hover:bg-lime-600 disabled:bg-gray-300 disabled:cursor-not-allowed text-white py-3 rounded-xl font-medium transition-colors mb-4"
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
import type { basketResponse } from '../types/basketTypes'

const router = useRouter()
const token = useCookie('token')

async function fetchUserBasket(): Promise<basketResponse | undefined> {
	try {
		if (token.value === undefined) {
			console.log('Отсутствует токен')
			return undefined
		}
		console.log('fetch cart attempt')
		const cartData = await $fetch<basketResponse>(
			'http://localhost:8000/api/cart',
			{
				method: 'GET',
				headers: {
					Authorization: `Bearer ${token.value}`,
				},
			}
		)
		if (cartData?.cartProductsRow) {
			console.log(cartData)
			return cartData
		}
	} catch (error: any) {
		const status = error?.status
		switch (status) {
			case 400:
				console.log('Некорректный запрос')
				break
			case 401:
				console.log('Неправильный токен авторизации')
				break
			case 404:
				console.log('Продукт не найден')
				break
			case 500:
				console.log('Ошибка сервера.')
				break
			default:
				console.log('Произошла неизвестная ошибка.')
				break
		}
	}
}

const {
	data: cartData,
	pending,
	error,
} = await useAsyncData<basketResponse | undefined>('/basket', fetchUserBasket)

// Basket items state
const basketItems = ref([
	{
		id: 1,
		title: 'iPhone 14 Pro Max 256GB',
		price: 89990,
		originalPrice: 99990,
		image: 'https://images.pexels.com/photos/788946/pexels-photo-788946.jpeg?auto=compress&cs=tinysrgb&w=400',
		seller: 'TechStore',
		quantity: 1,
		inStock: true,
		deliveryDate: '2024-01-20',
		category: 'Электроника',
	},
	{
		id: 2,
		title: 'MacBook Air M2 13"',
		price: 75990,
		originalPrice: 85990,
		image: 'https://images.pexels.com/photos/205421/pexels-photo-205421.jpeg?auto=compress&cs=tinysrgb&w=400',
		seller: 'AppleCenter',
		quantity: 1,
		inStock: true,
		deliveryDate: '2024-01-22',
		category: 'Электроника',
	},
	{
		id: 3,
		title: 'Nike Air Jordan 1 Retro',
		price: 12990,
		originalPrice: 15990,
		image: 'https://images.pexels.com/photos/2529148/pexels-photo-2529148.jpeg?auto=compress&cs=tinysrgb&w=400',
		seller: 'SneakerWorld',
		quantity: 2,
		inStock: false,
		deliveryDate: '2024-01-25',
		category: 'Одежда и обувь',
	},
	{
		id: 4,
		title: 'Gaming Chair RGB',
		price: 15990,
		originalPrice: 19990,
		image: 'https://images.pexels.com/photos/4050315/pexels-photo-4050315.jpeg?auto=compress&cs=tinysrgb&w=400',
		seller: 'GameZone',
		quantity: 1,
		inStock: true,
		deliveryDate: '2024-01-18',
		category: 'Мебель',
	},
])

const selectedItems = ref<number[]>([])
const selectAll = ref(false)

// Computed values
const totalItems = computed(() =>
	basketItems.value.reduce((sum, item) => sum + item.quantity, 0)
)
const totalPrice = computed(() => {
	return basketItems.value
		.filter(item => selectedItems.value.includes(item.id))
		.reduce((sum, item) => sum + item.price * item.quantity, 0)
})
const totalOriginalPrice = computed(() => {
	return basketItems.value
		.filter(item => selectedItems.value.includes(item.id))
		.reduce((sum, item) => sum + item.originalPrice * item.quantity, 0)
})
const totalDiscount = computed(
	() => totalOriginalPrice.value - totalPrice.value
)
const inStockItems = computed(() =>
	basketItems.value.filter(item => item.inStock)
)
const outOfStockItems = computed(() =>
	basketItems.value.filter(item => !item.inStock)
)

// Methods
const toggleSelectAll = () => {
	if (selectAll.value) {
		selectedItems.value = basketItems.value
			.filter(item => item.inStock)
			.map(item => item.id)
	} else {
		selectedItems.value = []
	}
}

const toggleItemSelection = (itemId: number) => {
	const index = selectedItems.value.indexOf(itemId)
	if (index > -1) {
		selectedItems.value.splice(index, 1)
	} else {
		selectedItems.value.push(itemId)
	}
	updateSelectAll()
}

const updateSelectAll = () => {
	const inStockIds = inStockItems.value.map(item => item.id)
	selectAll.value =
		inStockIds.length > 0 &&
		inStockIds.every(id => selectedItems.value.includes(id))
}

const updateQuantity = (itemId: number, newQuantity: number) => {
	if (newQuantity < 1) return
	const item = basketItems.value.find(item => item.id === itemId)
	if (item) {
		item.quantity = newQuantity
	}
}

const removeItem = (itemId: number) => {
	basketItems.value = basketItems.value.filter(item => item.id !== itemId)
	selectedItems.value = selectedItems.value.filter(id => id !== itemId)
	updateSelectAll()
}

const moveToWishlist = (itemId: number) => {
	console.log(`Move item ${itemId} to wishlist`)
	removeItem(itemId)
}

const proceedToCheckout = () => {
	if (selectedItems.value.length === 0) return
	router.push('/checkout')
}

// Initialize with all in-stock items selected
selectedItems.value = inStockItems.value.map(item => item.id)
selectAll.value = true
</script>

<style scoped>
.line-clamp-2 {
	display: -webkit-box;
	-webkit-line-clamp: 2;
	-webkit-box-orient: vertical;
	overflow: hidden;
}
</style>
