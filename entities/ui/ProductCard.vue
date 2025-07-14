<template>
	<NuxtLink
		:to="`/product/${product.productId}`"
		class="bg-white rounded-[16px] overflow-hidden shadow-sm border border-gray-100 relative transition-transform duration-300 ease-in-out hover:-translate-y-1 hover:shadow-md hover:border-lime-500 flex-1 min-w-[250px] h-full flex justify-between flex-col group"
	>
		<!-- Product image -->
		<div
			class="relative w-full h-60 md:h-52 sm:h-44 overflow-hidden bg-gray-50"
		>
			<NuxtImg
				:src="product.imageUrl"
				:alt="product.name"
				class="w-full h-full object-cover transition-transform duration-300 ease-in-out group-hover:scale-105"
				loading="eager"
			/>
			<div
				v-if="isNewProduct"
				class="absolute top-3 left-3 px-3 py-1 text-xs font-semibold uppercase tracking-wide rounded-full bg-gradient-to-r from-lime-500 to-lime-600 text-white z-10"
			>
				Новинка
			</div>
			<div
				v-if="product.quantity <= 5 && product.quantity > 0"
				class="absolute top-3 left-3 px-3 py-1 text-xs font-semibold uppercase tracking-wide rounded-full bg-gradient-to-r from-yellow-400 to-yellow-500 text-white z-10"
			>
				Осталось {{ product.quantity }}
			</div>
			<div
				v-if="product.quantity === 0"
				class="absolute top-3 left-3 px-3 py-1 text-xs font-semibold uppercase tracking-wide rounded-full bg-gradient-to-r from-red-500 to-red-600 text-white z-10"
			>
				Нет в наличии
			</div>
		</div>

		<!-- product info -->
		<div class="p-5 flex flex-col justify-between gap-3 flex-grow">
			<!-- Name -->
			<h3
				class="text-base font-semibold text-slate-800 leading-tight line-clamp-2 h-[1lh]"
			>
				{{ product.name }}
			</h3>

			<!-- desc -->
			<p
				class="text-sm text-gray-500 leading-relaxed line-clamp-2 h-[2lh]"
			>
				{{ product.description }}
			</p>

			<!-- rating -->
			<div class="flex items-center justify-between text-sm">
				<div class="flex items-center gap-1.5">
					<svg
						width="14"
						height="13"
						viewBox="0 0 13 12"
						fill="none"
						xmlns="http://www.w3.org/2000/svg"
					>
						<path
							d="M10.051 12C9.89651 12 9.7428 11.9543 9.61051 11.8631L6.50008 9.71081L3.38965 11.8631C3.26078 11.9526 3.10591 12.0005 2.94715 11.9999C2.7884 11.9994 2.63388 11.9505 2.50565 11.8602C2.37731 11.7704 2.28158 11.6438 2.23208 11.4985C2.18259 11.3532 2.18185 11.1965 2.22998 11.0508L3.39003 7.43823L0.307512 5.34236C0.179762 5.25139 0.0848864 5.12397 0.0363069 4.97811C-0.0122727 4.83226 -0.0120976 4.67537 0.0368075 4.52962C0.0860983 4.38422 0.181499 4.25744 0.309527 4.16721C0.437555 4.07698 0.591735 4.02785 0.750276 4.02677L4.56806 4.02124L5.78355 0.49836C5.83371 0.353234 5.92992 0.227012 6.05855 0.137571C6.18718 0.0481288 6.34172 0 6.50027 0C6.65882 0 6.81336 0.0481288 6.94199 0.137571C7.07062 0.227012 7.16683 0.353234 7.21699 0.49836L8.41184 4.02124L12.2491 4.02677C12.4078 4.02763 12.5623 4.07674 12.6904 4.16711C12.8186 4.25747 12.914 4.38451 12.963 4.53017C13.0121 4.67583 13.0123 4.8327 12.9637 4.9785C12.9151 5.1243 12.8201 5.25162 12.6923 5.34236L9.60974 7.43823L10.7698 11.0508C10.818 11.1965 10.8174 11.3531 10.7679 11.4985C10.7185 11.6438 10.6228 11.7704 10.4945 11.8602C10.3659 11.9512 10.2105 12.0002 10.051 12Z"
							fill="#FFAC33"
						/>
					</svg>
					<span class="font-semibold text-slate-800">{{
						product.averageRating
					}}</span>
				</div>
				<span class="text-gray-500">{{
					pluralize(product.reviewCount, 'отзыв')
				}}</span>
			</div>

			<!-- price -->
			<div class="flex items-center justify-between mt-2">
				<!-- <span class="text-xl font-bold text-slate-800"
					>{{ formatPrice(String(product.price)) }} ₽</span
				> -->

				<div class="flex items-center space-x-2 mb-4">
					<!-- sale price -->
					<div
						v-if="product.salePrice"
						className="flex flex-col-reverse gap-1  space-x-3"
					>
						<!--  Current Price  -->
						<span class="text-lg font-bold text-green-700">
							{{ product.salePrice.toLocaleString() }} ₽
						</span>

						<!-- Original Price (if on sale)  -->
						<span class="text-sm text-gray-400 line-through">
							{{ product.price.toLocaleString() }}
							₽
						</span>
					</div>

					<!-- no sale  -->
					<span v-else class="text-xl font-bold text-slate-800">
						{{ Number(product.price).toLocaleString() }}
						₽
					</span>
				</div>
				<!-- buy button -->
				<button
					class="flex items-center justify-center w-10 h-10 bg-gradient-to-r from-lime-500 to-lime-600 rounded-lg text-white transition-transform duration-200 ease-in-out hover:from-lime-600 cursor-pointer hover:to-lime-700 active:scale-95 disabled:bg-gray-400 disabled:cursor-not-allowed disabled:opacity-60"
					:disabled="product.quantity === 0 || !product.isActive"
					@click.prevent="addToCartClick"
				>
					<svg
						v-if="product.quantity > 0 && product.isActive"
						width="18"
						height="18"
						viewBox="0 0 24 24"
						fill="none"
						xmlns="http://www.w3.org/2000/svg"
					>
						<path
							d="M12 5V19M5 12H19"
							stroke="currentColor"
							stroke-width="2"
							stroke-linecap="round"
							stroke-linejoin="round"
						/>
					</svg>
					<svg
						v-else
						width="18"
						height="18"
						viewBox="0 0 24 24"
						fill="none"
						xmlns="http://www.w3.org/2000/svg"
					>
						<path
							d="M18 6L6 18M6 6L18 18"
							stroke="currentColor"
							stroke-width="2"
							stroke-linecap="round"
							stroke-linejoin="round"
						/>
					</svg>
				</button>
			</div>
		</div>
	</NuxtLink>
