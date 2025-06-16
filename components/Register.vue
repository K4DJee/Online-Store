<script setup lang='ts'>
    import {ref} from 'vue';
    import type { AuthState } from '../types/types'
    const router = useRouter();
    interface User{
        username:string;
        email:string;
        password:string;
        consent:boolean;
        regDate:string;
        role:string;
    }
    interface registerResponse{
      token:string
    }
    const username = ref('');
    const email = ref('');
    const password = ref('');
    const confirmPassword = ref('');
    const consent = ref(false);
    const errorMessage = ref('');
    const token = useCookie('token');
    const auth = inject<AuthState>('auth');
    const loading = ref(false);
    const emit = defineEmits<{
    (e: 'close'): void
    }>()

    //functions
  const submitForm = async ()=>{
    errorMessage.value = '';
    if(!username.value || !email.value || !password.value || !confirmPassword.value) {
      return errorMessage.value = 'Введите данные';
    }
    if(password.value != confirmPassword.value){
        errorMessage.value = 'Пароли не совпадают';
        return
    }
    if(consent.value === false){
        errorMessage.value = 'Чтобы зарегистрироваться, вы должны согласиться на обработку персональных данных';
        return
    }
  const user: User = {
    username: username.value,
    email: email.value,
    password: password.value,
    consent: consent.value,
    regDate: new Date().toISOString(),
    role: 'user'
  }
    try{
        loading.value = true;
        if(user.username.length <= 3){
        return errorMessage.value = 'Количество символов в имени должно быть больше 3';
        }
        if (!isValidEmail(user.email)) {
        return errorMessage.value = 'Введите корректный email';
        }
        const data = await $fetch<registerResponse>('http://localhost:8000/api/register', {
          method:'POST',
          body:user
        });
        if(data?.token){
            token.value = data.token;
            auth?.fetchUserData(data.token);
            emit('close');
            router.push('/profile');
        }
        else{
            console.log('Error register');
            errorMessage.value = 'Error register';
        }
    } 
    catch(error: any){
        const status = error?.status;
        switch (status){
          case 400:
            errorMessage.value = 'Указаны неполные данные';
            break;
            case 401:
            errorMessage.value = 'Пользователь с такой почтой или никнейном уже существует';
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
    <form class="login-form" @submit.prevent="submitForm">
        <input v-model="username" type="text" placeholder="Имя">
        <input v-model="email" type="text" placeholder="Почта">
        <input v-model="password" type="password" placeholder="Пароль">
        <input v-model="confirmPassword" type="password" placeholder="Подтвердите пароль">
        <div class="consent-checkbox">
            <input v-model="consent" type="checkbox">
            <h2>Подтвердите обработку персональных данных</h2>
        </div>
        <div class="errorMessage">
            <h2 >{{ errorMessage }}</h2>
        </div>
        <button>Войти</button>
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
    position: relative;
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
.consent-checkbox{
    display:flex;
    align-items: center;
    row-gap: 5px;
    column-gap:10px;
    & input{
        width:20px;
        height:20px;
    }
    & h2{
        font-size:16px;
        font-family: 'Roboto';
        font-weight: 500;
    }
}
.errorMessage{
    & h2{
        font-size: 16px;
        font-family: 'Roboto';
        font-weight: 500;
    }
}
</style>