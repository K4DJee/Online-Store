<template>
	<div>
		<div
			class="px-3 py-2 text-xs font-semibold text-gray-500 uppercase tracking-wider"
		>
			<slot name="groupTitle"></slot>
		</div>

		<sidebar-item label="Главная" link="/profile">
			<template #icon
				><svg
					class="mr-3 w-5 h-5"
					fill="currentColor"
					viewBox="0 0 24 24"
				>
					<path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
				</svg>
			</template>
		</sidebar-item>

		<sidebar-item label="Баланс средств" link="/balance">
			<template #icon
				><svg
					class="mr-3 w-5 h-5"
					fill="currentColor"
					viewBox="0 0 24 24"
				>
					<path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
				</svg>
			</template>
		</sidebar-item>
	</div>
</template>

<script setup lang="ts">
import { useProfileStore } from '#imports'

const profileStore = useProfileStore()
const { user } = profileStore
</script>

<style scoped></style>
