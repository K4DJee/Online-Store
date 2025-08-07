<template>
    <Teleport to="body">
        <Transition
        appear
		enter-active-class="transition-opacity duration-200"
		enter-from-class="opacity-0"
		enter-to-class="opacity-100"
		leave-active-class="transition-opacity duration-200"
		leave-from-class="opacity-100"
		leave-to-class="opacity-0"
    >
        <div
        @click="
				$event =>
					$event.target === $event.currentTarget && $emit('close')
			"
        v-if="props.show"
        class="modal-overlay backdrop-blur-xs bg-black/25 transition-all">
            <div class="modal-container bg-white w-[450px] rounded-2xl border-gray-300 border p-10">
                <div class="flex justify-center w-full">
                    <div class="changeRewiew-svg-container flex justify-center items-center rounded-[52px] h-[45px] w-[45px] bg-lime-50">
                        <svg width="118" height="115" viewBox="0 0 118 115" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M47.7676 8C50.9441 8 53.5 10.5678 53.5 13.7324C53.4999 16.9089 50.944 19.4639 47.7676 19.4639H21.0176C15.7418 19.464 11.464 23.7395 11.4639 29.0176V93.9824C11.464 99.2605 15.7418 103.536 21.0176 103.536H85.9824C91.2605 103.536 95.536 99.2605 95.5361 93.9824V67.2324C95.5361 64.056 98.0911 61.5001 101.268 61.5C104.444 61.5 107 64.0559 107 67.2324V93.9824C107 105.59 97.5898 115 85.9824 115H21.0176C9.41021 115 0.000151221 105.59 0 93.9824V29.0176C0.000150696 17.4102 9.41021 8.00015 21.0176 8H47.7676ZM99.8672 0C102.72 9.85007e-05 106.236 1.08701 108.411 3.25977L114.42 8.99609C118.773 13.3401 119.372 21.6844 115.021 26.0283L51.8145 87.8008L33.0225 88.9736C32.864 88.991 32.7087 89 32.5537 89C30.1038 88.9998 27.7441 86.9418 28.0225 84.4424L29.8252 65.7305L91.2285 3.25977C93.4053 1.08865 97.0147 0 99.8672 0ZM36.3135 67.6494L34.8721 82.8828L50.0127 80.8438L94.9531 35.8643L81.6152 21.9502L36.3135 67.6494ZM99.8672 5.5625C98.3783 5.5625 96.9776 6.14148 95.9258 7.19141L85.8379 17.2607L100.252 31.6484L110.34 21.5791C112.511 19.4098 112.511 15.8813 110.34 13.7119L103.808 7.19141C102.754 6.14158 101.356 5.5626 99.8672 5.5625Z" fill="#7CCF00"/>
                        </svg>
                    </div>
                </div>

                <h2 class="font-medium text-xl text-center mt-5">Изменить отзыв</h2>

                <h2 class="text-gray-500  mt-5 text-left text-sm">Оценка</h2>

                <div class="userReviewRating flex gap-0.5 justify-center" >
                            <div class="star cursor-pointer"
                            v-for="star in 5"
                            :key="star"
                            @mouseover="hoverRating = star"
                            @mouseleave="hoverRating = 0"
                            @click="newRating = star"
                            >
                            <svg
                            width="35"
                            height="34"
                            viewBox="0 0 15 14"
                            fill="none"
                        >
                            <path
                                d="M11.5973 14C11.419 14 11.2417 13.9466 11.089 13.8403L7.50009 11.3293L3.91113 13.8403C3.76244 13.9447 3.58374 14.0005 3.40056 13.9999C3.21738 13.9993 3.03909 13.9422 2.89114 13.8369C2.74305 13.7321 2.63259 13.5845 2.57548 13.4149C2.51837 13.2454 2.51752 13.0626 2.57305 12.8925L3.91157 8.67793L0.354822 6.23275C0.207417 6.12662 0.0979459 5.97796 0.0418925 5.8078C-0.0141608 5.63764 -0.0139588 5.45459 0.0424702 5.28455C0.0993442 5.11492 0.209422 4.96702 0.357147 4.86175C0.504871 4.75648 0.682771 4.69916 0.865703 4.6979L5.27083 4.69144L6.67333 0.58142C6.73121 0.412106 6.84222 0.264848 6.99064 0.160499C7.13906 0.0561503 7.31737 0 7.50031 0C7.68326 0 7.86156 0.0561503 8.00998 0.160499C8.1584 0.264848 8.26942 0.412106 8.32729 0.58142L9.70597 4.69144L14.1336 4.6979C14.3167 4.69891 14.4949 4.75619 14.6428 4.86162C14.7907 4.96705 14.9007 5.11526 14.9573 5.2852C15.0139 5.45513 15.0142 5.63815 14.9581 5.80825C14.9021 5.97835 14.7925 6.12689 14.6449 6.23275L11.0882 8.67793L12.4267 12.8925C12.4823 13.0625 12.4816 13.2453 12.4246 13.4149C12.3675 13.5844 12.2571 13.7321 12.109 13.8369C11.9606 13.9431 11.7813 14.0002 11.5973 14Z"
                                :fill="(hoverRating >= star ||  newRating >= star) ?  '#FFAC33' :  '#B0B0B0'"
                            />
                        </svg>
                        </div>
                        </div>

                <h2 class="text-gray-500 mt-2 text-left text-sm">Отзыв</h2>

                <textarea class="mt-3 text-base w-full outline-0 border-gray-300 border rounded-lg resize-none h-30 p-3" 
                v-model="comment">
                    
                </textarea>

                <div class="flex justify-between mt-3">
                    <h2 class="comment-warning text-gray-500 text-sm" ref="errorMessage">{{comment.length >= 10 ? 'Отзыв готов к публикации' : 'Минимум 10 символов' }}</h2>
                    <h2 class=" text-gray-500 text-sm">{{comment.length}}/500 символов</h2>
                </div>

                <div class="changeReviewBtns-container flex justify-between mt-3"> 
                    <button class="w-[174px] pt-[10px] pb-[10px] text-base cursor-pointer bg-gray-200 text-gray-700 hover:bg-gray-300 rounded-lg border-gray-300 border transition-colors"
                    @click="close">Отменить</button>
                    <button class="w-[174px] pt-[10px] pb-[10px] text-base cursor-pointer rounded-lg bg-green-100 hover:bg-lime-400 border-gray-300 border transition-colors"
                    @click="confirmChangeReview">Сохранить изменения</button>
                </div>
            </div>
        </div>
        </Transition>
    </Teleport>
