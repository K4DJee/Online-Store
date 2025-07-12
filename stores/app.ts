import { defineStore } from 'pinia'
import type {
	responseRequests,
	requestParams,
	appResponses,
} from '~/types/appTypes'

export const useAppStore = defineStore('appStore', () => {
	//state
	const isAuthModal = ref(false)

	//actions
	const toggleAuthModal = (): void => {
		isAuthModal.value = !isAuthModal.value
	}
	const getTokenFromCookie = (): string | null => {
		const token = useCookie('token').value
		return token || null
	}

	const getResponse = async ({
		url,
		data,
	}: Partial<requestParams>): Promise<appResponses> => {
		try {
			const token = getTokenFromCookie()
			const response = await $fetch<appResponses>(url!, {
				method: 'GET',
				body: {
					headers: {
						Authorization: token ? `Bearer ${token}` : '',
					},
				},
			})
			if (response?.success) {
				return response
			}
			return {
				message: 'Ошибка получения данных',
				success: false,
				responseRow: [],
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
					console.log('Не найдено')
					break
				case 500:
					console.log('Ошибка сервера.')
					break
				default:
					console.log(error)
					console.log('Произошла неизвестная ошибка.')
					break
			}
			return {
				message: 'Ошибка получения данных',
				success: false,
				responseRow: [],
			}
		}
	}

	const postResponse = async ({ url, data }: requestParams) => {
		return sendRequest(url, 'post', data)
	}

	const putResponse = async ({ url, data }: requestParams) => {
		return sendRequest(url, 'put', data)
	}

	const deleteResponse = async ({ url, data }: requestParams) => {
		return sendRequest(url, 'delete', data)
	}

	const sendRequest = async (
		url: string,
		method: 'post' | 'put' | 'delete',
		data: object
	): Promise<responseRequests> => {
		try {
			const token = getTokenFromCookie()
			const response = await $fetch<responseRequests>(url, {
				method,
				body: data,
				headers: {
					Authorization: `Bearer ${token}`,
				},
			})
			if (response?.success) {
				return response
			}

			return { message: 'Ошибка запроса', success: false }
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
					console.log('Не найдено')
					break
				case 500:
					console.log('Ошибка сервера.')
					break
				default:
					console.log(error)
					console.log('Произошла неизвестная ошибка.')
					break
			}
			return { message: 'Ошибка запроса', success: false }
		}
	}

	const handleError = async () => {}

	return {
		getResponse,
		postResponse,
		putResponse,
		deleteResponse,
		isAuthModal,
		toggleAuthModal,
	}
})
