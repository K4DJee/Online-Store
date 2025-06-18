<script setup lang="ts">
import axios from 'axios'
import { ref, reactive } from 'vue'
const router = useRouter()
const products = reactive<any[]>([])
async function fetchProducts() {
	try {
		const response = await axios.get('http://localhost:8000/api/products')
		if (!response.data.products) {
			return console.log('Not products')
		} else {
			products.splice(0) // очищаем
			products.push(...response.data.products) // добавляем все элементы
			console.log(products)
		}
	} catch (error) {
		console.log('Error: ', error)
	}
}
async function getProductPage(productId: number) {
	router.push({
		name: 'product-id',
		params: { id: productId },
	})
}
onMounted(async () => {
	await fetchProducts()
})
</script>
<template>
	<h2 class="products-title">Товары</h2>
	<section class="products-section">
		<ul class="products-list">
			<li
				@click="getProductPage(product.productId)"
				class="product-item"
				v-for="product in products"
			>
				<div class="product-img">
					<img :src="product.imageUrl" alt="" />
				</div>
				<div class="product-info">
					<h2 class="product-price">{{ product.price }} ₽</h2>
					<h2 class="product-name">{{ product.name }}</h2>
					<div class="product-reviews-container">
						<svg
							width="13"
							height="12"
							viewBox="0 0 13 12"
							fill="none"
							xmlns="http://www.w3.org/2000/svg"
						>
							<path
								d="M10.051 12C9.89651 12 9.7428 11.9543 9.61051 11.8631L6.50008 9.71081L3.38965 11.8631C3.26078 11.9526 3.10591 12.0005 2.94715 11.9999C2.7884 11.9994 2.63388 11.9505 2.50565 11.8602C2.37731 11.7704 2.28158 11.6438 2.23208 11.4985C2.18259 11.3532 2.18185 11.1965 2.22998 11.0508L3.39003 7.43823L0.307512 5.34236C0.179762 5.25139 0.0848864 5.12397 0.0363069 4.97811C-0.0122727 4.83226 -0.0120976 4.67537 0.0368075 4.52962C0.0860983 4.38422 0.181499 4.25744 0.309527 4.16721C0.437555 4.07698 0.591735 4.02785 0.750276 4.02677L4.56806 4.02124L5.78355 0.49836C5.83371 0.353234 5.92992 0.227012 6.05855 0.137571C6.18718 0.0481288 6.34172 0 6.50027 0C6.65882 0 6.81336 0.0481288 6.94199 0.137571C7.07062 0.227012 7.16683 0.353234 7.21699 0.49836L8.41184 4.02124L12.2491 4.02677C12.4078 4.02763 12.5623 4.07674 12.6904 4.16711C12.8186 4.25747 12.914 4.38451 12.963 4.53017C13.0121 4.67583 13.0123 4.8327 12.9637 4.9785C12.9151 5.1243 12.8201 5.25162 12.6923 5.34236L9.60974 7.43823L10.7698 11.0508C10.818 11.1965 10.8174 11.3531 10.7679 11.4985C10.7185 11.6438 10.6228 11.7704 10.4945 11.8602C10.3659 11.9512 10.2105 12.0002 10.051 12Z"
								fill="#FFAC33"
							/>
						</svg>
						<h2 class="product-reviews-grades">4.8</h2>
						<h2 class="product-reviews-amount">21 отзыв</h2>
					</div>
				</div>
			</li>
		</ul>
	</section>
</template>
<style>
.products-title {
	text-align: center;
	font-family: 'Roboto';
}
.products-section {
	max-width: 1350px;

	margin: 0 auto;
	border: 1px solid black;
}
.products-list {
	display: flex;
	column-gap: 50px;
	justify-content: center;
	flex-wrap: wrap;
	row-gap: 50px;
}
.product-img {
	width: 100%;
	height: 180px;
	display: flex;
	justify-content: center;
	& img {
		height: 180px;
	}
}
.product-info {
	width: 100%;
	padding: 10px 20px;
	display: grid;
	row-gap: 10px;
}
.product-price {
	font-size: 18px;
	font-family: 'Roboto';
}
.product-name {
	font-size: 14px;
	font-family: 'Roboto';
}
.product-item {
	width: 275px;
	height: 305px;
	background-color: #fcfcfc;
	cursor: pointer;
}
.product-reviews-container {
	display: flex;
	align-items: center;
	column-gap: 5px;
	& svg {
	}
}
.product-reviews-amount {
	font-family: 'Roboto';
	font-size: 14px;
	color: #919191;
}
.product-reviews-grades {
	font-family: 'Roboto';
	font-size: 14px;
	color: black;
}
</style>
