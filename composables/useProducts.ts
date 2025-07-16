import type { IProduct } from "~/types/types"

interface responseProducts {
	products: [IProduct]
	success: boolean
    message: string
}

export const useProducts = () =>{
    const products = ref<IProduct[]>([])

    //actions
    async function fetchProducts() {
        try {
            const response = await $fetch<responseProducts>(
                'http://localhost:8000/api/products',
                {
                    method: 'GET',
                }
            )
            if (response?.products) {
                products.value = response.products
                return products.value
            }
            console.log('products:', response.products)
        } catch (error: any) {
            const status = error?.status
            switch (status) {
                case 500:
                    console.log('Ошибка сервера.')
                    break
                default:
                    console.log('Произошла неизвестная ошибка.')
                    break
            }
        }
    }

    return {
        fetchProducts
    }
}