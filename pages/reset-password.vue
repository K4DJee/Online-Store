<script setup lang="ts">
const recover_token = useCookie('recover_token');
const recover = useCookie('recover');
const router = useRouter();
import {ref} from 'vue';
const password = ref('');
const confirmPassword = ref('');
const errorMessage = ref('');

    interface responsePasswordObject {
        valid:boolean,
    }

async function changePassword(){
    errorMessage.value = '';
    try{
    if(password.value != confirmPassword.value){
       errorMessage.value = 'Пароли не совпадают';
        return
    }
    if(!password.value || !confirmPassword.value){
        return errorMessage.value = 'Укажите данные';
    }

    const data = await $fetch<responsePasswordObject>('http://localhost:8000/api/changePassword', {
        method:'POST',
        body:{
            password:password.value,
            token:recover_token.value
        }
    });
    if(!data?.valid){
        return errorMessage.value = 'Не удалось изменить пароль';
    }
    recover.value = null;
    recover_token.value = null;
    errorMessage.value = 'Пароль успешно изменён';
    } 
    catch(error:any){
        const status = error?.status;
        switch(status){
            case 400:
            errorMessage.value = 'Неполные данные';
            break;
            case 401:
            errorMessage.value = 'Неправильный токен авторизации';
            break;
            case 404:
            errorMessage.value = 'Пользователя с такой почтой не существует';
            break;
            case 500:
            errorMessage.value = 'Ошибка на стороне сервера';
            break;
            default:
            errorMessage.value = 'Неизвестная ошибка';
            break;
        }
    }
}

onMounted(async()=>{
    if(!recover_token.value){
        router.push('/');
    }
    const data = await $fetch<responsePasswordObject>('http://localhost:8000/api/validateToken', {
        method:'POST',
        body:{
            token:recover_token.value
        }
    });
    if(data?.valid === false){
        router.push('/');
        return console.log('Неправильный токен');   
    }
    console.log('Доступ разрешён');
});
</script>
<template>
    <section class="resetPasswordSection">
    <div class="resetPasswordContainer">
    <div class="recover-input">
        <h2 class="recover-title">Укажите свой новый пароль:</h2>
        <input v-model="password" type="text">
    </div>
    <div class="recover-input">
        <h2 class="recover-title">Введите ещё раз пароль:</h2>
        <input v-model="confirmPassword" type="password">
    </div>
    <h2 v-if="errorMessage" class="error-message-container">{{ errorMessage }}</h2>
    <button @click="changePassword">Изменить пароль</button>
    </div>
</section>
</template>
<style scoped>
.resetPasswordSection{
    width:100%;
    height:600px;
    display: flex;
    justify-content: center;
    align-items: center; 
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
.resetPasswordContainer{
    display: grid;
    width:600px;
    /* height:250px; */
    background-color: white;
    border-radius: 9px;
    padding: 25px;
    row-gap: 10px;
    & input{
    height:45px;
    width:100%;
    border-radius: 9px;
    border:1px solid black;
    padding:0 10px;
    font-family: 'Roboto';
    font-size: 18px;
    /* margin-top: 15px; */
    }
    & button{
    padding:10px  15px;
    border-radius: 9px;
    background-color: #1178FF;
    color:white;
    font-size: 18px;
    font-family: 'Roboto';
    cursor: pointer;
    margin: 0 auto;
    margin-top: 5px;
    }
}
</style>