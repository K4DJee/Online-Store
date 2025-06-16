<template>
  <NuxtLayout name="default">
    <NuxtLoadingIndicator />
  <NuxtPage />
  </NuxtLayout>
</template>
<script setup lang="ts">
import axios from 'axios';
import {ref, provide, onMounted} from 'vue';
import type { AuthState } from './types/types';
//interfaces
interface User {
  id: number,
  username: string,
  email: string,
  role: string,
  regDate:Date,
  balance: number,
}

//variables
const token = useCookie('token');
const isAuthUser = ref(false);
const currentUser = ref<User | null>(null);
  provide<AuthState>('auth', {
  isAuthUser,
  currentUser,
  fetchUserData
});
//functions
async function fetchUserData(actualToken:string){
  try{
    if(actualToken){
      token.value = actualToken;
    }
    if(!token.value){
      console.log('enough token');
      return 
    }
    const response = await axios.post('http://localhost:8000/api/validateToken', {token:token.value});
    if(!response.data.valid === true){
      console.log('valid is: ', response.data.valid)
      return console.log('wrong valid');
    }
    isAuthUser.value = true;
    const userResponse = await axios.post('http://localhost:8000/api/userdata', {token:token.value});
    currentUser.value = userResponse.data;
    console.log('UserDate: ',currentUser.value);
    return console.log('success');
  }
  catch(error){
    console.log(error);
  }    
}


//hooks
onMounted(async()=>{
  if(token.value){
    await fetchUserData(token.value);
  }
  else{
    console.log('Not enough token');
  }
})
</script>
<style>
</style>