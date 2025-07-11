import type { basketProduct, basketResponse } from '../types/basketTypes'
import type { appResponses } from '~/types/appTypes'
import { useAppStore } from '#imports'

export const useBasketStore = defineStore('basketStore', () => {
	const router = useRouter()
	const token = useCookie('token')
	const appStore = useAppStore()

	async function fetchUserBasket() {
		const { data: cartData } = await useAsyncData(
			'basketItems',
			async () => {
				const anyData: appResponses = await appStore.getResponse({
					url: 'http://localhost:8000/api/cart',
				})
				console.log(anyData)

				return anyData.responseRow
			}
		)

		return cartData.value
	}

	// const {
	// 	data: cartData,
	// 	pending,
	// 	error,
	// } = await useAsyncData<basketResponse | undefined>(
	// 	'/basket',
	// 	fetchUserBasket
	// )

	// Basket items state
	const basketItems = ref<basketProduct[]>([])

	const selectedItems = ref<number[]>([])
	const selectAll = ref(false)

	// Computed values
	const totalItems = computed(() =>
		basketItems.value.reduce((sum, item) => sum + item.quantity, 0)
	)
	const totalPrice = computed(() => {
		return basketItems.value
			.filter(item => selectedItems.value.includes(item.productId))
			.reduce(
				(sum, item) => sum + item.productSalePrice * item.quantity,
				0
			)
	})
	const totalOriginalPrice = computed(() => {
		return basketItems.value
			.filter(item => selectedItems.value.includes(item.productId))
			.reduce((sum, item) => sum + item.productPrice * item.quantity, 0)
	})
	const totalDiscount = computed(
		() => totalOriginalPrice.value - totalPrice.value
	)
	const inStockItems = computed(() =>
		basketItems.value.filter(item => item.isActive)
	)
	const outOfStockItems = computed(() =>
		basketItems.value.filter(item => !item.isActive)
	)

	// Methods
	const toggleSelectAll = () => {
		if (selectAll.value) {
			selectedItems.value = basketItems.value
				.filter(item => item.isActive)
				.map(item => item.productId)
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
		const inStockIds = inStockItems.value.map(item => item.productId)
		selectAll.value =
			inStockIds.length > 0 &&
			inStockIds.every(id => selectedItems.value.includes(id))
	}

	const updateQuantity = (itemId: number, newQuantity: number) => {
		if (newQuantity < 1) return
		const item = basketItems.value.find(item => item.productId === itemId)
		if (item) {
			item.quantity = newQuantity
		}
	}

	const removeItem = (itemId: number) => {
		basketItems.value = basketItems.value.filter(
			item => item.productId !== itemId
		)
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
	selectedItems.value = inStockItems.value.map(item => item.productId)
	selectAll.value = true

	return { fetchUserBasket }
})
