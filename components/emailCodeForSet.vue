<script setup lang="ts">
import { ref, provide } from 'vue'
const changeToken = useCookie('changeToken')
const CODE_LENGTH = 6
const code = ref<string[]>(Array(CODE_LENGTH).fill(''))
const errorMessage = ref('')
const {confirmTheCode} = useRecover();
const emit = defineEmits<{
	(e: 'next'):void
}>()
async function codeRecover() {	
	if(!parseInt(code.value.join(''))){
		return errorMessage.value = 'Введите код'
	}
	const result = await confirmTheCode(parseInt(code.value.join('')));
	if(result?.success){
		console.log('Код правильный')
		changeToken.value = result.changeToken;
		
		emit('next');
	}
	else{
		errorMessage.value = result?.message;
		console.log('Ошибка', result?.message);
	}
}

function handleInput(index: number) {
	const value = code.value[index]
	if (value && !/^\d$/.test(value)) {
		// Удаляем недопустимые символы
		code.value[index] = ''
		return
	}

	if (value && index < CODE_LENGTH - 1) {
		focusNextField(index + 1)
	}
}

function handleBackspace(index: number) {
	if (index > 0 && !code.value[index]) {
		focusPreviousField(index - 1)
	}
}

function focusNextField(index: number) {
	if (index < CODE_LENGTH) {
		const inputFields = document.querySelectorAll(
			'.input-field'
		) as NodeListOf<HTMLInputElement>
		inputFields[index].focus()
	}
}

function focusPreviousField(index: number) {
	if (index >= 0) {
		const inputFields = document.querySelectorAll(
			'.input-field'
		) as NodeListOf<HTMLInputElement>
		inputFields[index].focus()
	}
}

function handlePaste(event: ClipboardEvent) {
	const pastedData = event.clipboardData
		?.getData('text')
		?.slice(0, CODE_LENGTH)

	if (!pastedData || !/^\d+$/.test(pastedData)) {
		console.log('Вставлены недопустимые символы или пусто')
		return
	}

	for (let i = 0; i < CODE_LENGTH; i++) {
		code.value[i] = pastedData[i] || ''
	}

	const inputFields = document.querySelectorAll(
		'.input-field'
	) as NodeListOf<HTMLInputElement>
	const lastFilledIndex = Math.min(pastedData.length - 1, CODE_LENGTH - 1)
	inputFields[lastFilledIndex].focus()
}
</script>
<template>
	<form @submit.prevent="codeRecover" class="codeRecover-container">
		<h2 class="recover-title">
			На вашу почту был отправлен код, введите его
		</h2>
		<!-- <input v-model="code" type="text"> -->
		<div class="input-code-container">
			<input
				v-for="(digit, index) in code"
				:key="index"
				v-model="code[index]"
				type="text"
				maxlength="1"
				pattern="\d"
				@input="handleInput(index)"
				@keydown.backspace="handleBackspace(index)"
				@paste.prevent="handlePaste"
				autofocus
				:class="{ 'invalid-input': !/^\d$/.test(code[index]) }"
				class="input-field border-2 border-gray-200 focus:ring-2 focus:ring-lime-400 transition-all focus:border-lime-400"
			/>
		</div>
		<div class="mt-5 bg-red-50 border border-red-200 rounded-lg p-3" v-if="errorMessage">
			<h2 class="text-sm font-medium text-red-600 m-0">{{ errorMessage }}</h2>
		</div>
		<div class="flex pt-2.5">
			<button class="font-semibold bg-linear-to-r from-lime-500  to-lime-500 hover:shadow-lg hover:hover:-translate-y-0.5 active:opacity-80 active:translate-y-0 transitions-all duration-200"
		@click="codeRecover">Отправить</button>
		</div>
	</form>
</template>
<style setup>
.emailRecover-container {
	display: grid;
	justify-content: center;
}
.recover-title {
	font-size: 21px;
}
.codeRecover-container {
	display: grid;
	& input {
		height: 45px;
		width: 100%;
		border-radius: 9px;
		padding: 0 10px;
		font-family: 'Roboto';
		font-size: 14px;
		margin-top: 15px;
	}
	& button {
		width: 130px;
		height: 45px;
		border-radius: 8px;
		color: white;
		font-size: 16px;
		font-family: 'Roboto';
		cursor: pointer;
		margin: 0 auto;
		margin-top: 15px;
	}
}
.input-code-container {
	display: flex;
	justify-content: center;
	column-gap: 15px;
	& input {
		height: 50px;
		width: 50px;
		border-radius: 9px;
		padding: 0 10px;
		font-family: 'Roboto';
		font-size: 18px;
		margin-top: 15px;
		text-align: center;
	}
}
</style>
