<template>
<div class="reviewCard-container border border-gray-300 rounded-xl">
    <div class="review-main-info-container">
        <div class="review-main-info-1c">
            <NuxtImg :src="'https://i.pinimg.com/736x/11/1c/7f/111c7f70a48c84f490574de35e7cb4c5.jpg'" class="reviewAvatar"></NuxtImg>
            <div class="grid">
                <div class="flex items-center gap-[10px]">
                    <h2 class="review-username">{{ reviewCard.reviewUsername }}</h2>
                    <h2 class="reviewCreatedAt">{{ formatDate(parseDate(reviewCard.createdAt)) }}</h2>
                </div>
                <div class="flex">
                    <div class="reviewRating-container"
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
                        :fill="(reviewCard.rating >= star) ? '#FFAC33' : '#B0B0B0'"
                    />
                </svg>
                </div>
                </div>
            </div>
        </div>
        <div class="review-main-info-2c">
            <div class="review-reportBtn flex items-center gap-1.25 transition-colors p-2 rounded-xl">
                <svg width="59" height="68" viewBox="0 0 59 68" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M6.32143 3.1875C6.32143 1.42109 4.91228 0 3.16071 0C1.40915 0 0 1.42109 0 3.1875V8.5V46.5508V53.125V64.8125C0 66.5789 1.40915 68 3.16071 68C4.91228 68 6.32143 66.5789 6.32143 64.8125V51.5312L16.8967 48.8617C22.3094 47.4937 28.0382 48.1312 33.0295 50.6414C38.8504 53.5766 45.6065 53.9352 51.6908 51.6242L56.2607 49.8977C57.9069 49.2734 59 47.693 59 45.9133V8.77891C59 5.72422 55.8129 3.73203 53.1 5.1L51.8357 5.7375C45.7382 8.81875 38.5607 8.81875 32.4632 5.7375C27.8406 3.4 22.5333 2.81563 17.5156 4.07734L6.32143 6.90625V3.1875ZM6.32143 13.4805L19.0433 10.2664C22.5991 9.37656 26.3525 9.78828 29.6317 11.4352C36.8618 15.0742 45.2641 15.3797 52.6786 12.3383V44.4523L49.4652 45.6609C45.027 47.3344 40.0884 47.082 35.8478 44.9437C29.5 41.743 22.2435 40.9461 15.3558 42.6727L6.32143 44.957V13.4805Z" fill="red"/>
                </svg>
                <h2>Пожаловаться</h2>
            </div>
        </div>
    </div>
    <div class="reviewComment-container mt-2.5">
        <h2>{{ reviewCard.comment }}</h2>
    </div>
</div>
</template>
<script setup lang="ts"> 
import { NuxtImg } from '#components';
import type {userReviewRows} from '~/types/reviewsTypes';
import {formatDate, parseDate} from '~/entities/helpers/formatDate'
const props = defineProps<{
    reviewCard:userReviewRows
}>()

const reviewCard = computed(()=> props.reviewCard);
</script>
<style>
.reviewCard-container{
    width:775px;
    min-height:120px;
    padding:15px 20px;
    position: relative;
    box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
}
.review-main-info-container{
    height:35px;
    display: flex;
    align-items: center;
    justify-content: space-between;
}
.review-main-info-1c{
    display: flex;
    column-gap:15px;
    
}
.reviewAvatar{
    height:35px;
    width:35px;
    border-radius: 52px;
}
.review-username{
    font-size: 18px;
}
.review-main-info-2c{
    display: flex;
    column-gap: 10px;
    align-items: center;
}
.reviewCreatedAt{
    color:#949494;
    font-size: 14px
}
.reviewRating-container{
    column-gap: 1px;
    display: flex;
    padding:0 0 3px 0;
}
.reviewComment-container{
    margin-left: 45px;
    font-size: 16px;
}
.reviewAvatar{
    cursor: pointer;
}
.review-reportBtn{
    transition: all .2s;
    cursor: pointer;
    &:hover{
        background-color: oklch(37.3% 0.034 259.733);
        & h2{
            color:white;
        }
        & svg path{
            fill:white;
        }
    }
    & h2{
    font-size: 15px;
    color:red;
    font-weight: 500;
    cursor: pointer;
    }
    & svg{
        width:17px;
        height:17px;
    }
    
    /* right:20px;
    bottom:20px;
    position: absolute; */
}
</style>