</template>
<script setup lang="ts">
import UserReviewCard from '~/entities/ui/userReviewCard.vue';

import type {userReviewRows} from '~/types/reviewsTypes'
const hoverRating = ref();
const newRating = ref();
const errorMessage = ref();
const props = defineProps<{
    userReviewCard:userReviewRows,
    show:boolean
}>()

const comment = ref(props.userReviewCard.comment)

const emit = defineEmits<{
    (e: 'confirm'): void;
    (e: 'close'): void
}>()

function confirmChangeReview(){
    if(comment.value.length >= 10 || newRating.value <= 0 || newRating.value >= 6 || newRating.value === null   ){
        emit('confirm')
    }
    else if(newRating.value <= 0  || newRating.value >= 6){
        document.querySelector('.comment-warning')?.classList.add('warning');
        errorMessage.value.textContent = 'Укажите корректную оценку';
    }
    else{
        return
    }
}

watch(comment,()=>{
    if(comment.value.length >= 10){
        document.querySelector('.comment-warning')?.classList.remove('warning');
    }
    else{
        document.querySelector('.comment-warning')?.classList.add('warning');
    }
})

function close(){
    emit('close')
}

watchEffect(() => {
    if (props.show) {
    document.body.style.overflow = 'hidden'
    console.log(props.show)
  } else {
    document.body.style.overflow = ''
  }
})
</script>

<style>
.changeRewiew-svg-container{
    & svg{
        height:23px;
        width:23px;
    }
}
.warning{
    color:red;
}
</style>