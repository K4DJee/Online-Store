<template>
	<Transition
		appear
		enter-active-class="transition-opacity duration-200"
		enter-from-class="opacity-0"
		enter-to-class="opacity-100"
		leave-active-class="transition-opacity duration-200"
		leave-from-class="opacity-100"
		leave-to-class="opacity-0"
	>
		<div
			v-if="props.isOpen"
			class="fixed inset-0 bg-opacity-60 backdrop-blur-sm flex items-center justify-center z-50 animate-fade-in"
			@click="
				$event =>
					$event.target === $event.currentTarget && $emit('close')
			"
		>
			<div
				class="bg-white rounded-3xl w-full max-w-md max-h-[90vh] overflow-y-auto relative shadow-2xl animate-slide-up m-4"
			>
				<!-- Close button -->
				<button
					@click="$emit('close')"
					class="absolute top-5 right-5 w-10 h-10 bg-gray-100 hover:bg-gray-200 rounded-xl text-gray-500 hover:text-gray-700 flex items-center justify-center transition-all duration-200 hover:scale-105 z-10 cursor-pointer"
				>
					<svg
						width="24"
						height="24"
						viewBox="0 0 24 24"
						fill="none"
						xmlns="http://www.w3.org/2000/svg"
					>
						<path
							d="M18 6L6 18M6 6L18 18"
							stroke="currentColor"
							stroke-width="2"
							stroke-linecap="round"
							stroke-linejoin="round"
						/>
					</svg>
				</button>

				<!-- Titles -->
				<div class="text-center pt-10 pb-5 px-8">
					<h2 class="text-3xl font-bold text-gray-900 mb-2">
						Добро пожаловать!
					</h2>
					<p class="text-gray-600">
						Войдите в аккаунт или создайте новый
					</p>
				</div>

				<!-- Buttons login or register -->
				<div class="relative flex mx-8 mb-5 bg-gray-100 rounded-xl p-1">
					<button
						class="tab-button flex-1 h-11 rounded-lg text-sm font-semibold text-gray-500 hover:text-gray-700 transition-all duration-200 relative z-10"
						ref="loginBtn"
						:class="[
							{
								'bg-white text-lime-500 shadow-sm hover:text-lime-500':
									currentAuthForm === 1,
								' cursor-pointer': currentAuthForm === 2,
							},
						]"
						@click="currentAuthForm = 1"
					>
						Вход
					</button>
					<button
						class="tab-button flex-1 h-11 rounded-lg text-sm font-semibold text-gray-500 hover:text-gray-700 transition-all duration-200 relative z-10 active:bg-white active:text-lime-500 hover:shadow-sm"
						ref="regBtn"
						:class="[
							{
								'bg-white text-lime-500 shadow-sm hover:text-lime-500':
									currentAuthForm === 2,
								' cursor-pointer': currentAuthForm === 1,
							},
						]"
						@click="currentAuthForm = 2"
					>
						Регистрация
					</button>
				</div>

				<!-- Modals -->
				<div class="px-8 pb-10">
					<Transition name="slide" mode="out-in">
						<Login
							v-if="currentAuthForm === 1"
							@close="$emit('close')"
							key="login"
						/>
						<Register
							v-else-if="currentAuthForm === 2"
							@close="$emit('close')"
							key="register"
						/>
					</Transition>
				</div>
			</div>
		</div>
	</Transition>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'

const Login = defineAsyncComponent(() => import('~/components/Login.vue'))
const Register = defineAsyncComponent(() => import('~/components/Register.vue'))

const currentAuthForm = ref(1)
const loginBtn = ref<HTMLButtonElement | null>(null)
const regBtn = ref<HTMLButtonElement | null>(null)
const props = defineProps<{
	isOpen: boolean
}>()
const emit = defineEmits<{
	(e: 'close'): void
}>()

function handleEsc(e: KeyboardEvent) {
	if (e.key === 'Escape') {
		emit('close')
	}
}

watch(currentAuthForm, () => {
	if (currentAuthForm.value === 1) {
		if (loginBtn.value && regBtn.value) {
			regBtn.value.classList.remove('active')
			loginBtn.value.classList.add('active')
		}
	} else if (currentAuthForm.value === 2) {
		if (regBtn.value && loginBtn.value) {
			loginBtn.value.classList.remove('active')
			regBtn.value.classList.add('active')
		}
	}
})

onMounted(() => {
	window.addEventListener('keydown', handleEsc)
	// Set initial active state
	if (loginBtn.value) {
		loginBtn.value.classList.add('active')
	}
})

onUnmounted(() => {
	window.removeEventListener('keydown', handleEsc)
})
</script>

<style scoped>
/* Transition animations */
.slide-enter-active,
.slide-leave-active {
	transition: all 0.3s ease;
}

.slide-enter-from {
	opacity: 0;
	transform: translateX(20px);
}

.slide-leave-to {
	opacity: 0;
	transform: translateX(-20px);
}

/* Custom scrollbar */
::-webkit-scrollbar {
	width: 6px;
}

::-webkit-scrollbar-track {
	background: transparent;
}

::-webkit-scrollbar-thumb {
	background: #d1d5db;
	border-radius: 3px;
}

::-webkit-scrollbar-thumb:hover {
	background: #9ca3af;
}
</style>
