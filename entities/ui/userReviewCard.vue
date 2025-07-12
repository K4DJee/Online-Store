<template>
    <div class="userReviewCard bg-white rounded-2xl p-[15px] border border-gray-100">
        <div class=" flex items-center gap-2.5 justify-between h-full">
            <div class="w-full flex gap-2.5">
                <NuxtImg class="rounded-[9px] w-[90px]" :src="userReviewCard.imageUrl"></NuxtImg>
                 <div class="grid gap-1.25">
                    <div class="grid">
                        <h2 class="w-full">{{userReviewCard.productName }}</h2>
                        <h2 class="text-gray-600 text-sm">{{ formatDate(parseDate(userReviewCard.createdAt)) }}</h2>
                        <div class="flex gap-2.5 items-center mt-[20px]">
                        <div class="userReviewRating flex gap-0.5" >
                            <div class="star"
                            v-for="star in 5"
                            :key="star"
                            >
                            <svg
                            width="16"
                            height="15"
                            viewBox="0 0 15 14"
                            fill="none"
                        >
                            <path
                                d="M11.5973 14C11.419 14 11.2417 13.9466 11.089 13.8403L7.50009 11.3293L3.91113 13.8403C3.76244 13.9447 3.58374 14.0005 3.40056 13.9999C3.21738 13.9993 3.03909 13.9422 2.89114 13.8369C2.74305 13.7321 2.63259 13.5845 2.57548 13.4149C2.51837 13.2454 2.51752 13.0626 2.57305 12.8925L3.91157 8.67793L0.354822 6.23275C0.207417 6.12662 0.0979459 5.97796 0.0418925 5.8078C-0.0141608 5.63764 -0.0139588 5.45459 0.0424702 5.28455C0.0993442 5.11492 0.209422 4.96702 0.357147 4.86175C0.504871 4.75648 0.682771 4.69916 0.865703 4.6979L5.27083 4.69144L6.67333 0.58142C6.73121 0.412106 6.84222 0.264848 6.99064 0.160499C7.13906 0.0561503 7.31737 0 7.50031 0C7.68326 0 7.86156 0.0561503 8.00998 0.160499C8.1584 0.264848 8.26942 0.412106 8.32729 0.58142L9.70597 4.69144L14.1336 4.6979C14.3167 4.69891 14.4949 4.75619 14.6428 4.86162C14.7907 4.96705 14.9007 5.11526 14.9573 5.2852C15.0139 5.45513 15.0142 5.63815 14.9581 5.80825C14.9021 5.97835 14.7925 6.12689 14.6449 6.23275L11.0882 8.67793L12.4267 12.8925C12.4823 13.0625 12.4816 13.2453 12.4246 13.4149C12.3675 13.5844 12.2571 13.7321 12.109 13.8369C11.9606 13.9431 11.7813 14.0002 11.5973 14Z"
                                :fill="(userReviewCard.rating >= star) ?  '#FFAC33' :  '#B0B0B0'"
                            />
                        </svg>
                        </div>
                        </div>
                        <h2 class="text-gray-600 text-sm">{{ userReviewCard.rating }} из 5</h2>
                    </div>
                    </div>

                    <div class=" border-amber-500 min-h-4">
                    {{ userReviewCard.comment }}
                    </div>
                 </div>
            </div>

            <div class="userReviewCard-btn-container flex gap-2.5 h-full items-start" >
                <button class="userReviewBtn h-7.5 w-7.5 hover:bg-green-100 transition-colors"
                @click="showChangeConfirmation = true"
                ><!--@click="changeReview(userReviewCard.reviewId)"-->
                <svg width="29" height="29" viewBox="0 0 29 29" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M27.9385 3.1866L25.8139 1.06201C25.1059 0.354004 24.1781 0 23.2504 0C22.3226 0 21.3948 0.354004 20.6874 1.06145L16.4682 5.28061L14.5 7.24887L0.727885 21.0205L0.0085526 27.49C-0.082072 28.3045 0.559663 29 1.35659 29C1.407 29 1.45798 28.9972 1.50896 28.9915L7.97389 28.2773L21.7511 14.5L23.7188 12.5323L27.9379 8.31314C29.3539 6.89713 29.3539 4.60205 27.9385 3.1866ZM6.7261 25.6803L2.89834 26.1028L3.32485 22.2688L16.4224 9.17125L18.1794 7.41426L21.5857 10.8206L19.8287 12.5776L6.7261 25.6803ZM26.0155 6.3902L23.5075 8.89824L20.1017 5.49187L22.6098 2.98383C22.8409 2.75273 23.1105 2.71818 23.2504 2.71818C23.3903 2.71818 23.6604 2.75273 23.891 2.98383L26.0155 5.10842C26.369 5.46242 26.369 6.03732 26.0155 6.3902Z" fill="#8EEC00"/>
                    </svg>
                </button>
                <button class="userReviewBtn h-7.5 w-7.5 hover:bg-red-100 transition-colors"
                @click="showDeleteConfirmation = true">
                <svg width="29" height="32" viewBox="0 0 29 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M10.3571 25C10.3571 25.55 9.89107 26 9.32143 26C8.75179 26 8.28571 25.55 8.28571 25V12C8.28571 11.45 8.75179 11 9.32143 11C9.89107 11 10.3571 11.45 10.3571 12V25ZM15.5357 25C15.5357 25.55 15.0696 26 14.5 26C13.9304 26 13.4643 25.55 13.4643 25V12C13.4643 11.45 13.9304 11 14.5 11C15.0696 11 15.5357 11.45 15.5357 12V25ZM20.7143 25C20.7143 25.55 20.2482 26 19.6786 26C19.1089 26 18.6429 25.55 18.6429 25V12C18.6429 11.45 19.1089 11 19.6786 11C20.2482 11 20.7143 11.45 20.7143 12V25ZM20.5525 1.55875L22.9281 5H27.4464C28.3074 5 29 5.67188 29 6.5C29 7.33125 28.3074 8 27.4464 8H26.9286V27C26.9286 29.7625 24.6112 32 21.75 32H7.25C4.39013 32 2.07143 29.7625 2.07143 27V8H1.55357C0.69587 8 0 7.33125 0 6.5C0 5.67188 0.69587 5 1.55357 5H6.07317L8.44754 1.55875C9.12076 0.584812 10.2536 0 11.4641 0H17.5359C18.7464 0 19.8792 0.584875 20.5525 1.55875ZM9.80692 5H19.1931L17.9632 3.2225C17.8661 3.08375 17.7042 3 17.5359 3H11.4641C11.2958 3 11.0757 3.08375 11.0368 3.2225L9.80692 5ZM5.17857 27C5.17857 28.1063 6.10618 29 7.25 29H21.75C22.8958 29 23.8214 28.1063 23.8214 27V8H5.17857V27Z" fill="#FF0000"/>
                    </svg>
                </button>
            </div>
        </div>
    </div>
    <ConfirmDeleteModal
    v-if="showDeleteConfirmation"
    :show="showDeleteConfirmation"
    @confirm="handleDelete"
    @close="showDeleteConfirmation = false"
    ></ConfirmDeleteModal>
    
    <ChangeReviewModal
    v-if="showChangeConfirmation"
    :show="showChangeConfirmation"
    :userReviewCard="userReviewCard"
    @confirm="handleChangeReview"
    @close="showChangeConfirmation = false"
    ></ChangeReviewModal>

</template>
<script setup lang="ts">
import { NuxtImg } from '#components';
import type {userReviewRows} from '~/types/reviewsTypes'
import {formatDate, parseDate} from '~/entities/helpers/formatDate'
import ReviewCard from './ReviewCard.vue';
import ConfirmDeleteModal from '~/components/ConfirmDeleteModal.vue';
const {changeReview, deleteReview} = useReviews();
const props = defineProps<{
    userReviewCard:userReviewRows
}>()
const userReviewCard = computed(()=>props.userReviewCard);
const showDeleteConfirmation = ref(false);
const showChangeConfirmation = ref(false);

async function handleDelete(){
    await deleteReview(props.userReviewCard.reviewId);
    showDeleteConfirmation.value = false
}

async function handleChangeReview(){
    // await changeReview(props.userReviewCard.reviewId, );
    showChangeConfirmation.value = false;
}
</script>
<style>
.userReviewCard{

    border-bottom: 3px solid var(--color-lime-400);
}
.userReviewBtn{
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    /* background-color: var(--color-lime-400); */
    border-radius: 5px;
    & svg{
        height:18px;
    }
}
</style>