<script setup lang="ts">
import {ref, provide} from 'vue';
    const email = ref('');
    const nextStage = ref(false);
    const recover = useCookie('recover');
    const errorMessage = ref('');
    const loading = ref(false);
    provide('recover', nextStage);
    const emit  = defineEmits<{
        (e:'next'):void}>()

    interface emailRecoverResponse {
    valid: boolean;
    }
    async function emailRecover(){
        try{
            loading.value = true;
            errorMessage.value = '';
            if(!email.value){
                return errorMessage.value = 'Введите почту';
            }
            if (!isValidEmail(email.value)) {
            return errorMessage.value = 'Введите корректный email!';
            }

    const data = await $fetch<emailRecoverResponse>('http://localhost:8000/api/account-recover',{
        method:'POST',
        body:{
            email:email.value
        },
    });
    if(data?.valid){
        nextStage.value = true;
        recover.value = email.value;
        emit('next');
    }
        }
        catch(error: any){
            const status = error?.response?.status
            switch (status){
                case 400:
                errorMessage.value = 'Некорректные данные'
                break;
                case 401:
                errorMessage.value = 'Аккаунта с такой почтой не существует';
                break;
                case 500:
                errorMessage.value = 'Ошибка на стороне сервера'
                break
                default:
                errorMessage.value = 'Неизвестная ошибка'
            }
            // console.log(error);
        }
        finally {
    loading.value = false;
    }
    }

    function isValidEmail(email: string): boolean {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
    }
</script>   
<template>
    <form @submit.prevent="emailRecover" class="emailRecover-container">
    <h2 class="recover-title">Введите свою почту для восстановления доступа к аккаунту</h2>
    <input v-model="email" type="text">
    <h2 class="error-message-container" v-if="errorMessage">{{ errorMessage }}</h2>
    <button @click="emailRecover">Отправить</button>
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
<style setup>
.emailRecover-container{
    display: grid;
    position: relative;
    & input{
        height:45px;
        width:100%;
        border-radius: 9px;
        border:1px solid black;
        padding:0 10px;
        font-family: 'Roboto';
        font-size: 18px;
        margin-top: 15px;
    }
    & button{
        width:130px;
        height:45px;
        border-radius: 9px;
        background-color: #1178FF;
        color:white;
        font-size: 18px;
        font-family: 'Roboto';
        cursor: pointer;
        margin: 0 auto;
        margin-top: 15px;
    }
}
.recover-title{
    font-size: 21px;
}
.error-message-container{
    margin-top: 5px;
    /* border: 1px solid black; */
    height:25px;
    font-family: 'Roboto';
    font-size: 18px;
    padding:0 5px;
    display: flex;
    align-items: center;
    font-weight:500;
}
.loader-krug{
    width:100%;
    height:100%;
    background-color: white;
    position: absolute;
    display: flex;
    justify-content: center;
    align-items: center;
}
.anim-container{
    display: flex;
    justify-content: center;
    align-items: center;
    column-gap: 5px;
}

.polygon {
  animation: rotate 2s linear infinite;
}

.kvadrat {
  animation: rotate 1s ease-in-out infinite alternate;
}

.krug {
  animation: pulse 1.5s ease-in-out infinite;
}

@keyframes rotate {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

@keyframes pulse {
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.2);
  }
  100% {
    transform: scale(1);
  }
}

@keyframes fade {
  0% {
    opacity: 1;
  }
  50% {
    opacity: 0.5;
  }
  100% {
    opacity: 1;
  }
}
</style>