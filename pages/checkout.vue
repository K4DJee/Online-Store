<script setup lang="ts">
import { ref, computed } from 'vue'

// Mock functions for demo purposes
const useRouter = () => ({
	push: (path: string) => console.log(`Navigate to: ${path}`),
})

const router = useRouter()

// Checkout form data
const checkoutForm = ref({
	// Delivery info
	firstName: '',
	lastName: '',
	phone: '',
	email: '',
	city: '',
	address: '',
	postalCode: '',
	deliveryMethod: 'courier',

	// Payment info
	paymentMethod: 'card',
	cardNumber: '',
	expiryDate: '',
	cvv: '',
	cardHolder: '',

	// Additional
	comment: '',
	saveInfo: true,
})

// Mock basket items from previous component
const basketItems = ref([
	{
		id: 1,
		title: 'iPhone 14 Pro Max 256GB',
		price: 89990,
		originalPrice: 99990,
		image: 'https://images.pexels.com/photos/788946/pexels-photo-788946.jpeg?auto=compress&cs=tinysrgb&w=400',
		seller: 'TechStore',
		quantity: 1,
		deliveryDate: '2024-01-20',
	},
	{
		id: 2,
		title: 'MacBook Air M2 13"',
		price: 75990,
		originalPrice: 85990,
		image: 'https://images.pexels.com/photos/205421/pexels-photo-205421.jpeg?auto=compress&cs=tinysrgb&w=400',
		seller: 'AppleCenter',
		quantity: 1,
		deliveryDate: '2024-01-22',
	},
	{
		id: 4,
		title: 'Gaming Chair RGB',
		price: 15990,
		originalPrice: 19990,
		image: 'https://images.pexels.com/photos/4050315/pexels-photo-4050315.jpeg?auto=compress&cs=tinysrgb&w=400',
		seller: 'GameZone',
		quantity: 1,
		deliveryDate: '2024-01-18',
	},
])

// Delivery methods
const deliveryMethods = [
	{
		value: 'courier',
		label: 'Курьерская доставка',
		price: 300,
		time: '1-2 дня',
	},
	{ value: 'pickup', label: 'Самовывоз', price: 0, time: 'Сегодня' },
	{ value: 'post', label: 'Почта России', price: 250, time: '3-7 дней' },
]

// Payment methods
const paymentMethods = [
	{ value: 'card', label: 'Банковская карта', icon: '💳' },
	{ value: 'cash', label: 'Наличными при получении', icon: '💵' },
	{ value: 'sbp', label: 'СБП (Система быстрых платежей)', icon: '📱' },
]

// Computed values
const subtotal = computed(() =>
	basketItems.value.reduce((sum, item) => sum + item.price * item.quantity, 0)
)
const originalTotal = computed(() =>
	basketItems.value.reduce(
		(sum, item) => sum + item.originalPrice * item.quantity,
		0
	)
)
const discount = computed(() => originalTotal.value - subtotal.value)
const deliveryPrice = computed(() => {
	const method = deliveryMethods.find(
		m => m.value === checkoutForm.value.deliveryMethod
	)
	return method ? method.price : 0
})
const total = computed(() => subtotal.value + deliveryPrice.value)

// Form validation
const isFormValid = computed(() => {
	const form = checkoutForm.value
	return (
		form.firstName &&
		form.lastName &&
		form.phone &&
		form.email &&
		form.city &&
		form.address &&
		form.deliveryMethod &&
		form.paymentMethod &&
		(form.paymentMethod !== 'card' ||
			(form.cardNumber && form.expiryDate && form.cvv && form.cardHolder))
	)
})

// Methods
const formatCardNumber = (value: string) => {
	return value
		.replace(/\s/g, '')
		.replace(/(.{4})/g, '$1 ')
		.trim()
}

const formatExpiryDate = (value: string) => {
	return value.replace(/\D/g, '').replace(/(\d{2})(\d)/, '$1/$2')
}

const handleCardNumberInput = (event: Event) => {
	const target = event.target as HTMLInputElement
	const value = target.value.replace(/\D/g, '').slice(0, 16)
	checkoutForm.value.cardNumber = formatCardNumber(value)
}

const handleExpiryInput = (event: Event) => {
	const target = event.target as HTMLInputElement
	const value = target.value.replace(/\D/g, '').slice(0, 4)
	checkoutForm.value.expiryDate = formatExpiryDate(value)
}

