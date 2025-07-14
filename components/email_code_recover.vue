<script setup lang="ts">
import { ref, provide } from 'vue'
// const code = ref('');
const nextStage = ref(false)
const recover = useCookie('recover')
const recover_token = useCookie('recover_token')
const router = useRouter()
const CODE_LENGTH = 6
const code = ref<string[]>(Array(CODE_LENGTH).fill(''))
const errorMessage = ref('')
interface codeObject {
	code: String
	email: string | null | undefined
}
async function codeRecover() {
	errorMessage.value = ''
	if (!recover.value) {
		return (errorMessage.value = 'Произошла ошибка')
	}
	if (!code.value[0] || !code.value) {
		return (errorMessage.value = 'Введите код')
	}
	const codeObject: codeObject = {
		code: code.value.join(''),
		email: recover.value,
	}
	interface responseCodeRecover {
		valid: boolean
		recover_token: string
	}
	try {
		if (!code.value) {
			return console.log('code required!')
		}
		const data = await $fetch<responseCodeRecover>(
			'http://localhost:8000/api/account-recover-code',
			{
				method: 'POST',
				body: {
					codeObject,
				},
			}
		)
		if (data?.valid) {
			recover_token.value = data?.recover_token
			router.push({
				path: '/reset-password',
				query: { email: recover.value }, // можно передать email или token
			})
			errorMessage.value = 'Успешное подтверждение кода'
			return
		} else {
			return console.log('Неправильный код!')
		}
	} catch (error: any) {
		const status = error?.status
		switch (status) {
			case 400:
				errorMessage.value = 'Некорректные данные'
				break
			case 401:
				errorMessage.value = 'Неправильный код'
				break
			case 419:
				errorMessage.value = 'Время кода истекло'
				break
			case 500:
				errorMessage.value = 'Ошибка на стороне сервера'
				break
			default:
				errorMessage.value = 'Неизвестная ошибка'
		}
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
				class="input-field"
			/>
		</div>
		<h2 class="error-message-container" v-if="errorMessage">
			{{ errorMessage }}
		</h2>
		<button @click="codeRecover">Отправить</button>
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
		border: 1px solid black;
		padding: 0 10px;
		font-family: 'Roboto';
		font-size: 14px;
		margin-top: 15px;
	}
	& button {
		width: 130px;
		height: 45px;
		border-radius: 9px;
		background-color: #1178ff;
		color: white;
		font-size: 18px;
		font-family: 'Roboto';
		cursor: pointer;
		margin: 0 auto;
		margin-top: 15px;
	}
}
.error-message-container {
	margin-top: 5px;
	/* border: 1px solid black; */
	height: 25px;
}
.input-code-container {
	display: flex;
	justify-content: center;
	column-gap: 15px;
	& input {
		height: 50px;
		width: 50px;
		border-radius: 9px;
		border: 1px solid black;
		padding: 0 10px;
		font-family: 'Roboto';
		font-size: 18px;
		margin-top: 15px;
		text-align: center;
	}
}
</style>
