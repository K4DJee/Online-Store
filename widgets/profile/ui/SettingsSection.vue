<template>
	<div class="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
		<h3 class="text-lg font-semibold text-gray-900 mb-4">
			<slot name="title">Заголовок по‑умолчанию</slot>
		</h3>

		<div
			v-if="type === 'text'"
			class="flex items-center justify-between p-4 bg-gray-50 rounded-xl"
		>
			<div class="flex items-center space-x-3">
				<slot name="icon"></slot>
				<span class="text-gray-900 font-medium"
					><slot name="text"></slot
				></span>
			</div>
			<button
				class="px-4 py-2 text-sm font-medium text-lime-600 hover:bg-lime-50 rounded-lg transition-colors"
			>
				<slot name="textButton"></slot>
			</button>
		</div>

		<div
			v-else-if="type === 'input'"
			class="flex items-center justify-between rounded-xl"
		>
			<div class="flex space-x-4 w-full">
				<input
					type="text"
					:placeholder="placeholder"
					v-model="inputModel"
					class="flex-1 px-4 py-3 border flex-grow border-gray-200 rounded-xl focus:ring-2 focus:ring-lime-500 focus:border-transparent outline-none transition-colors"
				/>
				<button
					class="px-6 py-3 bg-lime-500 hover:bg-lime-600 text-white font-medium rounded-xl transition-colors"
				>
					<slot name="inputButton"></slot>
				</button>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
defineProps<{
	type: 'text' | 'input'
	placeholder?: string
}>()

const inputModel = defineModel<string>('inputModel', {
	type: String,
	required: false,
	default: '',
})
</script>
