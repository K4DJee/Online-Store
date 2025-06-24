<template>
	<div class="p-6 bg-gradient-to-r from-lime-500 to-lime-600 text-white">
		<div class="flex items-center space-x-4">
			<div
				class="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm"
			>
				<svg
					class="w-8 h-8 text-white"
					fill="currentColor"
					viewBox="0 0 24 24"
				>
					<path
						d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"
					/>
				</svg>
			</div>
			<div>
				<h2 v-if="user" class="text-xl font-bold">
					{{ user.username }}
				</h2>
				<button
					class="text-lime-100 hover:text-white text-sm transition-colors"
				>
					Изменить профиль
				</button>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import { useProfileStore } from '#imports'

const profileStore = useProfileStore()
const { user } = profileStore
</script>

<style scoped></style>
