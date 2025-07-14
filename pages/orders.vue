<template>
	<section class="min-h-screen bg-gray-50">
		<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
			<!-- Header -->
			<div class="mb-8">
				<div class="flex items-center justify-between mb-6">
					<div>
						<h1 class="text-3xl font-bold text-gray-900">
							История заказов
						</h1>
						<p class="text-gray-600 mt-1">
							{{ stats.total }} заказов на сумму
							{{ stats.totalAmount.toLocaleString() }} ₽
						</p>
					</div>
					<button
						@click="router.push('/')"
						class="text-primary-600 hover:text-primary-700 font-medium transition-colors flex items-center space-x-2"
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

				<!-- Statistics Cards -->
				<div
					class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4"
				>
					<div
						class="bg-white rounded-xl p-4 shadow-sm border border-gray-100"
					>
						<div class="text-2xl font-bold text-gray-900">
							{{ stats.total }}
						</div>
						<div class="text-sm text-gray-600">Всего заказов</div>
					</div>
					<div
						class="bg-white rounded-xl p-4 shadow-sm border border-gray-100"
					>
						<div class="text-2xl font-bold text-yellow-600">
							{{ stats.pending }}
						</div>
						<div class="text-sm text-gray-600">Ожидают</div>
					</div>
					<div
						class="bg-white rounded-xl p-4 shadow-sm border border-gray-100"
					>
						<div class="text-2xl font-bold text-blue-600">
							{{ stats.confirmed }}
						</div>
						<div class="text-sm text-gray-600">Подтверждены</div>
					</div>
					<div
						class="bg-white rounded-xl p-4 shadow-sm border border-gray-100"
					>
						<div class="text-2xl font-bold text-purple-600">
							{{ stats.shipped }}
						</div>
						<div class="text-sm text-gray-600">В пути</div>
					</div>
					<div
						class="bg-white rounded-xl p-4 shadow-sm border border-gray-100"
					>
						<div class="text-2xl font-bold text-green-600">
							{{ stats.delivered }}
						</div>
						<div class="text-sm text-gray-600">Доставлены</div>
					</div>
					<div
						class="bg-white rounded-xl p-4 shadow-sm border border-gray-100"
					>
						<div class="text-2xl font-bold text-red-600">
							{{ stats.cancelled }}
						</div>
						<div class="text-sm text-gray-600">Отменены</div>
					</div>
				</div>
			</div>

			<!-- Filters -->
			<div
				class="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 mb-8"
			>
				<div class="grid grid-cols-1 md:grid-cols-2 gap-4">
					<!-- Status Filter -->
					<div>
						<label
							class="block text-sm font-medium text-gray-700 mb-2"
							>Статус заказа</label
						>
						<select
							v-model="selectedStatus"
							class="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition-colors"
						>
							<option
								v-for="status in statusOptions"
								:key="status.value"
								:value="status.value"
							>
								{{ status.label }}
							</option>
						</select>
					</div>

					<!-- Period Filter -->
					<div>
						<label
							class="block text-sm font-medium text-gray-700 mb-2"
							>Период</label
						>
						<select
							v-model="selectedPeriod"
							class="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition-colors"
						>
							<option
								v-for="period in periodOptions"
								:key="period.value"
								:value="period.value"
							>
								{{ period.label }}
							</option>
						</select>
					</div>
				</div>
			</div>

			<!-- Orders List -->
			<div class="space-y-6">
				<div
					v-for="order in filteredOrders"
					:key="order.id"
					class="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow"
				>
					<!-- Order Header -->
					<div class="p-6 border-b border-gray-100">
						<div class="flex items-center justify-between mb-4">
							<div class="flex items-center space-x-4">
								<div>
									<h3
										class="text-lg font-semibold text-gray-900"
									>
										Заказ {{ order.orderNumber }}
									</h3>
									<p class="text-sm text-gray-600">
										{{
											order.createdAt.toLocaleDateString(
												'ru-RU'
											)
										}}
									</p>
								</div>
								<span
									:class="[
										'px-3 py-1 rounded-full text-sm font-medium',
										getStatusBadge(order.status),
									]"
								>
									{{ getStatusText(order.status) }}
								</span>
							</div>
							<div class="text-right">
								<div class="text-xl font-bold text-gray-900">
									{{ order.totalAmount.toLocaleString() }} ₽
								</div>
								<div class="text-sm text-gray-600">
									{{ order.items.length }} товаров
								</div>
							</div>
						</div>

						<!-- Order Info -->
						<div
							class="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm"
						>
							<div>
								<span class="text-gray-600">Доставка:</span>
								<span class="ml-2 text-gray-900">{{
									order.deliveryMethod
								}}</span>
							</div>
							<div>
								<span class="text-gray-600">Оплата:</span>
								<span class="ml-2 text-gray-900">{{
									order.paymentMethod
								}}</span>
							</div>
							<div v-if="order.deliveryDate">
								<span class="text-gray-600"
									>Дата доставки:</span
								>
								<span class="ml-2 text-gray-900">{{
									order.deliveryDate.toLocaleDateString(
										'ru-RU'
									)
								}}</span>
							</div>
						</div>
					</div>

					<!-- Order Items -->
					<div class="p-6">
						<div class="space-y-4">
							<div
								v-for="item in order.items"
								:key="item.id"
								class="flex items-center space-x-4"
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
											>Количество:
											{{ item.quantity }}</span
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

						<!-- Delivery Address -->
						<div class="mt-4 p-3 bg-gray-50 rounded-lg">
							<div class="text-sm">
								<span class="text-gray-600"
									>Адрес доставки:</span
								>
								<span class="ml-2 text-gray-900">{{
									order.deliveryAddress
								}}</span>
							</div>
						</div>
					</div>

					<!-- Order Actions -->
					<div class="px-6 py-4 bg-gray-50 border-t border-gray-100">
						<div class="flex items-center justify-between">
							<button
								@click="viewOrderDetails(order.id)"
								class="text-sm text-primary-600 hover:text-primary-700 font-medium transition-colors"
							>
								Подробнее о заказе
							</button>
							<div class="flex items-center space-x-3">
								<button
									v-if="
										order.status === 'shipped' ||
										order.status === 'confirmed'
									"
									@click="trackOrder(order.id)"
									class="text-sm text-blue-600 hover:text-blue-700 font-medium transition-colors"
								>
									Отследить
								</button>
								<button
									v-if="order.status === 'delivered'"
									@click="reorderItems(order)"
									class="text-sm text-green-600 hover:text-green-700 font-medium transition-colors"
								>
									Заказать снова
								</button>
								<button
									v-if="
										order.status === 'pending' ||
										order.status === 'confirmed'
									"
									@click="cancelOrder(order.id)"
									class="text-sm text-red-600 hover:text-red-700 font-medium transition-colors"
								>
									Отменить
								</button>
							</div>
						</div>
					</div>
				</div>
			</div>

			<!-- Empty State -->
			<div v-if="filteredOrders.length === 0" class="text-center py-12">
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
					Заказы не найдены
				</h3>
				<p class="text-gray-600 mb-6">
					Попробуйте изменить фильтры или сделайте первый заказ
				</p>
				<button
					@click="router.push('/')"
					class="bg-primary-500 hover:bg-primary-600 text-white px-6 py-3 rounded-xl font-medium transition-colors"
				>
					Перейти к покупкам
				</button>
			</div>
		</div>
	</section>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'

