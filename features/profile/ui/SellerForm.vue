<template>
	<!-- form -->
	<div
		class="max-w-full min-h-[280px] bg-white border border-gray-200 rounded-2xl p-5"
	>
		<h2 class="font-medium text-center sm:text-2xl">
			Регистрация продавца
		</h2>
		<h2 class="text-gray-500 text-center sm:text-base">
			Заполните форму для создания магазина
		</h2>

		<div class="flex flex-wrap justify-center mt-5 gap-y-5">
			<ul
				class="grid gap-2.5 w-[330px] lg:w-1/2 lg:px-2.5 md:px-2.5 md:w-1/2"
			>
				<InputField
					v-for="item in inputsConfig"
					:type="item.type"
					:label="item.label"
					v-model="form[item.field]"
					:placeholder="item.placeholder"
					:is-error="errors[item.field]"
					:error-label="errors[item.field]"
					@input="validateField(item.field)"
				/>
			</ul>

			<div
				class="grid mb-10 w-[330px] lg:w-1/2 max-h-[140px] lg:px-2.5 md:px-2.5 md:w-1/2"
			>
				<InputField
					label="Описание магазина"
					v-model="form['description']"
					type="textarea"
					:is-error="errors.description"
					:error-label="errors['description']"
					@input="validateField('description')"
				/>
			</div>
		</div>

		<div class="border-b mt-5 border-b-gray-200"></div>

		<div class="mt-5 flex justify-center">
			<button
				@click="submitForm"
				class="flex gap-2.5 items-center justify-center cursor-pointer w-full bg-gradient-to-r to-lime-400 via-lime-600 from-lime-400 text-white text-base sm:text-lg font-[Roboto] rounded-2xl h-[45px]"
			>
				Зарегистрироваться как продавец
				<svg
					height="24"
					width="22"
					fill="none"
					viewBox="0 0 22 13"
					xmlns="http://www.w3.org/2000/svg"
				>
					<path
						d="M15.2734 0.907471C15.5035 0.696937 15.8773 0.696963 16.1074 0.907471L21.8271 6.11841C22.0573 6.32896 22.0573 6.6706 21.8271 6.8811L16.1074 12.092C15.8773 12.3025 15.5036 12.3025 15.2734 12.092L14.9268 11.7747C14.6966 11.5641 14.6966 11.2225 14.9268 11.012L19.0479 7.26392H0.588867C0.263729 7.26371 0.000165633 7.02229 0 6.72485V6.27563C0 5.97807 0.263627 5.73678 0.588867 5.73657H19.0479L14.9268 1.98755C14.6967 1.77702 14.6967 1.43633 14.9268 1.22583L15.2734 0.907471Z"
						fill="white"
					/>
				</svg>
			</button>
		</div>
	</div>
</template>

<script setup lang="ts">
const form = reactive<any>({
	name: '',
	email: '',
	password: '',
	description: '',
})

const rules: any = {
	name: (name: string) => !!name || 'Введите название магазина!',
	email: (email: string) =>
		(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g.test(email) && !!email) ||
		'Введите коректную почту!',
	password: (password: string) =>
		(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/gm.test(
			password
		) &&
			!!password) ||
		'Допустимы только пароли, длина которых не менее 8 символов и которые содержат как минимум одну цифру, одну строчную (a–z) и одну заглавную (A–Z) латинскую букву!',
	description: (description: string) =>
		!!description || 'Введите описание магазина!',
}

const errors = reactive<any>({})

const validateField = (field: string) => {
	const rule = rules[field]
	const value = form[field]
	const res = rule(value)

	if (res !== true) errors[field] = res as string
	else delete errors[field]
}

const submitForm = () => {
	Object.keys(rules).forEach(r => validateField(r))

	if (Object.keys(errors).length !== 0) return
}

const inputsConfig = ref([
	{
		field: 'name',
		type: 'text',
		label: 'Название магазина',
		placeholder: 'Введите название вашего магазина',
	},
	{
		field: 'email',
		type: 'email',
		label: 'Ваша почта',
		placeholder: 'Введите свой email',
	},
	{
		field: 'password',
		type: 'password',
		label: 'Пароль для входа в магазин',
		placeholder: 'Придумайте пароль',
	},
])
</script>

<style scoped></style>
