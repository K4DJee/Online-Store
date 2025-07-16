import type { responseFavouriteActions, responceFavouriteProducts } from '~/types/favouriteTypes'

export const useFavourite = () => {
	const token = useCookie('token');
    const checkAuth = () => {
        if (!token.value) {
            console.log('Пользователь не авторизован')
            return false
        }
        return true
    }
	const addToFavourite = async (productId: number, sellerName: string) => {
		const token = useCookie('token')
		if (!token.value) {
			return console.log('Пользователь не авторизован')
		}
		try {
			console.log('Попытка добавления товара в избранное')
			const data = await $fetch<responseFavouriteActions>(
				'http://localhost:8000/api/addToFavourite',
				{
					method: 'POST',
					body: {
						productId,
						sellerName,
					},
					headers: {
						Authorization: `Bearer ${token.value}`,
					},
				}
			)
			if (data?.success === true) {
				console.log('Успешно добавлено в избранное!!!')
				return data
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
					console.log(error)
					console.log('Произошла неизвестная ошибка.')
					break
			}
		}
	}

	const removeFromFavourite = async (productId: number) => {
		const token = useCookie('token')
		if (!token.value) {
			return console.log('Пользователь не авторизован')
		}
		try {
			const data = await $fetch<responseFavouriteActions>(
				'http://localhost:8000/api/removeFromFavourite',
				{
					method: 'DELETE',
					body: {
						productId,
					},
					headers: {
						Authorization: `Bearer ${token.value}`,
					},
				}
			)
			if (data?.success === true) {
				console.log('Успешно удалено из избранного!!!')
				useShowToast('Товар был удален из Избранного', '');
				return data
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
					console.log(error)
					console.log('Произошла неизвестная ошибка.')
					break
			}
		}
	};
	
	const fetchFavouriteProducts = async():Promise<responceFavouriteProducts>=>{
		if(!checkAuth()) return {message:'ошибка получения товаров из избранного', success:false, favouriteProducts:[]}
		try{
			const data = await $fetch<responceFavouriteProducts>('http://localhost:8000/api/favourite',{
				headers:{
					Authorization:`Bearer ${token.value}`
				}
			})

			if(data?.success){
				console.log('Успешное получение товаров из избранного')
				return data
			}
			return {message:'ошибка получения товаров из избранного', success:false, favouriteProducts:[]}
		}
		catch(error:any){
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
					console.log(error)
					console.log('Произошла неизвестная ошибка.')
					break
			}
			return {message:'ошибка получения товаров из избранного', success:false, favouriteProducts:[]}
		}
	}

	return {
		addToFavourite,
		removeFromFavourite,
		fetchFavouriteProducts
	}
}
