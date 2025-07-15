<script setup lang="ts">
const hoverRating = ref();
const rating = ref();
const comment = ref();
const errorMessage = ref();
const {addReview} = useReviews();
function selectStarRating(star:number){
    rating.value = star
}

function handleAddReview(){
	if(rating.value < 1 || rating.value > 5){
		errorMessage.value = 'Поставьте свою оценку'
	}
	else if(comment.value.length > 10 && (rating.value >= 1 || rating.value <= 5)){
		addReview(props.productId, rating.value, comment.value, props.sellerName);
		errorMessage.value = 'Отзыв был успешно добавлен';
	}
	else if(comment.value.length < 10){
		errorMessage.value = 'Комментарий должен состоять минимум из 10 символов';
	}
	else{
		errorMessage.value = 'Ошибка при публикации отзыва'
	}
}

const props = defineProps<{
    productId:number,
    sellerName:string
}>()
</script>
<template>
	<div class="addReview-container border border-gray-300 rounded-xl">
					<div class="addReview-1c">
						<NuxtImg :src="'https://i.pinimg.com/736x/11/1c/7f/111c7f70a48c84f490574de35e7cb4c5.jpg'" class="reviewAvatar"></NuxtImg>
						<div class="grid text-base font-medium">
							<h2>Оставить отзыв</h2>
							<div class="reviewRating-container">
								<div class="star"
								v-for="star in 5"
								:key="star"
								@mouseover="hoverRating = star"
								@mouseleave="hoverRating = 0"
								@click="selectStarRating(star)"
								>
									<svg width="21" height="19" viewBox="0 0 21 19" fill="none" xmlns="http://www.w3.org/2000/svg">
									<path d="M16.2362 19C15.9867 19 15.7384 18.9276 15.5247 18.7833L10.5001 15.3755L5.47559 18.7833C5.26741 18.9249 5.01724 19.0007 4.76079 18.9999C4.50434 18.9991 4.25473 18.9216 4.04759 18.7786C3.84026 18.6364 3.68562 18.4361 3.60567 18.206C3.52572 17.9759 3.52453 17.7278 3.60227 17.497L5.4762 11.7772L0.496751 8.45874C0.290384 8.3147 0.137124 8.11295 0.0586496 7.88201C-0.0198251 7.65108 -0.0195423 7.40266 0.0594582 7.17189C0.139082 6.94168 0.293191 6.74095 0.500005 6.59809C0.70682 6.45522 0.955879 6.37743 1.21198 6.37572L7.37917 6.36696L9.34266 0.78907C9.42369 0.559287 9.57911 0.359436 9.78689 0.21782C9.99468 0.076204 10.2443 0 10.5004 0C10.7566 0 11.0062 0.076204 11.214 0.21782C11.4218 0.359436 11.5772 0.559287 11.6582 0.78907L13.5884 6.36696L19.787 6.37572C20.0434 6.37709 20.2929 6.45483 20.4999 6.59792C20.7069 6.741 20.861 6.94214 20.9403 7.17277C21.0195 7.40339 21.0199 7.65177 20.9414 7.88262C20.8629 8.11348 20.7094 8.31506 20.5029 8.45874L15.5234 11.7772L17.3974 17.497C17.4753 17.7277 17.4742 17.9758 17.3944 18.2059C17.3145 18.436 17.16 18.6364 16.9527 18.7786C16.7449 18.9227 16.4939 19.0003 16.2362 19Z" 
									:fill="(hoverRating >= star || rating >= star) ? '#FFAC33' : '#B0B0B0'"/>
									</svg>
								</div>
							</div>
						</div>
					</div>
					<div class="addReview-2c mt-5">
						<textarea v-model="comment" placeholder="Напишите свои ощущения о товаре"
						class="resize-none  outline-dashed"></textarea>
					</div>
					<h2 v-if="errorMessage">{{ errorMessage }}</h2>
					<div class="addReview-3c">
						<button @click.prevent="handleAddReview"
						:disabled="!comment || !rating"
						class="bg-lime-400 cursor-pointer  disabled:bg-gray-300 disabled:cursor-not-allowed">Оставить отзыв</button>
					</div>	
				</div>
</template>
<style>
.addReview-container{
	padding: 20px;
	max-width: 775px;
	box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
}

.reviewRating-container{
    .star{
        cursor: pointer;
        & svg path{
            transition: all .2s;
        }
    }
}

.addReview-1c{
	display: flex;
	column-gap: 15px;
	align-items: center;
}
.addReview-2c{
	& textarea{
	border:1px solid gray;
	border-radius: 9px;
	width:100%;
	padding:10px;
	font-size: 16px;
	outline: none;
	overflow-y: visible;
	min-height: 100px;
	transition: box-shadow .3s;
	&:focus{
		box-shadow: 0px 0px 8px 3px rgba(34, 60, 80, 0.2);
	}
	&:hover{
		box-shadow: 0px 0px 8px 3px rgba(34, 60, 80, 0.2);
	}
	}
}
.addReview-3c{
	display: flex;
	justify-content: end;
	height:50px;
	align-items: center;
	& button{
		padding:10px 15px;
		color:white;
		border-radius: 9px;
	}
}
</style>