// Mock functions for demo purposes
const useRouter = () => ({
	push: (path: string) => console.log(`Navigate to: ${path}`),
})

const router = useRouter()

// Order interface
interface OrderItem {
	id: number
	title: string
	price: number
	quantity: number
	image: string
	seller: string
}

interface Order {
	id: number
	orderNumber: string
	status: 'pending' | 'confirmed' | 'shipped' | 'delivered' | 'cancelled'
	createdAt: Date
	deliveryDate?: Date
	totalAmount: number
	deliveryMethod: string
	paymentMethod: string
	items: OrderItem[]
	deliveryAddress: string
}

// Mock orders data
const orders = ref<Order[]>([
	{
		id: 1,
		orderNumber: 'ORD-2024-001',
		status: 'delivered',
		createdAt: new Date('2024-01-15'),
		deliveryDate: new Date('2024-01-18'),
		totalAmount: 105980,
		deliveryMethod: 'Курьерская доставка',
		paymentMethod: 'Банковская карта',
		deliveryAddress: 'г. Москва, ул. Тверская, д. 15, кв. 42',
		items: [
			{
				id: 1,
				title: 'iPhone 14 Pro Max 256GB',
				price: 89990,
				quantity: 1,
				image: 'https://images.pexels.com/photos/788946/pexels-photo-788946.jpeg?auto=compress&cs=tinysrgb&w=400',
				seller: 'TechStore',
			},
			{
				id: 2,
				title: 'Gaming Chair RGB',
				price: 15990,
				quantity: 1,
				image: 'https://images.pexels.com/photos/4050315/pexels-photo-4050315.jpeg?auto=compress&cs=tinysrgb&w=400',
				seller: 'GameZone',
			},
		],
	},
	{
		id: 2,
		orderNumber: 'ORD-2024-002',
		status: 'shipped',
		createdAt: new Date('2024-01-20'),
		deliveryDate: new Date('2024-01-23'),
		totalAmount: 75990,
		deliveryMethod: 'Курьерская доставка',
		paymentMethod: 'Наличными при получении',
		deliveryAddress: 'г. Москва, ул. Тверская, д. 15, кв. 42',
		items: [
			{
				id: 3,
				title: 'MacBook Air M2 13"',
				price: 75990,
				quantity: 1,
				image: 'https://images.pexels.com/photos/205421/pexels-photo-205421.jpeg?auto=compress&cs=tinysrgb&w=400',
				seller: 'AppleCenter',
			},
		],
	},
	{
		id: 3,
		orderNumber: 'ORD-2024-003',
		status: 'confirmed',
		createdAt: new Date('2024-01-22'),
		deliveryDate: new Date('2024-01-25'),
		totalAmount: 25980,
		deliveryMethod: 'Самовывоз',
		paymentMethod: 'СБП',
		deliveryAddress: 'Пункт выдачи: ул. Арбат, д. 10',
		items: [
			{
				id: 4,
				title: 'Nike Air Jordan 1 Retro',
				price: 12990,
				quantity: 2,
				image: 'https://images.pexels.com/photos/2529148/pexels-photo-2529148.jpeg?auto=compress&cs=tinysrgb&w=400',
				seller: 'SneakerWorld',
			},
		],
	},
	{
		id: 4,
		orderNumber: 'ORD-2024-004',
		status: 'pending',
		createdAt: new Date('2024-01-25'),
		totalAmount: 21990,
		deliveryMethod: 'Курьерская доставка',
		paymentMethod: 'Банковская карта',
		deliveryAddress: 'г. Москва, ул. Тверская, д. 15, кв. 42',
		items: [
			{
				id: 5,
				title: 'Sony WH-1000XM5 Headphones',
				price: 21990,
				quantity: 1,
				image: 'https://images.pexels.com/photos/3394650/pexels-photo-3394650.jpeg?auto=compress&cs=tinysrgb&w=400',
				seller: 'AudioPro',
			},
		],
	},
	{
		id: 5,
		orderNumber: 'ORD-2024-005',
		status: 'cancelled',
		createdAt: new Date('2024-01-10'),
		totalAmount: 8990,
		deliveryMethod: 'Почта России',
		paymentMethod: 'Банковская карта',
		deliveryAddress: 'г. Москва, ул. Тверская, д. 15, кв. 42',
		items: [
			{
				id: 6,
				title: 'Vintage Leather Jacket',
				price: 8990,
				quantity: 1,
				image: 'https://images.pexels.com/photos/1124465/pexels-photo-1124465.jpeg?auto=compress&cs=tinysrgb&w=400',
				seller: 'VintageStyle',
			},
		],
	},
])

