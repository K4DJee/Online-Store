<template>
    <section class="bg-gray-50">
		<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
			<div v-if="user" class="grid grid-cols-1 lg:grid-cols-4 gap-8">
				<!-- Sidebar Menu -->
				<ProfileSidebar />

				<!-- Main Content -->
				<div class="lg:col-span-3 space-y-8">
					<div class="grid bg-white rounded-2xl border-gray-100 p-6 border  gap-2.5 mx-auto">
                        <h2 class="text-xl font-semibold">Ваши отзывы: {{ allUserReviews?.userReviewRows.length || '0' }}</h2>    
                    </div>

                    <div class="grid gap-3.5">
                        <user-review-card
                        v-for="userReviewCard in allUserReviews?.userReviewRows"
                        :key="userReviewCard.reviewId"
                        :userReviewCard
                        ></user-review-card>
                    </div>
				</div>
			</div>
		</div>
	</section>

</template>

<script setup lang="ts">
const profileStore = useProfileStore()
const { user } = storeToRefs(profileStore)
const {changeReview, deleteReview,getAllUserReviews} = useReviews();
import type {responseAllUserReviews} from '~/types/reviewsTypes';
const {data:allUserReviews} = useAsyncData<responseAllUserReviews>(
        `reviews`,
        ()=>getAllUserReviews()
)   
</script>