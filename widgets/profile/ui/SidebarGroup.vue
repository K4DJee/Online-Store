<template>
	<div class="space-y-1">
		<div
			class="px-3 py-2 text-xs font-semibold text-gray-500 uppercase tracking-wider"
		>
			{{ title }}
		</div>

		<sidebar-item
			v-for="(item, index) in items"
			:key="index"
			:label="item.title"
			:link="item.route"
			:icon="item.icon"
			:activeIcon="item.activeIcon"
		>
		</sidebar-item>
	</div>
</template>

<script setup lang="ts">
import type { ISidebarItem } from '~/features/profile/profile-sidebar/config/sidebar.config'
import SidebarItem from './SidebarItem.vue'

defineProps<{
	title: string
	items: ISidebarItem[]
}>()
</script>

<style scoped></style>
