<template>
	<div class="grid grid-cols-2 gap-4">
		<!-- Selling goods quantity -->
		<profile-info-card>
			<template #title>5 товаров </template>
			<template #subTitle>Ждут оценки</template>
			<template #icon
				><svg
					class="w-5 h-5 text-blue-600"
					fill="currentColor"
					viewBox="0 0 24 24"
				>
					<path
						d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"
					/>
				</svg>
			</template>
		</profile-info-card>

		<!-- Goods in shoping basket quantity -->
		<profile-info-card>
			<template #title> 5 товаров</template>
			<template #subTitle>В корзине</template>
			<template #icon
				><svg
					class="w-5 h-5 text-green-600"
					fill="currentColor"
					viewBox="0 0 24 24"
				>
					<path
						d="M7 4V2C7 1.45 7.45 1 8 1H16C16.55 1 17 1.45 17 2V4H20C20.55 4 21 4.45 21 5S20.55 6 20 6H19V19C19 20.1 18.1 21 17 21H7C5.9 21 5 20.1 5 19V6H4C3.45 6 3 5.55 3 5S3.45 4 4 4H7Z"
					/>
				</svg>
			</template>
		</profile-info-card>

		<!-- Goods to take -->
		<profile-info-card>
			<template #title>5 товаров </template>
			<template #subTitle>К выдаче</template>
			<template #icon
				><svg
					class="w-5 h-5 text-orange-600"
					fill="currentColor"
					viewBox="0 0 24 24"
				>
					<path
						d="M16 6l2.29 2.29-4.88 4.88-4-4L2 16.59 3.41 18l6-6 4 4 6.3-6.29L22 12V6z"
					/>
				</svg>
			</template>
		</profile-info-card>

		<!-- Purchased goods -->
		<profile-info-card>
			<template #title>5 товаров </template>
			<template #subTitle>Куплено</template>
			<template #icon
				><svg
					class="w-5 h-5 text-gray-600"
					fill="currentColor"
					viewBox="0 0 24 24"
				>
					<path
						d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"
					/>
				</svg>
			</template>
		</profile-info-card>
	</div>
</template>

<script setup lang="ts"></script>

<style scoped></style>
