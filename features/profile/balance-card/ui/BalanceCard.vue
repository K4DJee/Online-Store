<template>
	<div
		class="bg-gradient-to-br from-lime-500 to-lime-600 rounded-2xl p-6 text-white shadow-lg"
	>
		<div class="flex items-center justify-between">
			<div>
				<div class="flex items-center space-x-2 mb-2">
					<div
						class="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center"
					>
						<span class="text-xl font-bold">₽</span>
					</div>
					<div>
						<h3 class="text-sm font-medium text-lime-100">
							Баланс
						</h3>
						<p v-if="user" class="text-2xl font-bold">
							{{ user.balance ?? 0 }} ₽
						</p>
					</div>
				</div>
			</div>
			<button
				class="bg-white/20 hover:bg-white/30 px-4 py-2 rounded-lg text-sm font-medium transition-colors"
			>
				Пополнить
			</button>
		</div>
	</div>
</template>

<script setup lang="ts">
import type { IUser } from '~/types/types'
import { useProfileStore } from '#imports'

const profileStore = useProfileStore()

const { user } = storeToRefs(profileStore)
</script>

<style scoped></style>
