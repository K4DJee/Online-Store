<template>
	<NuxtLink
		:to="link"
		class="w-full flex items-center px-3 py-2 text-sm font-medium text-white bg-lime-500 rounded-lg transition-colors"
	>
		<slot name="icon"></slot>
		{{ label }}
	</NuxtLink>
</template>

<script setup lang="ts">
defineProps<{
	link: string
	label: string
}>()
</script>

<style scoped></style>
