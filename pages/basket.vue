<template>
    Basket
    <div>{{ cartData?.cartProductsRow }}</div>
</template>
<script setup lang="ts">
const token = useCookie('token');
import type {basketResponse}  from '../types/basketTypes'

async function fetchUserBasket(){
    try{
            console.log('fetch cart attempt')
        const cartData =  await $fetch<basketResponse>('http://localhost:8000/api/cart',{
            method:'GET',
            headers:{
                Authorization:`Bearer ${token.value}`
            }
        });
        if(cartData?.cartProductsRow){
            console.log(cartData);
            return cartData;
        }
        }
        catch(error: any){
                const status = error?.status;
                switch (status) {
            case 400:
                console.log('Некорректный запрос');
            break;
            case 401:
                console.log('Неправильный токен авторизации');
            break;
            case 404:
                console.log('Продукт не найден');
            break;
            case 500:
                console.log('Ошибка сервера.');
            break;
            default:
                console.log('Произошла неизвестная ошибка.');
            break;
            }
            }
}

const {data:cartData, pending,error} = await useAsyncData<basketResponse | undefined>(
    '/basket',
    fetchUserBasket

)

</script>