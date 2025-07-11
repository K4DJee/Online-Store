<template>
    <Teleport to="body">
        <Transition
        enter-active-class="transition-opacity duration-200"
        leave-to-class="opacity-0"
        >
        <div if="show" class="modal-overlay backdrop-blur-xs">
            <div class="modal-container bg-white w-[450px] rounded-2xl border-gray-300 border p-10">
                <div class="modal-attention mt-auto">
                    <div class="rounded-[52px] bg-orange-50 flex justify-center items-center w-[45px] h-[45px]">
                        <svg width="363" height="326" viewBox="0 0 363 326" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M145.957 20.8155C161.722 -6.60122 201.278 -6.60127 217.043 20.8155L357.052 264.313C372.768 291.646 353.037 325.75 321.508 325.75H41.4922L40.7549 325.744C9.65612 325.218 -9.64529 291.432 5.94823 264.313L145.957 20.8155ZM199.705 30.7852C191.631 16.7423 171.37 16.7422 163.295 30.7852L23.2871 274.282C15.2373 288.282 25.3429 305.75 41.4922 305.75H321.508C337.657 305.75 347.763 288.282 339.713 274.282L199.705 30.7852ZM181.6 234.3C187.8 234.3 193 236.3 197.2 240.3C201.4 244.3 203.5 249.2 203.5 255C203.5 261 201.4 266 197.2 270C193 273.8 187.8 275.7 181.6 275.7C175.4 275.7 170.2 273.8 166 270C162 266 160 261 160 255C160 249.2 162 244.3 166 240.3C170.2 236.3 175.4 234.3 181.6 234.3ZM196.9 186C196.9 193.6 194.4 199.4 189.4 203.4C184.6 207.4 177.8 209.4 169 209.4V82.7998C169 75.4 171.4 69.8 176.2 66C181.2 62.2001 188.1 60.2998 196.9 60.2998V186Z" fill="#FF6900"/>
                        </svg>
                    </div>
                </div>
                <h2 class="mt-5 text-center font-[500] text-xl">Удаление отзыва</h2>
                <h2 class="mt-3 text-center w-[350px] m-auto text-medium text-gray-500">Вы точно хотите удалить отзыв? Это действие будет необратимым.</h2>
                <div class="delete-btns-container mt-5 flex justify-between">
                    <button @click="close" class=" bg-gray-200 w-[174px] pt-[10px] pb-[10px] rounded-lg text-gray-700 cursor-pointer text-base hover:bg-gray-300 transition-colors">Отменить удаление</button>
                    <button @click="confirmDeleteReview" class="bg-red-500 w-[174px] pt-[10px] pb-[10px] rounded-lg text-white cursor-pointer text-base hover:bg-red-600 transition-colors">Удалить отзыв</button>
                </div>
            </div>
        </div>
    </Transition>
    </Teleport>
</template>

<script setup lang="ts">
import {watchEffect} from 'vue'
const props = defineProps<{
    show:boolean
}>();

const emit = defineEmits<{
    (e: 'confirm'): void;
    (e: 'close'): void;
}>()

function confirmDeleteReview(){
    emit('confirm')
}

function close(){
    emit('close')
}

watchEffect(() => {
  if (props.show) {
    document.body.style.overflow = 'hidden'
  } else {
    document.body.style.overflow = ''
  }
})

function handleEsc(e: KeyboardEvent) {
	if (e.key === 'Escape') {
		emit('close')
	}
}


</script>

<style>
.modal-overlay{
    position: fixed;
    top:0;
    right:0;
    display: flex;
    justify-content: center;
    align-items: center;
    width:100%;
    height:100%;    
}
.modal-container{

}
.modal-attention{
    display: flex;
    justify-content: center;
    align-items: center;
    & svg{
        height:25px;
        width:31px;
        z-index: 99;
    }
}
</style>