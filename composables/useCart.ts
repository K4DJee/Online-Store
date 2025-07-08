import { useAppStore } from '#imports'

interface responseAddToCart {
	success: boolean
}
export const useCart = () => {
	const appStore = useAppStore()

	const addToCart = async (
		productId: number,
		sellerName: string,
		quantity: number = 1
	) => {
		const token = useCookie('token')

		if (!token.value) {
			appStore.toggleAuthModal()
			return
		}

		try {
			const data = await $fetch<responseAddToCart | null>(
				'http://localhost:8000/api/add-product-cart',
				{
					method: 'POST',
					body: {
						productId,
						quantity,
						sellerName,
					},
					headers: {
						Authorization: `Bearer ${token.value}`,
					},
				}
			)
			if (data?.success === true) {
				console.log('Успешно добавлено!!!')
				return data
			}
		} catch (error: any) {
			console.error('Some error happened => ', error)
		}
	}

	return { addToCart }
}
