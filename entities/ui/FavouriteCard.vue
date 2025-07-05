<template>
<div class="favourite-item">
    <div class="favourite-btn">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M47.6 300.4L228.3 469.1c7.5 7 17.4 10.9 27.7 10.9s20.2-3.9 27.7-10.9L464.4 300.4c30.4-28.3 47.6-68 47.6-109.5v-5.8c0-69.9-50.5-129.5-119.4-141C347 36.5 300.6 51.4 268 84L256 96 244 84c-32.6-32.6-79-47.5-124.6-39.9C50.5 55.6 0 115.2 0 185.1v5.8c0 41.5 17.2 81.2 47.6 109.5z"/></svg>
    </div>
    <div class="favourite-img-container">
        <NuxtImg :src="favouriteProduct.productImage" :alt="favouriteProduct.productName"></NuxtImg>
    </div>
    <div class="favourite-overview-container">
        <div class="favourite-title">{{ favouriteProduct.productName }}</div>
        <div class="favourite-description">{{ favouriteProduct.productDescription }}</div>
        <div class="favourite-price-container">{{ favouriteProduct.productSalePrice }} {{ favouriteProduct.productPrice }}</div>
    </div>
    <div class="favourite-btn-container">
        <button>В корзину</button>
    </div>
</div>
</template>
<script setup lang="ts">
import { NuxtImg } from '#components';
import type { favouriteProduct } from '~/types/favouriteTypes';
const props = defineProps<{
	favouriteProduct: favouriteProduct
}>();

const favouriteProduct = computed(() => props.favouriteProduct);

</script>

<style>
.favourite-item{
    width:225px;
    height:285px;
    position: relative;
}
.favourite-btn{
    position: absolute;
    right:5px;
    top:5px;
    & svg{
        width:22px;
        height:19px;
    }
}
</style>