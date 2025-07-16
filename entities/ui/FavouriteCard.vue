<template>
	<div
		class="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow group"
	>
		<!-- Product Image -->
		<div class="relative aspect-square overflow-hidden">
			<img
				:src="product.imageUrl"
				:alt="product.name"
				class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300 cursor-pointer"
				@click="handleViewProduct"
			/>

			<!-- Discount Badge -->
			<div
				v-if="getDiscountPercentage() > 0"
				class="absolute top-2 left-2"
			>
				<span
					class="bg-red-500 text-white px-2 py-1 rounded-md text-xs font-bold"
				>
					-{{ getDiscountPercentage() }}%
				</span>
			</div>

			<!-- Remove from Favourites Button -->
			<div class="absolute top-2 right-2">
				<button
					@click="handleRemoveFromFavourites"
					class="w-7 h-7 bg-white/90 hover:bg-white rounded-full flex items-center justify-center text-red-500 hover:text-red-600 transition-colors shadow-sm"
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
				</button>
			</div>
		</div>

		<!-- Product Info -->
		<div class="p-3">
			<!-- Product Name -->
			<h3
				class="font-medium text-gray-900 mb-2 line-clamp-2 hover:text-primary-600 transition-colors cursor-pointer text-sm"
				@click="handleViewProduct"
			>
				{{ product.name }}
			</h3>

			<!-- Seller -->
			<div class="text-xs text-gray-500 mb-2">
				{{ product.sellerName }}
			</div>

			<!-- Price -->
			<div class="flex items-center space-x-2">
					<span v-if="product.salePrice" class="text-lg font-bold text-gray-900"
					>{{ formatPrice(product.salePrice) || 0 }} ₽</span
				>
				<span
					v-if="product.salePrice < product.price && product.salePrice"
					class="text-xs text-gray-500 line-through"
				>
					{{ formatPrice(product.price) }} ₽
				</span>
				<span
				v-else
					class="text-lg font-bold text-gray-900"
				>
					{{ formatPrice(product.price) }} ₽
				</span>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { formatDate, parseDate } from '~/entities/helpers/formatDate'
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

interface Props {
	product: IProduct
}

const props = defineProps<Props>()
const emit = defineEmits<{
	removeFromFavourites: [productId: number]
	viewProduct: [productId: number]
}>()
const handleRemoveFromFavourites = () => {
	emit('removeFromFavourites', props.product.productId)
}

const handleViewProduct = () => {
	emit('viewProduct', props.product.productId)
}

const formatPrice = (price: number | null | undefined): string => {
    if (price === null || price === undefined) return '0'
    return price.toLocaleString('ru-RU')
}

const getDiscountPercentage = () => {
	if (props.product.salePrice >= props.product.price) return 0
	return Math.round((1 - (props.product.salePrice ?? props.product.price) / props.product.price) * 100)
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

<!-- <script setup lang="ts">
import { NuxtImg } from '#components';
import type { favouriteProduct } from '~/types/favouriteTypes';
const props = defineProps<{
	favouriteProduct: favouriteProduct
}>();
const {removeFromFavourite} = useFavourite();
const {addToCart} = useCart();
const favouriteProduct = computed(() => props.favouriteProduct);

</script> -->
