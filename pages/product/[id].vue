<script setup lang="ts">
import { pluralize } from '~/entities/helpers/pluralize';
import type {responseProductPageInfo, responseProductPageReviews} from '../../types/productTypes'
import type {responseAllProductReviews} from '~/types/reviewsTypes';
    const route = useRoute();
    const productId = Number(route.params.id);
	const quantity = ref(1);
    const profileStore = useProfileStore()
	const isAuthenticated = profileStore.isAuthenticated
	const isAuthModal = ref(false);
	const { addToCart } = useCart();
	const {getAllProductReviews} = useReviews();
	const {addToFavourite} = useFavourite();
    async function fetchProductPageInfo(){
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
	}

	async function fetchProductReviews(){
		try{
			const reviewsData = await $fetch<responseProductPageReviews>(`http://localhost:8000/api/product/${productId}/reviews`,{
				method:'GET',
			});
			if(reviewsData?.reviewRows){
				return reviewsData;
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

	async function handleAddProduct(productId: number) {
	console.log('productId: ', productId)
	console.log(isAuthenticated);
	// if(isAuthenticated === true){
	// 	isAuthModal.value = false;
	// 	// addToCart(productId);
	// }
	// else{
	// 	isAuthModal.value = true;
	// }
	// if( data.value?.productRow?.sellerId){
	// 	addToCart(productId, data.value?.productRow?.);
	// }
}

    const {data, pending} = useAsyncData<responseProductPageInfo | undefined>(
        `product-${productId}`,
		fetchProductPageInfo
	);

        const {data:reviewRows} = useAsyncData<responseAllProductReviews>(
        `product/${productId}/reviews`,
        ()=>getAllProductReviews(productId)
        )
		//
		const updateQuantity = (delta: number) => {
  const newQuantity = quantity.value + delta;
  const availableQuantity = data.value?.productRow?.quantity || 0;
  
  if (newQuantity >= 1 && newQuantity <= availableQuantity) {
    quantity.value = newQuantity;
  }
};
</script>
<template>
	<div v-if="data" class="product-page">
		<div class="container">
			<!-- Breadcrumb -->
			<div class="breadcrumb">
				<span class="breadcrumb-text"
					>Категория: {{data.productRow?.productCategory}}</span
				>
			</div>

			<!-- Main Product Section -->
			<div class="product-card">
				<div class="product-layout">
					<!-- Image Gallery Section -->
					<div class="image-section">
						<div class="image-gallery">
							<!-- Thumbnail Images -->
							<div class="thumbnails">
								<button class="thumbnail">
									<img
										:src="data.productRow?.imageUrl"
										alt="Product view"
									/>
								</button>
							</div>

							<!-- Main Image -->
							<div class="main-image">
								<img
									:src="data.productRow?.imageUrl"
									:alt="data?.productRow?.name"
								/>
							</div>
						</div>
					</div>

					<!-- Product Information Section -->
					<div class="info-section">
						<div class="product-header">
							<h1 class="product-title">
								{{ data?.productRow?.name }}
							</h1>

							<!-- Rating -->
							<div class="rating-container">
								<div class="rating">
									<svg
										width="16"
										height="15"
										viewBox="0 0 15 14"
										fill="none"
									>
										<path
											d="M11.5973 14C11.419 14 11.2417 13.9466 11.089 13.8403L7.50009 11.3293L3.91113 13.8403C3.76244 13.9447 3.58374 14.0005 3.40056 13.9999C3.21738 13.9993 3.03909 13.9422 2.89114 13.8369C2.74305 13.7321 2.63259 13.5845 2.57548 13.4149C2.51837 13.2454 2.51752 13.0626 2.57305 12.8925L3.91157 8.67793L0.354822 6.23275C0.207417 6.12662 0.0979459 5.97796 0.0418925 5.8078C-0.0141608 5.63764 -0.0139588 5.45459 0.0424702 5.28455C0.0993442 5.11492 0.209422 4.96702 0.357147 4.86175C0.504871 4.75648 0.682771 4.69916 0.865703 4.6979L5.27083 4.69144L6.67333 0.58142C6.73121 0.412106 6.84222 0.264848 6.99064 0.160499C7.13906 0.0561503 7.31737 0 7.50031 0C7.68326 0 7.86156 0.0561503 8.00998 0.160499C8.1584 0.264848 8.26942 0.412106 8.32729 0.58142L9.70597 4.69144L14.1336 4.6979C14.3167 4.69891 14.4949 4.75619 14.6428 4.86162C14.7907 4.96705 14.9007 5.11526 14.9573 5.2852C15.0139 5.45513 15.0142 5.63815 14.9581 5.80825C14.9021 5.97835 14.7925 6.12689 14.6449 6.23275L11.0882 8.67793L12.4267 12.8925C12.4823 13.0625 12.4816 13.2453 12.4246 13.4149C12.3675 13.5844 12.2571 13.7321 12.109 13.8369C11.9606 13.9431 11.7813 14.0002 11.5973 14Z"
											fill="#FFAC33"
										/>
									</svg>
									<span class="rating-score">{{ data?.productRow?.averageRating }}</span>
								</div>
								<a class="reviews-count"
								  href="#reviews-section">{{ pluralize(data?.productRow?.reviewCount, 'отзыв') }}</a>
							</div>
						</div>

						<!-- Product Details -->
						<div class="product-details">
							<div class="detail-row">
								<span class="detail-label">Артикул:</span>
								<span class="detail-value">{{
									data?.productRow?.productId
								}}</span>
							</div>
							<div class="detail-row">
								<span class="detail-label"
									>Гарантийный срок:</span
								>
								<span class="detail-value">1 год</span>
							</div>
						</div>

						<!-- Description -->
						<div class="description-section">
							<h3 class="description-title">Описание:</h3>
							<p class="description-text">
								{{ data?.productRow?.description }}
							</p>
						</div>

						<!-- Seller Information -->
						<div class="seller-card">
							<div class="seller-info">
								<div class="seller-avatar">
									<span>K</span>
								</div>
								<div class="seller-details">
									<h4 class="seller-name">KlanShop</h4>
									<p class="seller-title">Продавец</p>
								</div>
							</div>
							<div class="seller-rating">
								<svg
									width="16"
									height="15"
									viewBox="0 0 15 14"
									fill="none"
								>
									<path
										d="M11.5973 14C11.419 14 11.2417 13.9466 11.089 13.8403L7.50009 11.3293L3.91113 13.8403C3.76244 13.9447 3.58374 14.0005 3.40056 13.9999C3.21738 13.9993 3.03909 13.9422 2.89114 13.8369C2.74305 13.7321 2.63259 13.5845 2.57548 13.4149C2.51837 13.2454 2.51752 13.0626 2.57305 12.8925L3.91157 8.67793L0.354822 6.23275C0.207417 6.12662 0.0979459 5.97796 0.0418925 5.8078C-0.0141608 5.63764 -0.0139588 5.45459 0.0424702 5.28455C0.0993442 5.11492 0.209422 4.96702 0.357147 4.86175C0.504871 4.75648 0.682771 4.69916 0.865703 4.6979L5.27083 4.69144L6.67333 0.58142C6.73121 0.412106 6.84222 0.264848 6.99064 0.160499C7.13906 0.0561503 7.31737 0 7.50031 0C7.68326 0 7.86156 0.0561503 8.00998 0.160499C8.1584 0.264848 8.26942 0.412106 8.32729 0.58142L9.70597 4.69144L14.1336 4.6979C14.3167 4.69891 14.4949 4.75619 14.6428 4.86162C14.7907 4.96705 14.9007 5.11526 14.9573 5.2852C15.0139 5.45513 15.0142 5.63815 14.9581 5.80825C14.9021 5.97835 14.7925 6.12689 14.6449 6.23275L11.0882 8.67793L12.4267 12.8925C12.4823 13.0625 12.4816 13.2453 12.4246 13.4149C12.3675 13.5844 12.2571 13.7321 12.109 13.8369C11.9606 13.9431 11.7813 14.0002 11.5973 14Z"
										fill="#FFAC33"
									/>
								</svg>
								<span class="seller-rating-score">{{ pluralize(data?.productRow?.totalSellerReviews, 'отзыв') }}</span>
							</div>
						</div>
					</div>

					<!-- Purchase Section -->
					<div class="purchase-section">
						<div class="purchase-card">
							<!-- Price and Delivery -->
							<div class="price-delivery">
								<div class="price-tag">
									{{ data?.productRow?.price }} ₽
								</div>
								<div class="delivery-info">
									<div class="delivery-icon">
										<svg
											width="20"
											height="16"
											viewBox="0 0 23 18"
											fill="none"
										>
											<path
												d="M1.725 0C0.772656 0 0 0.755859 0 1.6875V12.9375C0 13.8691 0.772656 14.625 1.725 14.625H2.3C2.3 16.4883 3.84531 18 5.75 18C7.65469 18 9.2 16.4883 9.2 14.625H13.8C13.8 16.4883 15.3453 18 17.25 18C19.1547 18 20.7 16.4883 20.7 14.625H21.85C22.4861 14.625 23 14.1223 23 13.5C23 12.8777 22.4861 12.375 21.85 12.375V10.125V9V8.34258C21.85 7.74492 21.6092 7.17188 21.178 6.75L18.4 4.03242C17.9688 3.61055 17.383 3.375 16.772 3.375H14.95V1.6875C14.95 0.755859 14.1773 0 13.225 0H1.725ZM14.95 5.625H16.772L19.55 8.34258V9H14.95V5.625ZM7.475 14.625C7.475 15.5566 6.70234 16.3125 5.75 16.3125C4.79766 16.3125 4.025 15.5566 4.025 14.625C4.025 13.6934 4.79766 12.9375 5.75 12.9375C6.70234 12.9375 7.475 13.6934 7.475 14.625ZM17.25 16.3125C16.2977 16.3125 15.525 15.5566 15.525 14.625C15.525 13.6934 16.2977 12.9375 17.25 12.9375C18.2023 12.9375 18.975 13.6934 18.975 14.625C18.975 15.5566 18.2023 16.3125 17.25 16.3125Z"
												fill="currentColor"
											/>
										</svg>
									</div>
									<div class="delivery-date">
										<span class="date">18</span>
										<span class="month">сентября</span>
									</div>
								</div>
							</div>

							<!-- Stock Info -->
							<div class="stock-info">
								<svg
									width="12"
									height="12"
									viewBox="0 0 10 10"
									fill="none"
								>
									<path
										d="M1.1317 0.591518L0 2.85714H4.64286V0H2.09152C1.68527 0 1.31473 0.229911 1.1317 0.591518ZM5.35714 2.85714H10L8.8683 0.591518C8.68527 0.229911 8.31473 0 7.90848 0H5.35714V2.85714ZM10 3.57143H0V8.57143C0 9.35938 0.640625 10 1.42857 10H8.57143C9.35938 10 10 9.35938 10 8.57143V3.57143Z"
										fill="currentColor"
									/>
								</svg>
								<span
									>В наличии
									{{ data?.productRow?.quantity }}
									шт.</span
								>
							</div>

							<!-- Quantity Selector -->
							<div class="quantity-section">
								<label class="quantity-label"
									>Количество:</label
								>
								<div class="quantity-controls">
									<button
										@click="updateQuantity(-1)"
										:disabled="quantity <= 1"
										class="quantity-btn"
									>
										−
									</button>
									<span class="quantity-display">{{
										quantity
									}}</span>
									<button
										@click="updateQuantity(1)"
										:disabled="
											quantity >=
											(data?.productRow?.quantity || 0)
										"
										class="quantity-btn"
									>
										+
									</button>
								</div>
							</div>

							<!-- Action Buttons -->
							<div class="action-buttons">
								<button class="btn btn-cart" 
								@click.prevent="handleAddProduct(data?.productRow?.productId)">
									<svg
										width="18"
										height="14"
										viewBox="0 0 18 14"
										fill="none"
									>
										<path
											d="M17.625 5.00001H15.3468L11.3214 0.26429C11.0532 -0.0513037 10.5799 -0.0896787 10.2642 0.178571C9.94866 0.446821 9.91028 0.920164 10.1786 1.23576L13.3782 5.00001H4.62184L7.82147 1.23573C8.08972 0.920133 8.05134 0.44679 7.73575 0.17854C7.42016 -0.08971 6.94681 -0.0513037 6.67856 0.264259L2.65316 5.00001H0.375C0.167906 5.00001 0 5.16791 0 5.37501V6.125C0 6.3321 0.167906 6.5 0.375 6.5H0.958344L1.82034 12.7063C1.92331 13.4479 2.55737 14 3.30606 14H14.6939C15.4426 14 16.0767 13.4479 16.1797 12.7063L17.0417 6.5H17.625C17.8321 6.5 18 6.3321 18 6.125V5.37501C18 5.16791 17.8321 5.00001 17.625 5.00001ZM14.6939 12.5H3.30606L2.47272 6.5H15.5273L14.6939 12.5ZM9.75 8.25V10.75C9.75 11.1642 9.41422 11.5 9 11.5C8.58578 11.5 8.25 11.1642 8.25 10.75V8.25C8.25 7.83579 8.58578 7.5 9 7.5C9.41422 7.5 9.75 7.83579 9.75 8.25ZM13.25 8.25V10.75C13.25 11.1642 12.9142 11.5 12.5 11.5C12.0858 11.5 11.75 11.1642 11.75 10.75V8.25C11.75 7.83579 12.0858 7.5 12.5 7.5C12.9142 7.5 13.25 7.83579 13.25 8.25ZM6.25 8.25V10.75C6.25 11.1642 5.91422 11.5 5.5 11.5C5.08578 11.5 4.75 11.1642 4.75 10.75V8.25C4.25 7.83579 5.08578 7.5 5.5 7.5C5.91422 7.5 6.25 7.83579 6.25 8.25Z"
											fill="currentColor"
										/>
									</svg>
									<span>В корзину</span>
								</button>

								<button class="btn btn-buy">
									<svg
										width="16"
										height="14"
										viewBox="0 0 16 14"
										fill="none"
									>
										<path
											d="M14 2.5V2C14 0.895313 13.1047 0 12 0H3C1.34312 0 0 1.34312 0 3V11C0 12.6569 1.34312 14 3 14H14C15.1047 14 16 13.1047 16 12V4.5C16 3.39531 15.1047 2.5 14 2.5ZM14.5 12C14.5 12.2756 14.2756 12.5 14 12.5H3C2.17281 12.5 1.5 11.8272 1.5 11V3C1.5 2.17281 2.17281 1.5 3 1.5H12C12.2756 1.5 12.5 1.72438 12.5 2V3H3.5C3.22375 3 3 3.22375 3 3.5C3 3.77625 3.22375 4 3.5 4H14C14.2756 4 14.5 4.22437 14.5 4.5V12ZM12 7C11.4478 7 11 7.44781 11 8C11 8.55219 11.4478 9 12 9C12.5522 9 13 8.55219 13 8C13 7.44781 12.5522 7 12 7Z"
											fill="currentColor"
										/>
									</svg>
									<span>Купить сейчас</span>
								</button>

								<button class="btn btn-favorite" @click.prevent="addToFavourite(data?.productRow.productId, data?.productRow.sellerName)">
									<svg
										width="17"
										height="14"
										viewBox="0 0 17 14"
										fill="none"
									>
										<path
											d="M8.10156 1.33807L8.47012 1.72176L8.86856 1.3387C9.98086 0.294734 11.5215 -0.180408 13.0355 0.0622792C15.3232 0.429347 17 2.33567 17 4.5707V4.75615C17 6.08309 16.4289 7.35248 15.4195 8.25737L9.41973 13.6515C9.1707 13.8753 8.84199 14 8.5 14C8.15801 14 7.8293 13.8753 7.58027 13.6515L1.58014 8.25737C0.57209 7.35248 0 6.08309 0 4.75615V4.5707C0 2.33567 1.67742 0.429347 3.96445 0.0622792C5.44863 -0.180408 7.01914 0.294734 8.10156 1.33807C8.10156 1.33838 8.07168 1.33807 8.10156 1.33807ZM8.47012 3.89283L6.97598 2.39642C6.25547 1.73071 5.23281 1.4148 4.22676 1.57596C2.70772 1.81992 1.59375 3.08708 1.59375 4.5707V4.75615C1.59375 5.65783 1.98256 6.52114 2.66754 7.13506L8.5 12.3789L14.3338 7.13506C15.0178 6.52114 15.4062 5.65783 15.4062 4.75615V4.5707C15.4062 3.08708 14.2906 1.81992 12.7732 1.57596C11.7672 1.4148 10.7445 1.73071 10.024 2.39642L8.47012 3.89283Z"
											fill="currentColor"
										/>
									</svg>
									<span>В избранное</span>
								</button>
							</div>

							<!-- Additional Features -->
							<div class="features">
								<div class="feature-item">
									<div class="feature-icon">✓</div>
									<span>Быстрая доставка</span>
								</div>
								<div class="feature-item">
									<div class="feature-icon">✓</div>
									<span>Гарантия качества</span>
								</div>
								<div class="feature-item">
									<div class="feature-icon">✓</div>
									<span>Возврат в течение 14 дней</span>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>

			<div class="reviews-container" id="reviews-section">
				<h2 class="review-title-h2 text-2xl">Отзывы товара: ({{ reviewRows?.reviewRows?.length ?? 0 }})</h2>
				
				<div class="p-2.5">
				<add-review-card
				:product-id="productId"
				:seller-name="data?.productRow?.sellerName"
				></add-review-card>
				</div>

				<ul class="review-list grid p-2.5 gap-5">
				<review-card
				v-for="(reviewCard) in reviewRows?.reviewRows"
				:key="reviewCard?.reviewId"
				:reviewCard
				></review-card>
				</ul>
			</div>
		</div>
	</div>
	<AuthModal :is-open="isAuthModal" @close="isAuthModal = false"></AuthModal>
</template>

<style scoped>
.product-page {
	min-height: 100vh;
	background: linear-gradient(135deg, #f8fffe 0%, #f0fdf4 100%);
	padding: 2rem 1rem;
}

.container {
	max-width: 1400px;
	margin: 0 auto;
}

.breadcrumb {
	margin-bottom: 1.5rem;
}

.breadcrumb-text {
	color: #6b7280;
	font-size: 0.875rem;
	font-weight: 500;
}

.product-card {
	background: white;
	border-radius: 24px;
	box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1),
		0 10px 10px -5px rgba(0, 0, 0, 0.04);
	overflow: hidden;
	padding: 2rem;
}

.product-layout {
	display: grid;
	grid-template-columns: 1fr 1fr 400px;
	gap: 3rem;
	align-items: start;
}

/* Image Section */
.image-section {
	position: relative;
}

.image-gallery {
	display: flex;
	gap: 1.5rem;
}

.thumbnails {
	display: flex;
	flex-direction: column;
	gap: 1rem;
}

.thumbnail {
	width: 80px;
	height: 80px;
	border-radius: 12px;
	overflow: hidden;
	border: 3px solid transparent;
	cursor: pointer;
	transition: all 0.3s ease;
	background: none;
	padding: 0;
}

.thumbnail:hover {
	border-color: #84cc16;
	transform: scale(1.05);
}

.thumbnail.active {
	border-color: #65a30d;
	box-shadow: 0 0 0 2px rgba(132, 204, 22, 0.2);
}

.thumbnail img {
	width: 100%;
	height: 100%;
	object-fit: cover;
}

.main-image {
	flex: 1;
	position: relative;
	border-radius: 20px;
	overflow: hidden;
	background: #f9fafb;
	aspect-ratio: 1;
}

.main-image img {
	width: 100%;
	height: 100%;
	object-fit: cover;
	transition: transform 0.3s ease;
}

.image-overlay {
	position: absolute;
	top: 1rem;
	right: 1rem;
	background: rgba(255, 255, 255, 0.9);
	backdrop-filter: blur(10px);
	border-radius: 50%;
	width: 48px;
	height: 48px;
	display: flex;
	align-items: center;
	justify-content: center;
	opacity: 0;
	transition: opacity 0.3s ease;
}

.main-image:hover .image-overlay {
	opacity: 1;
}

.zoom-indicator {
	font-size: 1.25rem;
}

/* Info Section */
.info-section {
	padding: 1rem 0;
}

.product-header {
	margin-bottom: 2rem;
}

.product-title {
	font-size: 2rem;
	font-weight: 700;
	color: #111827;
	margin-bottom: 1rem;
	line-height: 1.2;
}

.rating-container {
	display: flex;
	align-items: center;
	gap: 1rem;
}

.rating {
	display: flex;
	align-items: center;
	gap: 0.5rem;
}

.rating-score {
	font-weight: 600;
	color: #111827;
	font-size: 1.125rem;
}

.reviews-count {
	color: #6b7280;
	font-size: 0.875rem;
	font-weight: 500;
	&:hover{
		color:oklch(48.8% 0.243 264.376)	
	}
}

.product-details {
	background: #f9fafb;
	border-radius: 16px;
	padding: 1.5rem;
	margin-bottom: 2rem;
}

.detail-row {
	display: flex;
	justify-content: space-between;
	align-items: center;
	padding: 0.75rem 0;
	border-bottom: 1px solid #e5e7eb;
}

.detail-row:last-child {
	border-bottom: none;
}

.detail-label {
	color: #6b7280;
	font-weight: 500;
}

.detail-value {
	color: #111827;
	font-weight: 600;
}

.description-section {
	margin-bottom: 2rem;
}

.description-title {
	font-size: 1.25rem;
	font-weight: 600;
	color: #111827;
	margin-bottom: 0.75rem;
}

.description-text {
	color: #4b5563;
	line-height: 1.6;
	font-size: 1rem;
}

.seller-card {
	background: linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%);
	border: 2px solid #bbf7d0;
	border-radius: 16px;
	padding: 1.5rem;
	display: flex;
	justify-content: space-between;
	align-items: center;
}

.seller-info {
	display: flex;
	align-items: center;
	gap: 1rem;
}

.seller-avatar {
	width: 48px;
	height: 48px;
	background: linear-gradient(135deg, #84cc16 0%, #65a30d 100%);
	border-radius: 50%;
	display: flex;
	align-items: center;
	justify-content: center;
	color: white;
	font-weight: 700;
	font-size: 1.25rem;
}

.seller-name {
	font-size: 1.125rem;
	font-weight: 600;
	color: #111827;
	margin: 0;
}

.seller-title {
	color: #6b7280;
	font-size: 0.875rem;
	margin: 0;
}

.seller-rating {
	display: flex;
	align-items: center;
	gap: 0.5rem;
}

.seller-rating-score {
	font-weight: 600;
	color: #111827;
}

/* Purchase Section */
.purchase-section {
	position: sticky;
	top: 2rem;
}

.purchase-card {
	background: white;
	border: 2px solid #e5e7eb;
	border-radius: 20px;
	padding: 2rem;
	box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
}

.price-delivery {
	display: flex;
	align-items: center;
	gap: 1rem;
	margin-bottom: 1.5rem;
}

.price-tag {
	background: linear-gradient(135deg, #84cc16 0%, #65a30d 100%);
	color: white;
	font-size: 1.5rem;
	font-weight: 700;
	padding: 1rem 1.5rem;
	border-radius: 16px;
	box-shadow: 0 4px 6px -1px rgba(132, 204, 22, 0.3);
}

.delivery-info {
	background: #3b82f6;
	border-radius: 12px;
	display: flex;
	align-items: center;
	overflow: hidden;
	box-shadow: 0 4px 6px -1px rgba(59, 130, 246, 0.3);
}

.delivery-icon {
	background: white;
	padding: 0.75rem;
	color: #374151;
}

.delivery-date {
	padding: 0.75rem 1rem;
	color: white;
	display: flex;
	flex-direction: column;
	align-items: center;
}

.date {
	font-size: 1rem;
	font-weight: 700;
	line-height: 1;
}

.month {
	font-size: 0.75rem;
	line-height: 1;
}

.stock-info {
	background: #dbeafe;
	border: 2px solid #93c5fd;
	border-radius: 12px;
	padding: 1rem;
	display: flex;
	align-items: center;
	gap: 0.75rem;
	margin-bottom: 1.5rem;
	color: #1e40af;
	font-weight: 600;
}

.quantity-section {
	margin-bottom: 2rem;
}

.quantity-label {
	display: block;
	font-weight: 600;
	color: #374151;
	margin-bottom: 0.75rem;
}

.quantity-controls {
	display: flex;
	align-items: center;
	gap: 1rem;
	justify-content: center;
}

.quantity-btn {
	width: 40px;
	height: 40px;
	border: 2px solid #d1d5db;
	border-radius: 8px;
	background: white;
	color: #374151;
	font-size: 1.25rem;
	font-weight: 600;
	cursor: pointer;
	transition: all 0.2s ease;
	display: flex;
	align-items: center;
	justify-content: center;
}

.quantity-btn:hover:not(:disabled) {
	border-color: #84cc16;
	color: #65a30d;
}

.quantity-btn:disabled {
	opacity: 0.5;
	cursor: not-allowed;
}

.quantity-display {
	font-size: 1.25rem;
	font-weight: 600;
	color: #111827;
	min-width: 3rem;
	text-align: center;
}

.action-buttons {
	display: flex;
	flex-direction: column;
	gap: 1rem;
	margin-bottom: 2rem;
}

.btn {
	display: flex;
	align-items: center;
	justify-content: center;
	gap: 0.75rem;
	padding: 1rem 1.5rem;
	border-radius: 12px;
	font-weight: 600;
	font-size: 1rem;
	border: none;
	cursor: pointer;
	transition: all 0.3s ease;
	box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
}

.btn:hover {
	transform: translateY(-2px);
	box-shadow: 0 8px 15px -3px rgba(0, 0, 0, 0.2);
}

.btn-cart {
	background: #3b82f6;
	color: white;
}

.btn-cart:hover {
	background: #2563eb;
}

.btn-buy {
	background: linear-gradient(135deg, #84cc16 0%, #65a30d 100%);
	color: white;
}

.btn-buy:hover {
	background: linear-gradient(135deg, #65a30d 0%, #4d7c0f 100%);
}

.btn-favorite {
	background: #8b5cf6;
	color: white;
}

.btn-favorite:hover {
	background: #7c3aed;
}

.features {
	border-top: 1px solid #e5e7eb;
	padding-top: 1.5rem;
}

.review-list{

}

.feature-item {
	display: flex;
	align-items: center;
	gap: 0.75rem;
	margin-bottom: 0.75rem;
	color: #4b5563;
	font-size: 0.875rem;
}

.feature-icon {
	width: 20px;
	height: 20px;
	background: #84cc16;
	color: white;
	border-radius: 50%;
	display: flex;
	align-items: center;
	justify-content: center;
	font-size: 0.75rem;
	font-weight: 700;
}

.reviews-container{
	width:100%;
	background-color: white;
	border-radius: 32px;
	margin-top: 40px;
	box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
}

.review-title-h2{
	max-width: 775px;
	font-weight: 700;
	padding:20px 35px;
	border-bottom: 2px solid #80feac;
}


/* Responsive Design */
@media (max-width: 1200px) {
	.product-layout {
		grid-template-columns: 1fr 1fr;
		gap: 2rem;
	}

	.purchase-section {
		grid-column: 1 / -1;
		position: static;
	}

	.purchase-card {
		max-width: 500px;
		margin: 0 auto;
	}
}

@media (max-width: 768px) {
	.product-layout {
		grid-template-columns: 1fr;
		gap: 1.5rem;
	}

	.image-gallery {
		flex-direction: column-reverse;
	}

	.thumbnails {
		flex-direction: row;
		justify-content: center;
	}

	.thumbnail {
		width: 60px;
		height: 60px;
	}

	.product-title {
		font-size: 1.5rem;
	}

	.price-delivery {
		flex-direction: column;
		align-items: stretch;
		gap: 1rem;
	}
}
</style>
