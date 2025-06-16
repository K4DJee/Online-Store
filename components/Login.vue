<script setup lang="ts">
    import axios, {AxiosError} from 'axios';
    import {ref, inject} from 'vue';
    import type { AuthState } from '../types/types'
    const router = useRouter();
    interface User{
        username:string;
        email:string;
        password:string;
        // consent:boolean;
        regDate:Date;
        role:string;
    }
    interface loginResponse{
        token:string
    }
    //Переменные
    const username = ref('')
    const email = ref('')
    const password = ref('')
    const auth = inject<AuthState>('auth');
    const errorMessage = ref('');
    const loading = ref(false);
    const emit = defineEmits<{
  (e: 'close'): void
}>()
    const token = useCookie('token');
  const submitForm = async ()=>{
    const user: User = {
        username: username.value,
        email: email.value,
        password: password.value,
        regDate: new Date(),
        role: 'user'
    } 
    errorMessage.value = '';
    if(!user.username || !user.email || !user.password || !user.role){
        return errorMessage.value = 'Введите свои данные';
    }
    if(user.username.length <= 3){
        return errorMessage.value = 'Количество символов в имени должно быть больше 3';
    }
    if (!isValidEmail(user.email)) {
    return errorMessage.value = 'Введите корректный email!';
    }
    try{
        loading.value = true;
        const data = await $fetch<loginResponse>('http://localhost:8000/api/login', {
            method:'POST',
            body:user
        });
        console.log('User object send: ', user);
        if(data?.token){
            token.value = data.token;
            auth?.fetchUserData(data.token);
            emit('close');
            router.push('/profile');
        }
        else{
            console.log('User not found');
        }
    } 
    catch(error: any){
        const status = error?.status;
        switch (status){
            case 404:
            errorMessage.value = 'Пользователь не найден';
            break;
            case 400:
            errorMessage.value = 'Указаны неполные данные';
            break;
            case 401:
            errorMessage.value = 'Пароль или почта неверные';
            break;
            case 500:
            errorMessage.value = 'Ошибка на стороне сервера';
            break;
            default:
            errorMessage.value = 'Неизвестная ошибка';
            break;
        }
    }
    finally{
        loading.value = false;
    }

  }

  function isValidEmail(email: string): boolean {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return emailRegex.test(email);
}
</script>

<template>
    <form @submit.prevent="submitForm" class="login-form" action="">
        <input v-model="username" type="text" placeholder="Имя">
        <input v-model="email" type="text" placeholder="Почта">
        <input v-model="password" type="password" placeholder="Пароль">
        <h2 class="changepass-h2" @click="router.push('/recover'); emit('close')">Забыли пароль?</h2>
        <div class="errorMessage">
            <h2 >{{ errorMessage }}</h2>
        </div>
        <button>Войти</button>
        <div class="auth-accounts-container">
            <h2>Войти с помощью</h2>
            <ul class="services-list">
                <li class="service-item"><svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/><path d="M1 1h22v22H1z" fill="none"/></svg></li>
            </ul>
        </div>
        <div ref="loading" class="loader-krug" v-if="loading">
        <div class="anim-container">
            <svg class="kvadrat" width="20" height="20" viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="17" height="17" fill="black"/>
            </svg>
            <svg class="kvadrat" width="24" height="24" viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="17" height="17" fill="black"/>
            </svg>
            <svg class="kvadrat" width="20" height="20" viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="17" height="17" fill="black"/>
            </svg>
        </div>
    </div>
    </form>
</template>
<style scoped>
.login-form{
    display: grid;
    row-gap: 15px;
    & input{
        border:1px solid black;
        border-radius: 6px;
        width:100%;
        height:35px;
        padding:5px;
        font-family: 'Roboto';
    }
    & button{
        width:150px;
        height:40px;
        margin: 0 auto;
        border-radius: 3px;
        cursor: pointer;
    }
}
.changepass-h2{
    font-size: 14px;
    font-family: 'Roboto';
    font-weight: 400;
    color:#002FFF;
    cursor: pointer;
}
.errorMessage{
    & h2{
        font-size: 16px;
        font-family: 'Roboto';
        font-weight: 500;
    }
}
.auth-accounts-container{
    & h2{
        text-align: center;
        font-size: 15px;
        font-family: 'Roboto';
        font-weight: 400;
        margin-top:5px;
    }
}
.services-list{
    margin-top: 5px;
    display: flex;
    justify-content: center;
    column-gap: 5px;
}
.service-item{
    cursor: pointer;
    & svg{
        width:25px;
        height:25x;  
    }
}
</style>    