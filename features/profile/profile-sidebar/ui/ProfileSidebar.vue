<template>
	<div></div>
</template>

<script setup lang="ts">
import { useProfileStore } from '#imports'

const profileStore = useProfileStore()
const { user } = profileStore
</script>

<style scoped></style>
