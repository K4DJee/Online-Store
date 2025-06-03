<script setup lang="ts">
import {ref} from 'vue';
import Register from './Register.vue';
import Login from './Login.vue';
    const currentAuthForm =  ref(1);

    const props = defineProps<{
        isOpen:boolean
    }>()
    defineEmits<{
  (e: 'close'): void
}>()
</script>

<template>
<div v-if="props.isOpen" class="modal">
    <div class="modal-container">
        <div @click="$emit('close')" class="close-svg">
            <svg height="200" width="200" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
	<path d="M10 8.586L2.929 1.515L1.515 2.929L8.586 10l-7.071 7.071l1.414 1.414L10 11.414l7.071 7.071l1.414-1.414L11.414 10l7.071-7.071l-1.414-1.414L10 8.586z" fill="currentColor"/>
</svg>
        </div>
        <div class="btns-container">
        <button @click="currentAuthForm = 1">Login</button>
        <button @click="currentAuthForm = 2">Register</button>
    </div>
    <Login v-if="currentAuthForm === 1"></Login>
    <Register v-else-if="currentAuthForm === 2"></Register>
    </div>
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
}
.modal-container{
    background-color: rgba(0, 0, 0, 0.5);
    height:475px;
    width:400px;
    position: relative;
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
    & button{
        width:50%;
        height:100%;
        cursor: pointer;
        &:hover{
            opacity: 0.8;
        }
    }
}
</style>