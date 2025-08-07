export const useBalance = ()=>{
    const token = useCookie('token');
    const checkAuth = () => {
        if (!token.value) {
            console.log('Пользователь не авторизован')
            return false
        }
        return true
    }

    //temporaily 
    interface responseUserTransactions{
        message:string,
        success:boolean,
        userTransactionRows:userTransactionRow[]
    }

    interface userTransactionRow{
        amount:number,
        type:string,
        createdAt:Date
    }

    //actions
    const getUserTransactions = async():Promise<responseUserTransactions> =>{
        if(!checkAuth()) return {message:'Ошибка авторизации', success:false, userTransactionRows:[]};
        try{
            const data = await $fetch<responseUserTransactions>('http://localhost:8000/api/user/transactions',{
                method:'GET',
                headers:{
                    Authorization:`Bearer ${token.value}`
                }
            });
            if(data?.success){
                console.log(data);
                return data;
            }
            return {message:'Ошибка авторизации', success:false, userTransactionRows:[]};
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
			return {message:'Ошибка авторизации', success:false, userTransactionRows:[]};
        }
    }

    return {
        getUserTransactions
    }
}