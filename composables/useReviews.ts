import type {responseReviewActions, responseAllUserReviews, responseAllProductReviews} from '~/types/reviewsTypes'

export const useReviews = () =>{
    const token = useCookie('token');
    const checkAuth = () => {
        if (!token.value) {
            console.log('Пользователь не авторизован')
            return false
        }
        return true
    }
    const addReview: (productId:number, rating:number,comment:string,sellerName:string) => Promise<responseReviewActions> = async (productId:number, rating:number,comment:string,sellerName:string)=>{
        if(!checkAuth()) return {message:'Ошибка создания отзыва', success:false}
        if(rating <=0 || rating > 5){
            console.log('Оценка должна быть от 1 до 5');
            return {message:'Ошибка создания отзыва', success:false}
        }
        try{
            const data  = await $fetch<responseReviewActions>(`http://localhost:8000/api/product/${productId}/create-review`,{
                method:'POST',
                body:{
                    rating,
                    comment,
                    sellerName
                },
                headers:{
                    Authorization:`Bearer ${token.value}`
                }
            });

            if(data?.success === true){
                console.log('Успешное добавление отзыва');
                return data;
            }
            return {message:'Ошибка создания отзыва', success:false}
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
					break;
			}
            return {message:'Ошибка создания отзыва', success:false}
        }
    };

    const getAllProductReviews: (productId:number) => Promise<responseAllProductReviews> = async(productId:number)=>{
        try{
            const data = await $fetch<responseAllProductReviews>(`http://localhost:8000/api/product/${productId}/reviews`,{
                method:'GET'
            });
            if(data?.success === true){
                console.log('Успешное получение отзывов товара');
                return data;
            }
            return {reviewRows:[],message:'Ошибка получения отзывов у товара', success:false}
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
					break;
			}
            return {reviewRows:[],message:'Ошибка получения отзывов у товара', success:false}
        }
    };

    const deleteReview:(productId:number) =>Promise<responseReviewActions> = async(productId:number)=>{
        if(!checkAuth()) return {message:'Ошибка удаления отзыва', success:false}
        try{
            const data = await $fetch<responseReviewActions>(`http://localhost:8000/api/product/${productId}/reviews`,{
                method:'DELETE',
                headers:{
                    Authzorization:`Bearer ${token.value}`
                }
            });
            if(data?.success === true){
                console.log('Успешное удаление отзыва');
                return data;
            }
            return {message:'Ошибка удаления отзыва', success:false}
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
					break;
			}
            return {message:'Ошибка удаления отзыва', success:false}
        }
    };

    const changeReview:(reviewId: number, rating: number, comment: string) => Promise<responseReviewActions> = async(reviewId: number, rating: number, comment: string)=>{
        if(!checkAuth()) return {message:'Ошибка изменения отзыва', success:false}
        if(rating <=0 || rating > 5){
            console.log('Оценка должна быть от 1 до 5');
            return {message:'Ошибка изменения отзыва', success:false}
        }
        if(comment.length > 350){
            console.log('Отзыв не должен превышать 350 символов');
            return {message:'Ошибка изменения отзыва', success:false}
        }
        try{
            const data = await $fetch<responseReviewActions>('http://localhost:8000/api/change-review',{
                method:'PUT',
                body:{
                    reviewId,
                    rating,
                    comment
                },
                headers:{
                    Authorization:`Bearer ${token.value}`
                }
            });
            if(data?.success === true){
                console.log('Успешное изменение отзыва');
                return data;
            }
            return {message:'Ошибка изменения отзыва', success:false}
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
					break;
			}
            return {message:'Ошибка изменения отзыва', success:false}
        }
    };

    const getAllUserReviews = async():Promise<responseAllUserReviews>=>{
        if(!checkAuth()) return {userReviewRows:[],message:'Ошибка получения отзывов', success:false}
        try{
            const data = await $fetch<responseAllUserReviews>('http://localhost:8000/api/user-reviews',{
                method:'GET',
                headers:{
                    Authorization:`Bearer ${token.value}`
                }
            });

            if(data?.success === true){
                console.log('Успешное получение отзывов пользователя');
                return data;
            }
            return {userReviewRows:[],message:'Ошибка получения отзывов', success:false}

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
					break;
			}
            return {userReviewRows:[],message:'Ошибка получения отзывов', success:false}
        }
    };

    return {
        addReview, 
        getAllProductReviews,
        deleteReview, 
        changeReview,
        getAllUserReviews
    }
}