// Filter state
const selectedStatus = ref('all')
const selectedPeriod = ref('all')

// Status options
const statusOptions = [
	{ value: 'all', label: 'Все заказы' },
	{ value: 'pending', label: 'Ожидают подтверждения' },
	{ value: 'confirmed', label: 'Подтверждены' },
	{ value: 'shipped', label: 'В пути' },
	{ value: 'delivered', label: 'Доставлены' },
	{ value: 'cancelled', label: 'Отменены' },
]

// Period options
const periodOptions = [
	{ value: 'all', label: 'За все время' },
	{ value: 'month', label: 'За месяц' },
	{ value: 'quarter', label: 'За 3 месяца' },
	{ value: 'year', label: 'За год' },
]

// Computed filtered orders
const filteredOrders = computed(() => {
	let filtered = orders.value

	// Filter by status
	if (selectedStatus.value !== 'all') {
		filtered = filtered.filter(
			order => order.status === selectedStatus.value
		)
	}

	// Filter by period
	if (selectedPeriod.value !== 'all') {
		const now = new Date()
		const filterDate = new Date()

		switch (selectedPeriod.value) {
			case 'month':
				filterDate.setMonth(now.getMonth() - 1)
				break
			case 'quarter':
				filterDate.setMonth(now.getMonth() - 3)
				break
			case 'year':
				filterDate.setFullYear(now.getFullYear() - 1)
				break
		}

		filtered = filtered.filter(order => order.createdAt >= filterDate)
	}

	// Sort by date (newest first)
	return filtered.sort(
		(a, b) => b.createdAt.getTime() - a.createdAt.getTime()
	)
})

