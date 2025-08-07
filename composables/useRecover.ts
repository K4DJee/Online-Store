    interface IsendCodeToEmailResponse {
    success: boolean;
    message: string;
    }
    interface IconfirmTheCodeResponse {
        success: boolean;
        message: string;
        changeToken: string; 
    }
    interface IsetNewEmail{
    success: boolean;
    message: string;
    }

export const useRecover = () => {
    const token = useCookie("token");
    const checkAuth = () => {
        if (!token.value) {
        console.log("Пользователь не авторизован");
        return false;
        }
        return true;
    };
    //Functions for set email below
    const sendCodeToEmail = async () => {
        if (!checkAuth())
        return { message: "Ошибка создания отзыва", success: false };
        const errorMessage = ref("");
        try {
        const data = await $fetch<IsendCodeToEmailResponse>(
            "http://localhost:8000/api/1/changeUserEmail",
            {
            method: "POST",
            headers: {
                Authorization: `Bearer ${token.value}`,
            },
            }
        );
        if (data?.success) {
            return { success: data.success, message: data.message };
        }
        } catch (error: any) {
        const status = error?.response?.status;
        switch (status) {
            case 400:
            errorMessage.value = "Некорректные данные";
            break;
            case 401:
            errorMessage.value = "Неправильный токен авторизации";
            break;
            case 500:
            errorMessage.value = "Ошибка на стороне сервера";
            break;
            default:
            errorMessage.value = "Неизвестная ошибка";
            break;
        }
        return { success: false, message: errorMessage.value };
        }
    };

    const confirmTheCode = async (code:number) => {
        if (!checkAuth())
        return { message: "Ошибка создания отзыва", success: false };
        const errorMessage = ref('');
        try {
            const data = await $fetch<IconfirmTheCodeResponse>(
                "http://localhost:8000/api/2/changeUserEmail",
                {
                method: "POST",
                body:{
                    code
                },
                headers: {
                    Authorization: `Bearer ${token.value}`,
                },
                }
            
            );
            if (data?.success) {
                return { success: data.success, changeToken:data.changeToken, message: data.message };
            }
          return {success: data.success, changeToken:null, message: data.message}
        } catch (error: any) {
            const status = error?.response?.status;
            switch (status) {
                case 400:
                errorMessage.value = "Некорректные данные";
                break;
                case 401:
                errorMessage.value = "Неправильный код";
                break;
                case 500:
                errorMessage.value = "Ошибка на стороне сервера";
                break;
                default:
                errorMessage.value = "Неизвестная ошибка";
                break;
            }
            return { success: false, changeToken:null, message: errorMessage.value };
        }
    };

    const setNewEmail = async (changeToken:string, newEmail:string) => {
        if (!checkAuth())
        return { message: "Ошибка создания отзыва", success: false };
        const errorMessage = ref('');
        try {
            const data = await $fetch<IsetNewEmail>(
                "http://localhost:8000/api/3/changeUserEmail",
                {
                method: "PUT",
                body:{
                    changeToken,
                    newEmail
                },
                headers: {
                    Authorization: `Bearer ${token.value}`,
                },
                }
            
            );
            if (data?.success) {
                useShowToast('Успешная смена почты', '')
                return { success: data.success, message: data.message };
            }
          return {success: data.success, changeToken:null, message: data.message}
        } catch (error: any) {
            const status = error?.response?.status;
            switch (status) {
                case 400:
                errorMessage.value = "Некорректные данные";
                break;
                case 401:
                errorMessage.value = "Неправильный токен авторизации";
                break;
                case 403:
                errorMessage.value = "Аккаунт с такой почтой уже существует"
                break;
                case 500:
                errorMessage.value = "Ошибка на стороне сервера";
                break;
                default:
                errorMessage.value = "Неизвестная ошибка";
                break;
            }
            return { success: false, message: errorMessage.value };
        }
    };

    return {
        sendCodeToEmail,
        confirmTheCode,
        setNewEmail,
    };
};
