import type { basketProduct, basketResponse } from '../types/basketTypes'
import type { appResponses, responseRequests } from '~/types/appTypes'

import { useAppStore } from '#imports'
import type { IProduct } from '~/types/types'

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

	const addToCart = async (
		productId: number,
		sellerName: string,
		quantity: number = 1
	) => {
		const result = await appStore.postResponse({
			url: 'http://localhost:8000/api/add-product-cart',
			data: {
				productId,
				quantity,
				sellerName,
			},
		})

		// !!!!!!!!!!!!!!!!!! КОСТЫЛЬ
		// !!!!!!!!!!!!!!!!!! КОСТЫЛЬ
		// !!!!!!!!!!!!!!!!!! КОСТЫЛЬ
		// !!!!!!!!!!!!!!!!!! КОСТЫЛЬ
		// !!!!!!!!!!!!!!!!!! КОСТЫЛЬ
		// !!!!!!!!!!!!!!!!!! КОСТЫЛЬ
		// !!!!!!!!!!!!!!!!!! КОСТЫЛЬ

		await fetchUserBasket()

		// !!!!!!!!!!!!!!!!!! КОСТЫЛЬ
		// !!!!!!!!!!!!!!!!!! КОСТЫЛЬ
		// !!!!!!!!!!!!!!!!!! КОСТЫЛЬ
		// !!!!!!!!!!!!!!!!!! КОСТЫЛЬ
		// !!!!!!!!!!!!!!!!!! КОСТЫЛЬ
		// !!!!!!!!!!!!!!!!!! КОСТЫЛЬ
		// !!!!!!!!!!!!!!!!!! КОСТЫЛЬ

		return result
	}

	async function removeItem(
		cartId: number,
		isShowToast: boolean = true
	): Promise<responseRequests> {
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

		if (isShowToast) {
			useShowToast('Товар был удален из корзины', '')
		}

		return response
	}

	// Computed values
	const totalItems = computed(() => {
		return basketItems.value.reduce((sum, item) => sum + item.quantity, 0)
	})
	const totalPrice = computed(() => {
		return basketItems.value.reduce((sum, item) => {
			if (item.salePrice) {
				return sum + item.salePrice * item.quantity
			} else {
				return sum + item.productPrice * item.quantity
			}
		}, 0)
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

	const updateQuantity = async (
		product: basketProduct,
		newQuantity: number
	) => {
		if (newQuantity < 1) return

		const result: responseRequests = await appStore.putResponse({
			url: 'http://localhost:8000/api/change-product-cart',
			data: {
				cartId: product.cartId,
				quantity: newQuantity,
				productId: product.productId,
			},
		})

		if (result.success) {
			const item = basketItems.value.find(
				item => item.cartId === product.cartId
			)
			if (item) {
				item.quantity = newQuantity
			}
		} else {
			useShowToast('Больше товаров нет', '')
		}

		return result
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
			await removeItem(product.cartId, false)
			useShowToast('Товар был перемещен в Избранное', '')
		}
	}

	const proceedToCheckout = () => {
		if (basketItems.value.length === 0) return
		router.push('/checkout')
	}

	const getCartProduct = (product: IProduct) => {
		const cartProduct = basketItems.value.find(
			p => p.productId === product.productId
		)

		if (!cartProduct) return null

		return cartProduct
	}

	const getProductQuantity = (cartId: number) => {
		const cartProduct = basketItems.value.find(p => p.cartId === cartId)

		if (!cartProduct) return 0

		return cartProduct.quantity
	}

	return {
		fetchUserBasket,
		basketItems,
		addToCart,
		isLoading,
		totalItems,
		totalPrice,
		totalOriginalPrice,
		totalDiscount,
		updateQuantity,
		removeItem,
		moveToWishlist,
		proceedToCheckout,
		getProductQuantity,
		getCartProduct,
	}
})
