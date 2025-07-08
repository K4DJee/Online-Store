<template>
	<section class="min-h-screen bg-gray-50">
		<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
			<!-- Header -->
			<div class="mb-8">
				<div class="flex items-center justify-between mb-6">
					<div>
						<h1 class="text-3xl font-bold text-gray-900">
							Избранные товары
						</h1>
						<p class="text-gray-600 mt-1">
							{{ stats.total }} товаров в избранном
						</p>
					</div>
					<div class="flex items-center space-x-4">
						<button
							@click="clearAllFavourites"
							:disabled="favouriteProducts.length === 0"
							class="text-sm text-red-600 hover:text-red-700 cursor-pointer disabled:text-gray-400 disabled:cursor-not-allowed font-medium transition-colors"
						>
							Очистить все
						</button>
					</div>
				</div>

				<!-- Statistics Cards -->
				<div class="grid grid-cols-2 md:grid-cols-4 gap-4">
					<div
						class="bg-white rounded-xl p-4 shadow-sm border border-gray-100"
					>
						<div class="text-2xl font-bold text-gray-900">
							{{ stats.total }}
						</div>
						<div class="text-sm text-gray-600">Всего товаров</div>
					</div>
					<div
						class="bg-white rounded-xl p-4 shadow-sm border border-gray-100"
					>
						<div class="text-2xl font-bold text-green-600">
							{{ stats.available }}
						</div>
						<div class="text-sm text-gray-600">В наличии</div>
					</div>
					<div
						class="bg-white rounded-xl p-4 shadow-sm border border-gray-100"
					>
						<div class="text-2xl font-bold text-primary-600">
							{{ stats.totalValue.toLocaleString() }} ₽
						</div>
						<div class="text-sm text-gray-600">Общая стоимость</div>
					</div>
					<div
						class="bg-white rounded-xl p-4 shadow-sm border border-gray-100"
					>
						<div class="text-2xl font-bold text-orange-600">
							{{ stats.totalSavings.toLocaleString() }} ₽
						</div>
						<div class="text-sm text-gray-600">Экономия</div>
					</div>
				</div>
			</div>

			<!-- Products Grid -->
			<div
				class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4"
			>
				<FavouriteCard
					v-for="product in favouriteProducts"
					:key="product.productId"
					:product="product"
					@remove-from-favourites="removeFromFavourites"
					@view-product="viewProduct"
				/>
			</div>

			<!-- Empty State -->
			<div
				v-if="favouriteProducts.length === 0"
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
							d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
						/>
					</svg>
				</div>
				<h3 class="text-lg font-medium text-gray-900 mb-2">
					Избранное пусто
				</h3>
				<p class="text-gray-600 mb-6">
					Добавьте товары в избранное, чтобы не потерять их
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

export interface IProduct {
	productId: number
	name: string
	description: string
	price: number
	salePrice: number
	quantity: number
	productCategory: string
	imageUrl: string
	createdAt: Date
	updatedAt: Date
	isActive: number
	sellerName: string
	averageRating: number
	reviewCount: number
}

// Mock functions for demo purposes
const useRouter = () => ({
	push: (path: string) => console.log(`Navigate to: ${path}`),
})

const router = useRouter()

