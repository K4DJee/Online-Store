<script setup lang="ts">
import {ref, watch} from 'vue';
import Register from './Register.vue';
import Login from './Login.vue';
    const currentAuthForm =  ref(1);
    const loginBtn = ref<HTMLButtonElement | null>(null);
    const regBtn = ref<HTMLButtonElement | null>(null);
    const props = defineProps<{
        isOpen:boolean
    }>()
    const emit = defineEmits<{
  (e: 'close'): void
}>()


function handleEsc(e: KeyboardEvent) {
  if (e.key === 'Escape') {
    emit('close')
  }
}

    watch(currentAuthForm, ()=>{
        if(currentAuthForm.value === 1){
            if(loginBtn.value && regBtn.value){
                regBtn.value.style.backgroundColor = 'white';
                loginBtn.value.style.backgroundColor = '#FFB200';
            }
        }
        else if (currentAuthForm.value === 2){
            if(regBtn.value && loginBtn.value){
                loginBtn.value.style.backgroundColor = 'white';
                regBtn.value.style.backgroundColor = '#FFB200';
            }
        }
    });

onMounted(() => {
  window.addEventListener('keydown', handleEsc)
})

onUnmounted(() => {
  window.removeEventListener('keydown', handleEsc)
})
</script>

<template>
<div v-if="props.isOpen" class="modal" @click="$event => $event.target === $event.currentTarget && $emit('close')">
    <div class="modal-container">
        <!-- <div @click="$emit('close')" class="close-svg">
            <svg height="200" width="200" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
	<path d="M10 8.586L2.929 1.515L1.515 2.929L8.586 10l-7.071 7.071l1.414 1.414L10 11.414l7.071 7.071l1.414-1.414L11.414 10l7.071-7.071l-1.414-1.414L10 8.586z" fill="currentColor"/>
</svg>
        </div> -->
        <div class="btns-container">
        <button class="login-btn" ref="loginBtn" @click="currentAuthForm = 1">Войти</button>
        <button class="reg-btn" ref="regBtn" @click="currentAuthForm = 2">Зарегистрироваться</button>
    </div>
    <div class="auth-container">
        <Login v-if="currentAuthForm === 1" @close="$emit('close')"></Login>
    <Register v-else-if="currentAuthForm === 2"></Register>
    </div>
    
    </div>
    <div class="modal-background"></div>
</div>
</template>

<style>
.modal{
    position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
  backdrop-filter: blur(1px);
  
}
.modal-container{
    background-color: white;
    height:415px;
    width:400px;
    position: relative;
    box-shadow: 4px 4px 30px 0px rgba(34, 60, 80, 0.32);
    border-radius: 6px;
}
.close-svg{
    position: absolute;
    top:5px;
    right:5px;
    & svg{
        width:25px;
        height:25px;
    }
}
.btns-container{
    height:32px;
    width:100%;
    border-bottom: 1px solid rgb(0, 174, 255);
    & button{
        width:50%;
        height:100%;
        cursor: pointer;
        font-family: 'Roboto';
        font-size: 15px;
        &:hover{
            opacity: 0.8;
        }
    }
}
.auth-container{
    padding:10px 25px;
}

.login-btn{
    background-color: #FFB200;
}
.reg-btn{

}

</style>