<script setup lang="ts">
import { onMounted } from 'vue';
    const route = useRoute();
    const productId = route.params.id;
    interface responseProductPage{
        productRow: [{
    productId: number;
    name: string;
    description: string;
    price: string;
    quantity: number;
    categoryId: number | null;
    imageUrl: string;
    createdAt: string;
    updatedAt: string;
    isActive: number;
  }];
    }

    const {data, pending} = useAsyncData(
        `product-${productId}`,
        async ()=>{
            try{
                const data =  await $fetch<responseProductPage>(`http://localhost:8000/api/product/${productId}`,{
                method:'GET'
            })
            if(data?.productRow){
                return data;
            }
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
                console.log('Произошла неизвестная ошибка.');
            break;
            }
            }
        }

        
        
    )
</script>
<template>
    <div class="product-page-section">
        <div class="product-page-container">
            <h2 class="category-product">Категория: товары для здоровья</h2>
            <div class="product-container">
            <div class="product-img-container">
                <ul class="mini-product-imgs-list">
                    <li class="mini-product-img-item"></li>
                    <li class="mini-product-img-item"></li>
                    <li class="mini-product-img-item"></li>
                    <li class="mini-product-img-item"></li>
                    <li class="mini-product-img-item"></li>
                </ul>
                <div class="big-product-img">

                </div>
            </div>
            <div class="product-info-container"></div>
            <div class="product-price-container">
                <div class="product-price-delivery-container">
                    <div class="product-page-price">{{ data?.productRow[0].price }} ₽</div>
                    <div class="product-delivery-container">
                        <div class="p-d-c-white-container">
                            <svg width="23" height="18" viewBox="0 0 23 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M1.725 0C0.772656 0 0 0.755859 0 1.6875V12.9375C0 13.8691 0.772656 14.625 1.725 14.625H2.3C2.3 16.4883 3.84531 18 5.75 18C7.65469 18 9.2 16.4883 9.2 14.625H13.8C13.8 16.4883 15.3453 18 17.25 18C19.1547 18 20.7 16.4883 20.7 14.625H21.85C22.4861 14.625 23 14.1223 23 13.5C23 12.8777 22.4861 12.375 21.85 12.375V10.125V9V8.34258C21.85 7.74492 21.6092 7.17188 21.178 6.75L18.4 4.03242C17.9688 3.61055 17.383 3.375 16.772 3.375H14.95V1.6875C14.95 0.755859 14.1773 0 13.225 0H1.725ZM14.95 5.625H16.772L19.55 8.34258V9H14.95V5.625ZM7.475 14.625C7.475 15.5566 6.70234 16.3125 5.75 16.3125C4.79766 16.3125 4.025 15.5566 4.025 14.625C4.025 13.6934 4.79766 12.9375 5.75 12.9375C6.70234 12.9375 7.475 13.6934 7.475 14.625ZM17.25 16.3125C16.2977 16.3125 15.525 15.5566 15.525 14.625C15.525 13.6934 16.2977 12.9375 17.25 12.9375C18.2023 12.9375 18.975 13.6934 18.975 14.625C18.975 15.5566 18.2023 16.3125 17.25 16.3125Z" fill="#949494"/>
                        </svg>
                        </div>
                        <h2 class="p-d-title">18 июня</h2>
                    </div>
                </div>
            </div>
        </div>
        </div>
    </div>
    <h2>{{ data }}</h2>
<h2>Product name:{{ data?.productRow[0].name }}</h2>
<h2>Product description:{{ data?.productRow[0].description }}</h2>
</template>
<style>
.product-page-section{
    width:100%;
    height:100%;
    padding:15px;
}
.product-page-container{
    margin:0 auto;
    width:1425px;
    padding:15px;
    height:500px;
    background-color: white;
    border-radius: 9px;
}
.category-product{
    width:100%;
    text-align: left;
    font-size: 15px;
    color:#949494;
    margin-bottom: 5px;
}
.product-img-container{
    display: flex;
    column-gap: 25px;
}
.big-product-img{
    background-color: GRAY;
    width:360px;
    height:450px;
    border-radius: 9px;
}
.mini-product-imgs-list{
    width:56px;
    height:450px;
    display: grid;
    row-gap: 25px;
}
.mini-product-img-item{
    border:1px solid black;
    border-radius: 4px;
    height:70px;
}
.product-container{
    display: flex;
    column-gap: 100px;
}


.product-info-container{
    display:grid;
    width:464px;
}

.product-price-container{
    display: grid;
    width:300px;
    height:300px;
    box-shadow: 0px 0px 10px 3px rgba(34, 60, 80, 0.2);
    border-radius: 9px;
    padding:25px;
}
.product-page-price{
    width:140px;
    height:45px;
    background-color: #11F65D;
    font-size: 20px;
    font-family: 'Roboto';
    padding:5px 10px;
    border-radius: 9px; 
    color:white;
    display: flex;
    align-items: center;
    justify-content: center;
}
.product-price-delivery-container{
    display: flex;
    align-items: center;
    column-gap: 5px;
}
.p-d-c-white-container{
    background-color: white;
    border:1px solid #1178FF;
    border-radius: 9px 0px 0px 9px;
    display: flex;
    align-items: center;
    justify-content: center;
    width:28px;
    height:20px;
    & svg path{
        fill:black;
    }
    & svg{
        width:17.16px;
        height:13px;
    }
}
.product-delivery-container{
    background-color: #1178FF;
    border:1px solid #1178FF;
    border-radius: 9px;
}
</style>