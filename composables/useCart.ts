import type { addProductInBasket } from '~/types/basketTypes'
// const cartObject = ref<addProductInBasket | null>
interface responseAddToCart {
	success: boolean
}
export const useCart = () => {
	const addToCart = async (productId: number, sellerId:number, quantity: number = 1) => {
		const token = useCookie('token')

		if (!token.value) {
			// some logic to open registration modal
			return
		}

		try {
			console.log('Попытка добавления товара в корзину')
			const { data, error } = await useFetch<responseAddToCart | null>(
				'http://localhost:8000/api/add-product-cart',
				{
					method: 'POST',
					body: {
						productId,
						quantity,
						token:token.value,
						sellerId
					},
					server: false,
				}
			)
			if (data.value?.success === true) {
				console.log('Успешно добавлено!!!')
				return data.value
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

	return { addToCart }
}