const handleCvvInput = (event: Event) => {
	const target = event.target as HTMLInputElement
	checkoutForm.value.cvv = target.value.replace(/\D/g, '').slice(0, 3)
}

const submitOrder = () => {
	if (!isFormValid.value) {
		alert('Пожалуйста, заполните все обязательные поля')
		return
	}

	// Here would be the actual order submission logic
	alert('Заказ успешно оформлен!')
	router.push('/orders')
}

const goBack = () => {
	router.push('/basket')
}
</script>

<template>
	<section class="min-h-screen bg-gray-50">
		<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
			<!-- Header -->
			<div class="mb-8">
				<div class="flex items-center space-x-4 mb-6">
					<button
						@click="goBack"
						class="text-gray-600 hover:text-gray-800 transition-colors"
					>
						<svg
							class="w-6 h-6"
							fill="currentColor"
							viewBox="0 0 24 24"
						>
							<path
								d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z"
							/>
						</svg>
					</button>
					<div>
						<h1 class="text-3xl font-bold text-gray-900">
							Оформление заказа
						</h1>
						<p class="text-gray-600 mt-1">
							{{ basketItems.length }} товаров на сумму
							{{ total.toLocaleString() }} ₽
						</p>
					</div>
				</div>
			</div>

			<div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
				<!-- Order Form -->
				<div class="lg:col-span-2 space-y-6">
					<!-- Delivery Information -->
					<div
						class="bg-white rounded-2xl p-6 shadow-sm border border-gray-100"
					>
						<h3 class="text-lg font-semibold text-gray-900 mb-4">
							Информация о доставке
						</h3>

						<div class="grid grid-cols-1 md:grid-cols-2 gap-4">
							<div>
								<label
									class="block text-sm font-medium text-gray-700 mb-2"
									>Имя *</label
								>
								<input
									v-model="checkoutForm.firstName"
									type="text"
									required
									class="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition-colors"
									placeholder="Введите имя"
								/>
							</div>
							<div>
								<label
									class="block text-sm font-medium text-gray-700 mb-2"
									>Фамилия *</label
								>
								<input
									v-model="checkoutForm.lastName"
									type="text"
									required
									class="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition-colors"
									placeholder="Введите фамилию"
								/>
							</div>
							<div>
								<label
									class="block text-sm font-medium text-gray-700 mb-2"
									>Телефон *</label
								>
								<input
									v-model="checkoutForm.phone"
									type="tel"
									required
									class="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition-colors"
									placeholder="+7 (999) 123-45-67"
								/>
							</div>
							<div>
								<label
									class="block text-sm font-medium text-gray-700 mb-2"
									>Email *</label
								>
								<input
									v-model="checkoutForm.email"
									type="email"
									required
									class="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition-colors"
									placeholder="example@email.com"
								/>
							</div>
							<div>
								<label
									class="block text-sm font-medium text-gray-700 mb-2"
									>Город *</label
								>
								<input
									v-model="checkoutForm.city"
									type="text"
									required
									class="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition-colors"
									placeholder="Москва"
								/>
							</div>
							<div>
								<label
									class="block text-sm font-medium text-gray-700 mb-2"
									>Индекс</label
								>
								<input
									v-model="checkoutForm.postalCode"
									type="text"
									class="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition-colors"
									placeholder="123456"
								/>
							</div>
						</div>

						<div class="mt-4">
							<label
								class="block text-sm font-medium text-gray-700 mb-2"
								>Адрес *</label
							>
							<input
								v-model="checkoutForm.address"
								type="text"
								required
								class="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition-colors"
								placeholder="Улица, дом, квартира"
							/>
						</div>
					</div>

					<!-- Delivery Method -->
					<div
						class="bg-white rounded-2xl p-6 shadow-sm border border-gray-100"
					>
						<h3 class="text-lg font-semibold text-gray-900 mb-4">
							Способ доставки
						</h3>

						<div class="space-y-3">
							<div
								v-for="method in deliveryMethods"
								:key="method.value"
								class="flex items-center justify-between p-4 border border-gray-200 rounded-xl hover:border-primary-300 transition-colors cursor-pointer"
								:class="{
									'border-primary-500 bg-primary-50':
										checkoutForm.deliveryMethod ===
										method.value,
								}"
								@click="
									checkoutForm.deliveryMethod = method.value
								"
							>
								<div class="flex items-center space-x-3">
									<input
										v-model="checkoutForm.deliveryMethod"
										:value="method.value"
										type="radio"
										class="w-4 h-4 text-primary-600 border-gray-300 focus:ring-primary-500"
									/>
									<div>
										<div class="font-medium text-gray-900">
											{{ method.label }}
										</div>
										<div class="text-sm text-gray-600">
											{{ method.time }}
										</div>
									</div>
								</div>
								<div class="text-right">
									<div class="font-semibold text-gray-900">
										{{
											method.price === 0
												? 'Бесплатно'
												: `${method.price} ₽`
										}}
									</div>
								</div>
							</div>
						</div>
					</div>

					<!-- Payment Method -->
					<div
						class="bg-white rounded-2xl p-6 shadow-sm border border-gray-100"
					>
						<h3 class="text-lg font-semibold text-gray-900 mb-4">
							Способ оплаты
						</h3>

						<div class="space-y-3 mb-6">
							<div
								v-for="method in paymentMethods"
								:key="method.value"
								class="flex items-center p-4 border border-gray-200 rounded-xl hover:border-primary-300 transition-colors cursor-pointer"
								:class="{
									'border-primary-500 bg-primary-50':
										checkoutForm.paymentMethod ===
										method.value,
								}"
								@click="
									checkoutForm.paymentMethod = method.value
								"
							>
								<input
									v-model="checkoutForm.paymentMethod"
									:value="method.value"
									type="radio"
									class="w-4 h-4 text-primary-600 border-gray-300 focus:ring-primary-500 mr-3"
								/>
								<span class="text-xl mr-3">{{
									method.icon
								}}</span>
								<span class="font-medium text-gray-900">{{
									method.label
								}}</span>
							</div>
						</div>

						<!-- Card Details (shown only when card payment is selected) -->
						<div
							v-if="checkoutForm.paymentMethod === 'card'"
							class="space-y-4 p-4 bg-gray-50 rounded-xl"
						>
							<div class="grid grid-cols-1 md:grid-cols-2 gap-4">
								<div class="md:col-span-2">
									<label
										class="block text-sm font-medium text-gray-700 mb-2"
										>Номер карты *</label
									>
									<input
										:value="checkoutForm.cardNumber"
										@input="handleCardNumberInput"
										type="text"
										required
										maxlength="19"
										class="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition-colors"
										placeholder="1234 5678 9012 3456"
									/>
								</div>
								<div>
									<label
										class="block text-sm font-medium text-gray-700 mb-2"
										>Срок действия *</label
									>
									<input
										:value="checkoutForm.expiryDate"
										@input="handleExpiryInput"
										type="text"
										required
										maxlength="5"
										class="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition-colors"
										placeholder="MM/YY"
									/>
								</div>
								<div>
									<label
										class="block text-sm font-medium text-gray-700 mb-2"
										>CVV *</label
									>
									<input
										:value="checkoutForm.cvv"
										@input="handleCvvInput"
										type="text"
										required
										maxlength="3"
										class="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition-colors"
										placeholder="123"
									/>
								</div>
								<div class="md:col-span-2">
									<label
										class="block text-sm font-medium text-gray-700 mb-2"
										>Имя держателя карты *</label
									>
									<input
										v-model="checkoutForm.cardHolder"
										type="text"
										required
										class="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition-colors"
										placeholder="IVAN PETROV"
									/>
								</div>
							</div>
						</div>
					</div>

					<!-- Additional Information -->
					<div
						class="bg-white rounded-2xl p-6 shadow-sm border border-gray-100"
					>
						<h3 class="text-lg font-semibold text-gray-900 mb-4">
							Дополнительная информация
						</h3>

						<div>
							<label
								class="block text-sm font-medium text-gray-700 mb-2"
								>Комментарий к заказу</label
							>
							<textarea
								v-model="checkoutForm.comment"
								rows="3"
								class="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition-colors resize-none"
								placeholder="Укажите дополнительные пожелания к заказу..."
							></textarea>
						</div>

						<div class="mt-4">
							<label
								class="flex items-center space-x-3 cursor-pointer"
							>
								<input
									v-model="checkoutForm.saveInfo"
									type="checkbox"
									class="w-4 h-4 text-primary-600 border-gray-300 rounded focus:ring-primary-500"
								/>
								<span class="text-sm text-gray-700"
									>Сохранить информацию для следующих
									заказов</span
								>
							</label>
						</div>
					</div>
				</div>

				<!-- Order Summary -->
				<div class="lg:col-span-1">
					<div
						class="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 sticky top-8"
					>
						<h3 class="text-lg font-semibold text-gray-900 mb-4">
							Ваш заказ
						</h3>

						<!-- Order Items -->
						<div class="space-y-4 mb-6">
							<div
								v-for="item in basketItems"
								:key="item.id"
								class="flex items-center space-x-3"
							>
								<img
									:src="item.image"
									:alt="item.title"
									class="w-16 h-16 object-cover rounded-lg"
								/>
								<div class="flex-1 min-w-0">
									<h4
										class="text-sm font-medium text-gray-900 line-clamp-2"
									>
										{{ item.title }}
									</h4>
									<p class="text-xs text-gray-600">
										{{ item.seller }}
									</p>
									<div
										class="flex items-center justify-between mt-1"
									>
										<span class="text-xs text-gray-500"
											>Кол-во: {{ item.quantity }}</span
										>
										<span
											class="text-sm font-semibold text-gray-900"
											>{{
												item.price.toLocaleString()
											}}
											₽</span
										>
									</div>
								</div>
							</div>
						</div>

						<!-- Order Summary -->
						<div class="border-t border-gray-200 pt-4 space-y-3">
							<div class="flex justify-between text-sm">
								<span class="text-gray-600"
									>Товары ({{ basketItems.length }})</span
								>
								<span class="text-gray-900"
									>{{
										originalTotal.toLocaleString()
									}}
									₽</span
								>
							</div>
							<div
								v-if="discount > 0"
								class="flex justify-between text-sm"
							>
								<span class="text-gray-600">Скидка</span>
								<span class="text-green-600"
									>-{{ discount.toLocaleString() }} ₽</span
								>
							</div>
							<div class="flex justify-between text-sm">
								<span class="text-gray-600">Доставка</span>
								<span class="text-gray-900">
									{{
										deliveryPrice === 0
											? 'Бесплатно'
											: `${deliveryPrice.toLocaleString()} ₽`
									}}
								</span>
							</div>
							<div class="border-t border-gray-200 pt-3">
								<div class="flex justify-between">
									<span
										class="text-lg font-semibold text-gray-900"
										>Итого</span
									>
									<span
										class="text-xl font-bold text-gray-900"
										>{{ total.toLocaleString() }} ₽</span
									>
								</div>
							</div>
						</div>

						<!-- Submit Button -->
						<button
							@click="submitOrder"
							:disabled="!isFormValid"
							class="w-full mt-6 bg-primary-500 hover:bg-primary-600 disabled:bg-gray-300 disabled:cursor-not-allowed text-white py-3 rounded-xl font-medium transition-colors"
						>
							Оформить заказ
						</button>

						<!-- Security Info -->
						<div class="mt-4 space-y-2 text-xs text-gray-600">
							<div class="flex items-center space-x-2">
								<svg
									class="w-4 h-4 text-green-500"
									fill="currentColor"
									viewBox="0 0 24 24"
								>
									<path
										d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4z"
									/>
								</svg>
								<span>Безопасная оплата SSL</span>
							</div>
							<div class="flex items-center space-x-2">
								<svg
									class="w-4 h-4 text-blue-500"
									fill="currentColor"
									viewBox="0 0 24 24"
								>
									<path
										d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"
									/>
								</svg>
								<span>Гарантия возврата 14 дней</span>
							</div>
							<div class="flex items-center space-x-2">
								<svg
									class="w-4 h-4 text-orange-500"
									fill="currentColor"
									viewBox="0 0 24 24"
								>
									<path
										d="M20 8h-3V4H3c-1.1 0-2 .9-2 2v11h2c0 1.66 1.34 3 3 3s3-1.34 3-3h6c0 1.66 1.34 3 3 3s3-1.34 3-3h2v-5l-3-4z"
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

<style scoped>
.line-clamp-2 {
	display: -webkit-box;
	-webkit-line-clamp: 2;
	-webkit-box-orient: vertical;
	overflow: hidden;
}
</style>
