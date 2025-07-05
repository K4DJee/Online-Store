<template>
	<section class="min-h-screen bg-gray-50">
		<h1>Purchases</h1>
		{{ data?.userPurchases }}
	</section>
</template>

<script setup lang="ts">
import type { responsePurchases } from '~/types/purchaseTypes';
const token = useCookie('token');
async function fetchUserPurchases(): Promise<responsePurchases>{
		try{
                const data =  await $fetch<responsePurchases >(`http://localhost:8000/api/purchases`,{
                method:'GET',
                headers:{
                    Authorization: `Bearer ${token.value}`
                }
            })
            if(data?.success){
                return data;
            }
            return { userPurchases:[], message:'Товары не найдены', success:false};
            }
            catch(error: any){
                const status = error?.status;
                switch (status) {
            case 400:
                console.log('Некорректный запрос');
            break;
            case 404:
                console.log('Продукт не найден');
            break;
            case 500:
                console.log('Ошибка сервера.');
            break;
            default:
                console.log(error)
                console.log('Произошла неизвестная ошибка.');
            break;
            }

            return { userPurchases:[], message:'Товары не найдены', success:false};
            }
	}
    const {data, pending} = useAsyncData<responsePurchases >(
        `purchases`,
		fetchUserPurchases
	);
</script>

<style scoped></style>
