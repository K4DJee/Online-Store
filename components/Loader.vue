<template>
	<div class="loader-container" :class="containerClass">
		<!-- Spinning Dots Loader -->
		<div v-if="variant === 'dots'" class="flex space-x-2">
			<div
				v-for="i in 3"
				:key="i"
				class="w-3 h-3 bg-lime-500 rounded-full animate-bounce"
				:style="{ animationDelay: `${(i - 1) * 0.2}s` }"
			></div>
		</div>

		<!-- Spinning Ring Loader -->
		<div
			v-else-if="variant === 'ring'"
			class="animate-spin rounded-full border-4 border-lime-200 border-t-lime-600"
			:class="sizeClass"
		></div>

		<!-- Pulsing Circle Loader -->
		<div
			v-else-if="variant === 'pulse'"
			class="animate-pulse bg-gradient-to-r from-lime-400 to-lime-600 rounded-full"
			:class="sizeClass"
		></div>

		<!-- Bars Loader -->
		<div v-else-if="variant === 'bars'" class="flex space-x-1">
			<div
				v-for="i in 5"
				:key="i"
				class="w-1 bg-gradient-to-t from-lime-600 to-lime-400 animate-pulse"
				:class="[`h-${4 + (i % 3) * 2}`]"
				:style="{
					animationDelay: `${(i - 1) * 0.1}s`,
					height: `${16 + (i % 3) * 8}px`,
				}"
			></div>
		</div>

		<!-- Spinner Loader (default) -->
		<div
			v-else
			class="animate-spin rounded-full border-4 border-lime-300 border-l-lime-600"
			:class="sizeClass"
		></div>

		<!-- Loading Text -->
		<p
			v-if="showText"
			class="mt-4 text-lime-600 font-medium"
			:class="textSize"
		>
			{{ loadingText }}
		</p>
	</div>
</template>

<script setup lang="ts">
interface Props {
	variant?: 'spinner' | 'ring' | 'dots' | 'pulse' | 'bars'
	size?: 'sm' | 'md' | 'lg' | 'xl'
	showText?: boolean
	loadingText?: string
	fullScreen?: boolean
}

const props = withDefaults(defineProps<Props>(), {
	variant: 'dots',
	size: 'md',
	showText: false,
	loadingText: 'Завантаження...',
	fullScreen: false,
})

const containerClass = computed(() => ({
	'fixed inset-0 bg-white bg-opacity-90 flex flex-col items-center justify-center z-50':
		props.fullScreen,
	'flex flex-col items-center justify-center p-4': !props.fullScreen,
}))

const sizeClass = computed(() => {
	const sizeMap = {
		sm: 'w-8 h-8',
		md: 'w-12 h-12',
		lg: 'w-16 h-16',
		xl: 'w-24 h-24',
	}
	return sizeMap[props.size]
})

const textSize = computed(() => {
	const textSizeMap = {
		sm: 'text-sm',
		md: 'text-base',
		lg: 'text-lg',
		xl: 'text-xl',
	}
	return textSizeMap[props.size]
})
</script>

<style scoped>
@keyframes bounce {
	0%,
	80%,
	100% {
		transform: scale(0);
	}
	40% {
		transform: scale(1);
	}
}

.animate-bounce {
	animation: bounce 1.4s infinite ease-in-out both;
}
</style>
