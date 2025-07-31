<template>
  <h2 class="text-center text-xl">Введите новую почту</h2>
  <input
    v-model="newEmail"
    @keyup.enter="setNewEmailFunction"
    class="mt-2.5 h-[45px] px-2.5 rounded-xl border w-full font-[Roboto] text-lg border-gray-200 focus:ring-2 focus:ring-lime-400 transition-all"
    type="text"
  />
  <div class="mt-5 bg-red-50 border border-red-200 rounded-lg p-3" v-if="errorMessage">
			<h2 class="text-sm font-medium text-red-600 m-0">{{ errorMessage }}</h2>
		</div>
  <div class="flex mt-3.75">
    <button
      @click="setNewEmailFunction"
      class="cursor-pointer w-[150px] h-[45px] m-auto rounded-[10px] text-white font-semibold bg-linear-to-r from-lime-500 to-lime-500 hover:shadow-lg hover:hover:-translate-y-0.5 active:opacity-80 active:translate-y-0 transitions-all duration-200"
    >
      Сменить почту
    </button>
  </div>
</template>
<script setup lang="ts">
const newEmail = ref<string>("");
const errorMessage = ref("");
const changeToken = useCookie<string | null>('changeToken');
const {setNewEmail} = useRecover();
const emit = defineEmits<{
  (e:'next'):void
}>()

async function setNewEmailFunction() {
  if (!newEmail.value) {
    return (errorMessage.value = "Введите почту");
  }
  if (!isValidEmail(newEmail.value)) {
    return (errorMessage.value = "Введите корректный email!");
  }
  if(!changeToken.value || changeToken.value === undefined){
    console.log('Ошибка, нету changeToken')
    return
  }

  const result = await setNewEmail(changeToken.value, newEmail.value);
  if(result?.success){
    console.log('Успешная смена почты')
    changeToken.value = null
  }
  else{
    errorMessage.value = result.message;
    console.log('Ошибка', result.message)
  }

}
function isValidEmail(email: string): boolean {
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return emailRegex.test(email);
}
</script>
