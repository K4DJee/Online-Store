<template>
	<NuxtLink
		:to="link ? link : ''"
		class="w-full flex items-center px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
		:class="[
			{
				'bg-lime-500 text-white hover:bg-lime-500':
					route.fullPath === link,
			},
		]"
	>
		<NuxtImg
			class="mr-3 size-5"
			:src="route.fullPath === link && activeIcon ? activeIcon : icon"
		></NuxtImg>
		{{ label }}
	</NuxtLink>
</template>

<script setup lang="ts">
const props = defineProps<{
	link?: string
	label: string
	icon: string
	activeIcon?: string
}>()
const label = computed(() => props.label)
const link = computed(() => props.link)

const route = useRoute()
if (link.value) {
	console.log(route.fullPath)
	console.log(link.value)
}
</script>

<style scoped></style>
