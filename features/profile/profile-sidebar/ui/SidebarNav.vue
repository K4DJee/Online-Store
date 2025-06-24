<template>
	<nav class="p-4 space-y-4">
		<SidebarGroup
			v-for="(item, index) in sidebarConfig"
			:key="index"
			:title="item.title"
			:items="item.items"
		>
		</SidebarGroup>
	</nav>
</template>

<script setup lang="ts">
import { useProfileStore } from '#imports'
import { sidebarConfig } from '../config/sidebar.config'

const profileStore = useProfileStore()
const { user } = profileStore
</script>

<style scoped></style>
