<template>
	<section class="min-h-screen bg-gray-50">
		<h1>Favourite</h1>
       {{ data?.favouriteProducts }}
       <ul class="favourite-items">
        <favourite-card
       v-for="(favouriteProduct, index) in data?.favouriteProducts"
					:key="index"
					:favouriteProduct="favouriteProduct"
       >

       </favourite-card>
       </ul>
	</section>
</template>

<script setup lang="ts">
import type {responceFavouriteProducts} from '~/types/favouriteTypes';
const token = useCookie('token');
async function fetchFavouriteProducts(): Promise<responceFavouriteProducts>{
		try{
                const data =  await $fetch<responceFavouriteProducts >(`http://localhost:8000/api/favourite`,{
                method:'GET',
                headers:{
                    Authorization: `Bearer ${token.value}`
                }
            })
            if(data?.favouriteProducts){
                console.log(data?.favouriteProducts)
                return data;
            }
            return { favouriteProducts: [] };
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

            return { favouriteProducts: [] };
            }
	}
    const {data, pending} = useAsyncData<responceFavouriteProducts >(
        `favourite`,
		fetchFavouriteProducts
	);
</script>

<style>
.favourite-items{
    display: flex;
    column-gap: 15px;
    row-gap: 15px;
}
</style>
