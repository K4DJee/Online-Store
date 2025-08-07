<template>
	<section
		class="w-full h-[600px] flex justify-center items-center bg-gray-50"
	>
		<div class="w-[600px] bg-white rounded-xl border border-gray-200 p-6 shadow-xs">
			<component :is="currentStep" @next="goNext" />
		</div>
	</section>
</template>

<script setup lang="ts">
const step = ref<'email' | 'code'>('email')

const EmailRecover = defineAsyncComponent(
	() => import('~/components/email_recover.vue')
)
const EmailCodeRecover = defineAsyncComponent(
	() => import('~/components/email_code_recover.vue')
)

const currentStep = computed(() =>
	step.value === 'email' ? EmailRecover : EmailCodeRecover
)

function goNext() {
	step.value = 'code'
}
</script>
