export const useYooMoney = ()=>{
    //temporaily
    interface responseRefillBalance{
        message:string
        success:boolean
        confirmation_url:string
    }
    const backendUrl = 'https://51ae6bfcc664.ngrok-free.app';
    const token = useCookie('token');
    const checkAuth = () => {
        if (!token.value) {
            console.log('Пользователь не авторизован')
            return false
        }
        return true
    }

    const refillBalanceYooMoney = async(amount:number):Promise<responseRefillBalance>=>{
        if(!checkAuth()) return {message:'Ошибка авторизации', success:false, confirmation_url:''}
        try{
            const data = await $fetch<responseRefillBalance>(`${backendUrl}/api/yoomoney/createPayment`,{
                method:'POST',
                body:{
                    amount
                },
                headers:{
                    Authorization:`Bearer ${token.value}`
                }
            });
            if(data?.success){
                console.log('УРА, у тебя получилось пополнить баланс');
                console.log(data)
                await navigateTo(data.confirmation_url, { external: true });
                return data;
            }
            return {message:'Ошибка создания платежа', success:false, confirmation_url:''}
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
				case 500:
					console.log('Ошибка сервера.')
					break
				default:
					console.log(error)
					console.log('Произошла неизвестная ошибка.')
					break
			}
			return {message:'Ошибка создания платежа', success:false, confirmation_url:''}
        }

    }

    return {
        refillBalanceYooMoney
    }
}