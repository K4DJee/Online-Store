import type { basketProduct, basketResponse } from '../types/basketTypes'
import type { appResponses, responseRequests } from '~/types/appTypes'

import { useAppStore } from '#imports'

export const useBasketStore = defineStore('basketStore', () => {
	const router = useRouter()
	const appStore = useAppStore()

	// Basket items state
	const basketItems = ref<basketProduct[]>([])
	const isLoading = ref<boolean>(true)

	async function fetchUserBasket(): Promise<appResponses> {
		const cartData: appResponses = await appStore.getResponse({
			url: 'http://localhost:8000/api/cart',
		})

		if (cartData.success) {
			basketItems.value = cartData.cartProductsRow
		}
		isLoading.value = false

		return cartData
	}

	async function removeItem(cartId: number): Promise<responseRequests> {
		const response: responseRequests = await appStore.deleteResponse({
			url: 'http://localhost:8000/api/delete-product-cart',
			data: {
				cartId: cartId,
			},
		})

		if (response.success) {
			basketItems.value = basketItems.value.filter(
				item => item.cartId !== cartId
			)
		}

		return response
	}

	// Computed values
	const totalItems = computed(() => {
		return basketItems.value.reduce((sum, item) => sum + item.quantity, 0)
	})
	const totalPrice = computed(() => {
		return basketItems.value.reduce(
			(sum, item) => sum + item.salePrice * item.quantity,
			0
		)
	})
	const totalOriginalPrice = computed(() => {
		return basketItems.value.reduce(
			(sum, item) => sum + item.productPrice * item.quantity,
			0
		)
	})
	const totalDiscount = computed(
		() => totalOriginalPrice.value - totalPrice.value
	)

	const updateQuantity = (itemId: number, newQuantity: number) => {
		if (newQuantity < 1) return
		const item = basketItems.value.find(item => item.productId === itemId)
		if (item) {
			item.quantity = newQuantity
		}
	}

	const moveToWishlist = async (product: basketProduct) => {
		const response: responseRequests = await appStore.postResponse({
			url: 'http://localhost:8000/api/addToFavourite',
			data: {
				productId: product.productId,
				sellerName: product.sellerName,
			},
		})

		if (response.success) {
			await removeItem(product.cartId)
		}
	}

	const proceedToCheckout = () => {
		if (basketItems.value.length === 0) return
		router.push('/checkout')
	}

	return {
		fetchUserBasket,
		basketItems,
		isLoading,
		totalItems,
		totalPrice,
		totalOriginalPrice,
		totalDiscount,
		updateQuantity,
		removeItem,
		moveToWishlist,
		proceedToCheckout,
	}
})