// Statistics
const stats = computed(() => ({
	total: orders.value.length,
	pending: orders.value.filter(o => o.status === 'pending').length,
	confirmed: orders.value.filter(o => o.status === 'confirmed').length,
	shipped: orders.value.filter(o => o.status === 'shipped').length,
	delivered: orders.value.filter(o => o.status === 'delivered').length,
	cancelled: orders.value.filter(o => o.status === 'cancelled').length,
	totalAmount: orders.value.reduce((sum, o) => sum + o.totalAmount, 0),
}))

// Status badge styles
const getStatusBadge = (status: string) => {
	switch (status) {
		case 'pending':
			return 'bg-yellow-100 text-yellow-800'
		case 'confirmed':
			return 'bg-blue-100 text-blue-800'
		case 'shipped':
			return 'bg-purple-100 text-purple-800'
		case 'delivered':
			return 'bg-green-100 text-green-800'
		case 'cancelled':
			return 'bg-red-100 text-red-800'
		default:
			return 'bg-gray-100 text-gray-800'
	}
}

const getStatusText = (status: string) => {
	switch (status) {
		case 'pending':
			return 'Ожидает подтверждения'
		case 'confirmed':
			return 'Подтвержден'
		case 'shipped':
			return 'В пути'
		case 'delivered':
			return 'Доставлен'
		case 'cancelled':
			return 'Отменен'
		default:
			return status
	}
}

// Actions
const viewOrderDetails = (orderId: number) => {
	router.push(`/orders/${orderId}`)
}

const reorderItems = (order: Order) => {
	console.log('Reorder items from order:', order.orderNumber)
	// Add items to cart logic here
}

const cancelOrder = (orderId: number) => {
	if (confirm('Вы уверены, что хотите отменить заказ?')) {
		const order = orders.value.find(o => o.id === orderId)
		if (order) {
			order.status = 'cancelled'
		}
	}
}

const trackOrder = (orderId: number) => {
	router.push(`/orders/${orderId}/tracking`)
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