</template>

<script setup lang="ts">
import type { IProduct } from '~/types/types'
import type { responseRequests } from '~/types/appTypes'

import { pluralize } from '~/entities/helpers/pluralize'
import { useProfileStore } from '#imports'
import { useBasketStore } from '#imports'

const profileStore = useProfileStore()
const basketStore = useBasketStore()

const props = defineProps<{
	product: IProduct
}>()

const product = computed(() => props.product)

// Новинка (менее 30 дней)
const isNewProduct = computed(() => {
	const createdDate = new Date(product.value.createdAt)
	const now = new Date()
	const diff = (now.getTime() - createdDate.getTime()) / (1000 * 60 * 60 * 24)
	return diff <= 30
})

// Формат цены
const formatPrice = (price: string) => parseInt(price).toLocaleString('ru-RU')

// Добавление в корзину
const addToCartClick = async () => {
	if (product.value.quantity === 0 || !product.value.isActive) return
	const result: responseRequests = await basketStore.addToCart(
		product.value.productId,
		product.value.sellerName,
		1
	)

	if (!profileStore.isAuthenticated) return

	if (result.success) {
		useShowToast('Товар успешно добавлен в корзину!')
	} else {
		const cartProduct = basketStore.getCartProduct(product.value)
		if (!cartProduct) return console.log('XD some error')

		const resp = await basketStore.updateQuantity(
			cartProduct,
			cartProduct.quantity + 1
		)

		if (resp && resp.success) {
			useShowToast('Товар успешно добавлен в корзину!')
		}
	}
}
</script>