// Mock favourites data
const favouriteProducts = ref<IProduct[]>([
	{
		productId: 1,
		name: 'iPhone 14 Pro Max 256GB Space Black',
		description:
			'Новейший флагманский смартфон Apple с камерой Pro и чипом A16 Bionic',
		price: 99990,
		salePrice: 89990,
		quantity: 5,
		productCategory: 'Электроника',
		imageUrl:
			'https://images.pexels.com/photos/788946/pexels-photo-788946.jpeg?auto=compress&cs=tinysrgb&w=400',
		createdAt: new Date('2024-01-15'),
		updatedAt: new Date('2024-01-15'),
		isActive: 1,
		sellerName: 'TechStore',
		averageRating: 4.8,
		reviewCount: 124,
	},
	{
		productId: 2,
		name: 'MacBook Air M2 13" 256GB',
		description:
			'Ультрабук Apple с процессором M2, 8GB RAM и Retina дисплеем',
		price: 85990,
		salePrice: 75990,
		quantity: 3,
		productCategory: 'Электроника',
		imageUrl:
			'https://images.pexels.com/photos/205421/pexels-photo-205421.jpeg?auto=compress&cs=tinysrgb&w=400',
		createdAt: new Date('2024-01-10'),
		updatedAt: new Date('2024-01-10'),
		isActive: 1,
		sellerName: 'AppleCenter',
		averageRating: 4.9,
		reviewCount: 89,
	},
	{
		productId: 3,
		name: 'Nike Air Jordan 1 Retro High OG',
		description:
			'Классические баскетбольные кроссовки в оригинальной расцветке',
		price: 15990,
		salePrice: 12990,
		quantity: 0,
		productCategory: 'Одежда и обувь',
		imageUrl:
			'https://images.pexels.com/photos/2529148/pexels-photo-2529148.jpeg?auto=compress&cs=tinysrgb&w=400',
		createdAt: new Date('2024-01-08'),
		updatedAt: new Date('2024-01-08'),
		isActive: 0,
		sellerName: 'SneakerWorld',
		averageRating: 4.6,
		reviewCount: 67,
	},
	{
		productId: 4,
		name: 'Samsung Galaxy S24 Ultra 512GB',
		description: 'Флагманский смартфон Samsung с S Pen и камерой 200MP',
		price: 89990,
		salePrice: 79990,
		quantity: 8,
		productCategory: 'Электроника',
		imageUrl:
			'https://images.pexels.com/photos/1092644/pexels-photo-1092644.jpeg?auto=compress&cs=tinysrgb&w=400',
		createdAt: new Date('2024-01-05'),
		updatedAt: new Date('2024-01-05'),
		isActive: 1,
		sellerName: 'GalaxyShop',
		averageRating: 4.7,
		reviewCount: 156,
	},
	{
		productId: 5,
		name: 'Vintage Leather Jacket Brown',
		description: 'Винтажная кожаная куртка из натуральной кожи, размер M',
		price: 12990,
		salePrice: 8990,
		quantity: 1,
		productCategory: 'Одежда и обувь',
		imageUrl:
			'https://images.pexels.com/photos/1124465/pexels-photo-1124465.jpeg?auto=compress&cs=tinysrgb&w=400',
		createdAt: new Date('2024-01-03'),
		updatedAt: new Date('2024-01-03'),
		isActive: 1,
		sellerName: 'VintageStyle',
		averageRating: 4.4,
		reviewCount: 23,
	},
	{
		productId: 6,
		name: 'Gaming Chair RGB Pro Max',
		description:
			'Профессиональное игровое кресло с RGB подсветкой и массажем',
		price: 19990,
		salePrice: 15990,
		quantity: 12,
		productCategory: 'Мебель',
		imageUrl:
			'https://images.pexels.com/photos/4050315/pexels-photo-4050315.jpeg?auto=compress&cs=tinysrgb&w=400',
		createdAt: new Date('2024-01-01'),
		updatedAt: new Date('2024-01-01'),
		isActive: 1,
		sellerName: 'GameZone',
		averageRating: 4.5,
		reviewCount: 78,
	},
	{
		productId: 7,
		name: 'Sony WH-1000XM5 Wireless Headphones',
		description: 'Беспроводные наушники с активным шумоподавлением',
		price: 24990,
		salePrice: 21990,
		quantity: 6,
		productCategory: 'Электроника',
		imageUrl:
			'https://images.pexels.com/photos/3394650/pexels-photo-3394650.jpeg?auto=compress&cs=tinysrgb&w=400',
		createdAt: new Date('2023-12-28'),
		updatedAt: new Date('2023-12-28'),
		isActive: 1,
		sellerName: 'AudioPro',
		averageRating: 4.9,
		reviewCount: 234,
	},
	{
		productId: 8,
		name: 'Mechanical Keyboard RGB Cherry MX',
		description: 'Механическая клавиатура с переключателями Cherry MX Blue',
		price: 8990,
		salePrice: 6990,
		quantity: 0,
		productCategory: 'Электроника',
		imageUrl:
			'https://images.pexels.com/photos/2115257/pexels-photo-2115257.jpeg?auto=compress&cs=tinysrgb&w=400',
		createdAt: new Date('2023-12-25'),
		updatedAt: new Date('2023-12-25'),
		isActive: 0,
		sellerName: 'KeyboardMaster',
		averageRating: 4.3,
		reviewCount: 45,
	},
])

// Statistics
const stats = computed(() => ({
	total: favouriteProducts.value.length,
	available: favouriteProducts.value.filter(
		p => p.quantity > 0 && p.isActive === 1
	).length,
	totalValue: favouriteProducts.value.reduce(
		(sum, p) => sum + p.salePrice,
		0
	),
	totalSavings: favouriteProducts.value.reduce(
		(sum, p) => sum + (p.price - p.salePrice),
		0
	),
}))

// Actions
const removeFromFavourites = (productId: number) => {
	favouriteProducts.value = favouriteProducts.value.filter(
		p => p.productId !== productId
	)
}

const viewProduct = (productId: number) => {
	router.push(`/products/${productId}`)
}

const clearAllFavourites = () => {
	if (confirm('Вы уверены, что хотите очистить все избранные товары?')) {
		favouriteProducts.value = []
	}
}
</script>

<!-- <script setup lang="ts">
import type { responceFavouriteProducts } from '~/types/favouriteTypes'
const token = useCookie('token')
async function fetchFavouriteProducts(): Promise<responceFavouriteProducts> {
	try {
		const data = await $fetch<responceFavouriteProducts>(
			`http://localhost:8000/api/favourite`,
			{
				method: 'GET',
				headers: {
					Authorization: `Bearer ${token.value}`,
				},
			}
		)
		if (data?.favouriteProducts) {
			console.log(data?.favouriteProducts)
			return data
		}
		return { favouriteProducts: [] }
	} catch (error: any) {
		const status = error?.status
		switch (status) {
			case 400:
				console.log('Некорректный запрос')
				break
			case 404:
				console.log('Продукт не найден')
				break
			case 500:
				console.log('Ошибка сервера.')
				break
			default:
				console.log(error)
				console.log('Произошла неизвестная ошибка.')
				break
		}

		return { favouriteProducts: [] }
	}
}
const { data, pending } = useAsyncData<responceFavouriteProducts>(
	`favourite`,
	fetchFavouriteProducts
)
</script>

<style>
.favourite-items {
	display: flex;
	column-gap: 15px;
	row-gap: 15px;
}
</style> -->
