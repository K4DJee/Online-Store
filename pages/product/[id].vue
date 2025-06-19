<script setup lang="ts">
import { onMounted } from 'vue';
    const route = useRoute();
    const productId = route.params.id;
    interface responseProductPageInfo{
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
    interface responseProductPageReviews{
        reviewRows:[{
            reviewId: number,
            productId: number,
            userId: number,
            rating:number,
            comment:string,
            updatedAt:Date,
            reviewerUsername:string
        }];
    }

    const {data, pending} = useAsyncData<responseProductPageInfo | undefined>(
        `product-${productId}`,
        async ()=>{
            try{
                const data =  await $fetch<responseProductPageInfo>(`http://localhost:8000/api/product/${productId}`,{
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
        });

        const {data:reviewRows} = useAsyncData<responseProductPageReviews | undefined>(
        `product-${productId}/reviews`,
        async ()=>{
            try{
                const data = await $fetch<responseProductPageReviews>(`http://localhost:8000/api/product/${productId}/reviews`,{
                    method:'GET'
                });
                if(data?.reviewRows){
                return data;
            }
            }
            catch(error){

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
                    <img :src=data?.productRow[0].imageUrl alt="">
                </div>
            </div>
            <div class="product-info-container">
                <h2 class="product-page-title">{{ data?.productRow[0].name }}</h2>
                <div class="product-page-rating-container">
                    <svg width="15" height="14" viewBox="0 0 15 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M11.5973 14C11.419 14 11.2417 13.9466 11.089 13.8403L7.50009 11.3293L3.91113 13.8403C3.76244 13.9447 3.58374 14.0005 3.40056 13.9999C3.21738 13.9993 3.03909 13.9422 2.89114 13.8369C2.74305 13.7321 2.63259 13.5845 2.57548 13.4149C2.51837 13.2454 2.51752 13.0626 2.57305 12.8925L3.91157 8.67793L0.354822 6.23275C0.207417 6.12662 0.0979459 5.97796 0.0418925 5.8078C-0.0141608 5.63764 -0.0139588 5.45459 0.0424702 5.28455C0.0993442 5.11492 0.209422 4.96702 0.357147 4.86175C0.504871 4.75648 0.682771 4.69916 0.865703 4.6979L5.27083 4.69144L6.67333 0.58142C6.73121 0.412106 6.84222 0.264848 6.99064 0.160499C7.13906 0.0561503 7.31737 0 7.50031 0C7.68326 0 7.86156 0.0561503 8.00998 0.160499C8.1584 0.264848 8.26942 0.412106 8.32729 0.58142L9.70597 4.69144L14.1336 4.6979C14.3167 4.69891 14.4949 4.75619 14.6428 4.86162C14.7907 4.96705 14.9007 5.11526 14.9573 5.2852C15.0139 5.45513 15.0142 5.63815 14.9581 5.80825C14.9021 5.97835 14.7925 6.12689 14.6449 6.23275L11.0882 8.67793L12.4267 12.8925C12.4823 13.0625 12.4816 13.2453 12.4246 13.4149C12.3675 13.5844 12.2571 13.7321 12.109 13.8369C11.9606 13.9431 11.7813 14.0002 11.5973 14Z" fill="#FFAC33"/>
                </svg>
                <h2 class="p-p-rating">4.8</h2>
                <h2 class="p-p-reviews">222 отзыва</h2>
                </div>
                <div class="product-page-characteristics-container">
                    <h2>Артикул: {{ data?.productRow[0].productId }}</h2>
                    <h2>Гарантийный срок: 1</h2>
                </div>
                <div class="product-page-description-container">
                    <h2>Описание:</h2>
                    <h2>{{ data?.productRow[0].description }}</h2>
                </div>

                <div class="product-page-shop-container">
                    <div class="p-p-shop-info-container">
                    <div class="p-p-shop-img"></div>
                    <div class="p-p-shop-h2-container">
                        <h2 class="p-p-shop-name">KlanShop</h2>
                        <h2 class="p-p-shop-title">Продавец</h2>
                    </div>
                </div>
                    <div class="p-p-shop-rating-container">
                        <svg width="15" height="14" viewBox="0 0 15 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M11.5973 14C11.419 14 11.2417 13.9466 11.089 13.8403L7.50009 11.3293L3.91113 13.8403C3.76244 13.9447 3.58374 14.0005 3.40056 13.9999C3.21738 13.9993 3.03909 13.9422 2.89114 13.8369C2.74305 13.7321 2.63259 13.5845 2.57548 13.4149C2.51837 13.2454 2.51752 13.0626 2.57305 12.8925L3.91157 8.67793L0.354822 6.23275C0.207417 6.12662 0.0979459 5.97796 0.0418925 5.8078C-0.0141608 5.63764 -0.0139588 5.45459 0.0424702 5.28455C0.0993442 5.11492 0.209422 4.96702 0.357147 4.86175C0.504871 4.75648 0.682771 4.69916 0.865703 4.6979L5.27083 4.69144L6.67333 0.58142C6.73121 0.412106 6.84222 0.264848 6.99064 0.160499C7.13906 0.0561503 7.31737 0 7.50031 0C7.68326 0 7.86156 0.0561503 8.00998 0.160499C8.1584 0.264848 8.26942 0.412106 8.32729 0.58142L9.70597 4.69144L14.1336 4.6979C14.3167 4.69891 14.4949 4.75619 14.6428 4.86162C14.7907 4.96705 14.9007 5.11526 14.9573 5.2852C15.0139 5.45513 15.0142 5.63815 14.9581 5.80825C14.9021 5.97835 14.7925 6.12689 14.6449 6.23275L11.0882 8.67793L12.4267 12.8925C12.4823 13.0625 12.4816 13.2453 12.4246 13.4149C12.3675 13.5844 12.2571 13.7321 12.109 13.8369C11.9606 13.9431 11.7813 14.0002 11.5973 14Z" fill="#FFAC33"/>
                    </svg>
                    <h2 class="p-p-shop-rating">4.8</h2>
                    </div>
                </div>
            </div>
            <div class="product-price-container">
                <div class="product-price-delivery-container">
                    <div class="product-page-price">{{ data?.productRow[0].price }} ₽</div>
                    <div class="product-delivery-container">
                        <div class="p-d-c-white-container">
                            <svg width="23" height="18" viewBox="0 0 23 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M1.725 0C0.772656 0 0 0.755859 0 1.6875V12.9375C0 13.8691 0.772656 14.625 1.725 14.625H2.3C2.3 16.4883 3.84531 18 5.75 18C7.65469 18 9.2 16.4883 9.2 14.625H13.8C13.8 16.4883 15.3453 18 17.25 18C19.1547 18 20.7 16.4883 20.7 14.625H21.85C22.4861 14.625 23 14.1223 23 13.5C23 12.8777 22.4861 12.375 21.85 12.375V10.125V9V8.34258C21.85 7.74492 21.6092 7.17188 21.178 6.75L18.4 4.03242C17.9688 3.61055 17.383 3.375 16.772 3.375H14.95V1.6875C14.95 0.755859 14.1773 0 13.225 0H1.725ZM14.95 5.625H16.772L19.55 8.34258V9H14.95V5.625ZM7.475 14.625C7.475 15.5566 6.70234 16.3125 5.75 16.3125C4.79766 16.3125 4.025 15.5566 4.025 14.625C4.025 13.6934 4.79766 12.9375 5.75 12.9375C6.70234 12.9375 7.475 13.6934 7.475 14.625ZM17.25 16.3125C16.2977 16.3125 15.525 15.5566 15.525 14.625C15.525 13.6934 16.2977 12.9375 17.25 12.9375C18.2023 12.9375 18.975 13.6934 18.975 14.625C18.975 15.5566 18.2023 16.3125 17.25 16.3125Z" fill="#949494"/>
                        </svg>
                        </div>
                        <div class="p-d-title-container">
                            <h2 class="p-d-title-date">18</h2>
                            <h2 class="p-d-title-month">сентября</h2>
                        </div>
                    </div>
                </div>
                <div class="product-quantity-container">
                    <svg width="10" height="10" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M1.1317 0.591518L0 2.85714H4.64286V0H2.09152C1.68527 0 1.31473 0.229911 1.1317 0.591518ZM5.35714 2.85714H10L8.8683 0.591518C8.68527 0.229911 8.31473 0 7.90848 0H5.35714V2.85714ZM10 3.57143H0V8.57143C0 9.35938 0.640625 10 1.42857 10H8.57143C9.35938 10 10 9.35938 10 8.57143V3.57143Z" fill="#1178FF"/>
                    </svg>
                    <h2>В наличии {{data?.productRow[0].quantity}} шт.</h2>
                </div>
                <ul class="product-page-btns-list">
                    <li class="product-page-btns-item basket">
                        <h2>В корзину</h2>
                        <svg width="18" height="14" viewBox="0 0 18 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M17.625 5.00001H15.3468L11.3214 0.26429C11.0532 -0.0513037 10.5799 -0.0896787 10.2642 0.178571C9.94866 0.446821 9.91028 0.920164 10.1786 1.23576L13.3782 5.00001H4.62184L7.82147 1.23573C8.08972 0.920133 8.05134 0.44679 7.73575 0.17854C7.42016 -0.08971 6.94681 -0.0513037 6.67856 0.264259L2.65316 5.00001H0.375C0.167906 5.00001 0 5.16791 0 5.37501V6.125C0 6.3321 0.167906 6.5 0.375 6.5H0.958344L1.82034 12.7063C1.92331 13.4479 2.55737 14 3.30606 14H14.6939C15.4426 14 16.0767 13.4479 16.1797 12.7063L17.0417 6.5H17.625C17.8321 6.5 18 6.3321 18 6.125V5.37501C18 5.16791 17.8321 5.00001 17.625 5.00001ZM14.6939 12.5H3.30606L2.47272 6.5H15.5273L14.6939 12.5ZM9.75 8.25V10.75C9.75 11.1642 9.41422 11.5 9 11.5C8.58578 11.5 8.25 11.1642 8.25 10.75V8.25C8.25 7.83579 8.58578 7.5 9 7.5C9.41422 7.5 9.75 7.83579 9.75 8.25ZM13.25 8.25V10.75C13.25 11.1642 12.9142 11.5 12.5 11.5C12.0858 11.5 11.75 11.1642 11.75 10.75V8.25C11.75 7.83579 12.0858 7.5 12.5 7.5C12.9142 7.5 13.25 7.83579 13.25 8.25ZM6.25 8.25V10.75C6.25 11.1642 5.91422 11.5 5.5 11.5C5.08578 11.5 4.75 11.1642 4.75 10.75V8.25C4.75 7.83579 5.08578 7.5 5.5 7.5C5.91422 7.5 6.25 7.83579 6.25 8.25Z" fill="white"/>
                        </svg>
                    </li>

                    <li class="product-page-btns-item wallet">
                        <h2>Купить сейчас</h2>
                        <svg width="16" height="14" viewBox="0 0 16 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M14 2.5V2C14 0.895313 13.1047 0 12 0H3C1.34312 0 0 1.34312 0 3V11C0 12.6569 1.34312 14 3 14H14C15.1047 14 16 13.1047 16 12V4.5C16 3.39531 15.1047 2.5 14 2.5ZM14.5 12C14.5 12.2756 14.2756 12.5 14 12.5H3C2.17281 12.5 1.5 11.8272 1.5 11V3C1.5 2.17281 2.17281 1.5 3 1.5H12C12.2756 1.5 12.5 1.72438 12.5 2V3H3.5C3.22375 3 3 3.22375 3 3.5C3 3.77625 3.22375 4 3.5 4H14C14.2756 4 14.5 4.22437 14.5 4.5V12ZM12 7C11.4478 7 11 7.44781 11 8C11 8.55219 11.4478 9 12 9C12.5522 9 13 8.55219 13 8C13 7.44781 12.5522 7 12 7Z" fill="white"/>
                        </svg>
                    </li>

                    <li class="product-page-btns-item favourite">
                        <h2>В избранное</h2>
                        <svg width="17" height="14" viewBox="0 0 17 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M8.10156 1.33807L8.47012 1.72176L8.86856 1.3387C9.98086 0.294734 11.5215 -0.180408 13.0355 0.0622792C15.3232 0.429347 17 2.33567 17 4.5707V4.75615C17 6.08309 16.4289 7.35248 15.4195 8.25737L9.41973 13.6515C9.1707 13.8753 8.84199 14 8.5 14C8.15801 14 7.8293 13.8753 7.58027 13.6515L1.58014 8.25737C0.57209 7.35248 0 6.08309 0 4.75615V4.5707C0 2.33567 1.67742 0.429347 3.96445 0.0622792C5.44863 -0.180408 7.01914 0.294734 8.10156 1.33807C8.10156 1.33838 8.07168 1.33807 8.10156 1.33807ZM8.47012 3.89283L6.97598 2.39642C6.25547 1.73071 5.23281 1.4148 4.22676 1.57596C2.70772 1.81992 1.59375 3.08708 1.59375 4.5707V4.75615C1.59375 5.65783 1.98256 6.52114 2.66754 7.13506L8.5 12.3789L14.3338 7.13506C15.0178 6.52114 15.4062 5.65783 15.4062 4.75615V4.5707C15.4062 3.08708 14.2906 1.81992 12.7732 1.57596C11.7672 1.4148 10.7445 1.73071 10.024 2.39642L8.47012 3.89283Z" fill="white"/>
                        </svg>
                    </li>
                </ul>
            </div>
        </div>
        </div>
    </div>
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
    & img{
        width:360px;
        height:450px;
    }
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
    /* height:217px */
    align-content: start;
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
    border-radius: 9px 2px 2px 9px;
    display: flex;
    align-items: center;
    justify-content: center;
    width:31px;
    height:30px;
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
    height:31px;
    width:105px;
    display: flex;
    align-items: center;
    column-gap: 5px;
}
.p-d-title-date{
    line-height: 10px;
}
.p-d-title-month{
    line-height: 11px;
}
.p-d-title-container{
    width:64px;
    display: grid;
    & h2{
    color:white;
    font-size: 14px;
    }
}

.product-quantity-container{
    padding:10px;
    display: flex;
    column-gap: 3px;
    align-items: center;
    border:1px solid #1178FF;
    border-radius: 9px;
    height:19px;
    width:180px;
    margin-top: 11px;
    & h2{
        font-size: 16px;
    }
}

.product-page-btns-list{
    display: grid;
    row-gap: 15px;
    margin-top: 11px;
}
.product-page-btns-item{
    width:100%;
    height:45px;
    display: flex;
    column-gap: 5px;
    align-items: center;
    justify-content: center;
    border-radius: 9px;
    color:white;
    cursor: pointer;
    & h2{
        font-size: 18px;
    }
}
.product-page-btns-item.basket{
    background-color: #1178FF;
}
.product-page-btns-item.wallet{
    background-color: #11F65D;
}
.product-page-btns-item.favourite{
    background-color: #6911F6;
}
.product-page-rating-container{
    display: flex;
    column-gap: 5px;
    align-items: center;
    margin-top: 5px;
}
.p-p-rating{
    font-size: 15px;
}
.p-p-reviews{
    font-size: 14px;
    color:#949494;
}
.product-page-title{
    font-size: 24px;
}

.product-page-characteristics-container{
    display: grid;
    row-gap: 5px;
    margin-top: 15px;
    & h2{
        font-size: 16px;
    }
}
.product-page-description-container{
    display: grid;
    margin-top: 5px;
    row-gap: 3px;
    & h2{
        font-size: 24px;
    }
}

.product-page-shop-container{
    display: flex;
    padding:15px;
    align-items: center;
    justify-content: space-between;
    background-color: white;
    border-radius: 9px;
    margin-top: 35px;
    box-shadow: 0px 0px 10px 3px rgba(34, 60, 80, 0.2);
}
.p-p-shop-img{
    width: 35px;;
    height:35px;
    border-radius: 51px;
    background-color: gray
}
.p-p-shop-title{
    color:#949494;
    font-size: 14px;
}
.p-p-shop-name{
    font-size: 20px;
}
.p-p-shop-info-container{
    display: flex;
    align-items: center;
    column-gap: 10px;
}
.p-p-shop-rating{
    font-size: 16px;
}
.p-p-shop-rating-container{
    display: flex;
    column-gap: 5px;
    align-items: center;
}
</style>