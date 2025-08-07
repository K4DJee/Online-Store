<template>
  <section class="w-full h-[600px] flex justify-center items-center bg-gray-50">
    <div
      class="w-[600px] bg-white rounded-xl border border-gray-200 p-6 shadow-xs"
    >
      <div v-if="acceptStep === false">
        <h2 class="text-center text-xl">Вы точно хотите сменить почту?</h2>
        <div class="flex mt-2.5">
          <button
            @click="acceptStepFunction"
            class="cursor-pointer w-[150px] h-[45px] m-auto rounded-lg text-white font-semibold bg-linear-to-r from-lime-500 to-lime-500 hover:shadow-lg hover:hover:-translate-y-0.5 active:opacity-80 active:translate-y-0 transitions-all duration-200"
          >
            Сменить почту
          </button>
        </div>
      </div>

      <component v-if="acceptStep" :is="currentStep" @next="goNext" />
    </div>
  </section>
</template>

<script setup lang="ts">
const step = ref<"code" | "email">("code");
const acceptStep = ref(false);
const { sendCodeToEmail } = useRecover();
const changeToken = useCookie('changeToken');
const SetNewEmail = defineAsyncComponent(
  () => import("~/components/setNewEmail.vue")
);
const EmailCodeForSet = defineAsyncComponent(
  () => import("~/components/emailCodeForSet.vue")
);

const currentStep = computed(() =>
  step.value === "code" ? EmailCodeForSet : SetNewEmail
);

function goNext() {
  step.value = "email";
}

async function acceptStepFunction() {
  if(changeToken.value != null || changeToken.value != undefined){
    console.log(changeToken.value)
    acceptStep.value = true;
    goNext();
  }
  const result = await sendCodeToEmail();
  if (result?.success) {
    console.log("Код успешно отправлен:", result.message!);

    acceptStep.value = true;
  } else {
    console.log("Ошибка:", result?.message!);
  }
}

</script>
