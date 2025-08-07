<template>
	<li class="w-full h-full flex flex-col">
		<label for="shopName" class="font-[Roboto] font-medium">{{
			label
		}}</label>

		<textarea
			v-if="type === 'textarea'"
			v-model="model"
			id="shopDescription"
			class="resize-none border border-gray-200 px-2.5 py-1.25 text-[15px] rounded-lg focus:border-lime-400 focus:border-3 transition-colors font-[Roboto] h-[120px] outline-0"
		></textarea>

		<input
			v-else
			v-model="model"
			id="shopName"
			:type="type"
			:placeholder="placeholder"
			class="border flex-grow border-gray-200 px-2.5 py-1.25 text-[15px] rounded-lg focus:border-lime-400 focus:border-2 transition-colors font-[Roboto] min-h-[38px]"
		/>

		<Transition name="error" mode="out-in">
			<p
				v-if="isError && errorLabel"
				key="error"
				class="mt-2 text-sm text-red-600 flex items-center"
			>
				<svg
					class="w-4 h-4 mr-1"
					fill="currentColor"
					viewBox="0 0 20 20"
				>
					<path
						fill-rule="evenodd"
						d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
						clip-rule="evenodd"
					/>
				</svg>
				{{ errorLabel }}
			</p>
		</Transition>
	</li>
</template>

<script setup lang="ts">
const props = defineProps<{
	label: string
	placeholder?: string
	type: string

	isError: boolean
	errorLabel: string
}>()

const isEr = computed(() => props.isError)

watch(
	() => isEr.value,
	() => {
		console.log(isEr.value)
	}
)

const model = defineModel<string>()
</script>

<style scoped>
.error-enter-active,
.error-leave-active {
	transition: all 0.3s ease;
}

.error-enter-from {
	opacity: 0;
	transform: translateX(-20px);
	max-height: 0;
	/* margin-top: 0; */
}

.error-enter-to {
	opacity: 1;
	transform: translateX(0);
	max-height: 50px;
	/* margin-top: 8px; */
}

.error-leave-from {
	opacity: 1;
	transform: translateX(0);
	max-height: 50px;
	/* margin-top: 8px; */
}

.error-leave-to {
	opacity: 0;
	transform: translateX(-20px);
	max-height: 0;
	/* margin-top: 0; */
}
</style>
