<script setup lang="ts">
import axios from 'axios';
import {ref, inject, onMounted} from 'vue';
interface AuthState {
  isAuthUser: { value: boolean }
  currentUser: { value: {
    id: number
    username: string
    email: string
    role: string
    balance: number
  } | null }
  fetchUserData: (actualToken:string) => Promise<void>;
};
const currentUser = inject<AuthState>('auth');
const token = useCookie('token');
const router = useRouter();

const logout = ()=>{
  token.value = null;

  if (currentUser?.isAuthUser) {
    currentUser.isAuthUser.value = false;
  }
  if (currentUser?.currentUser) {
    currentUser.currentUser.value = null;
  }

  router.push('/');
};

definePageMeta({
  middleware: 'auth'
});
</script>
<template>
  <section class="profile-section">
    <div class="profile-container">
    <div class="profile-menu-container">
      <div class="profile-img">
      <img src="" alt="">
    </div>

    <div class="profile-user-info">
      <h2 class="profile-username">{{ currentUser?.currentUser.value?.username }}</h2>
      <a class="profile-change-info">Изменить профиль</a>
    </div>

    <ul class="profile-menu">
      <li class="menu-title">Личная информация</li>
      <li class="menu-title-page" @click="router.push('/profile')">Главная</li>
      <li class="menu-title-page active"  @click="router.push('/balance')">Баланс средств</li>
      <li class="menu-title">Заказы</li>
      <li class="menu-title-page" @click="router.push('/orders')">Мои заказы</li>
      <li class="menu-title-page">Мои возвраты</li>
      <li class="menu-title-page" @click="router.push('/basket')">Корзина</li>
      <li class="menu-title">Отзывы</li>
      <li class="menu-title-page">Мои отзывы</li>
      <li class="menu-title">Для продавца</li>
      <li class="menu-title-page">Стать продавцом</li>
      <li class="menu-title-page">Мои продажи</li>
      <li class="menu-title-page">Мой счёт</li>
    </ul>

    <h2 @click="logout" class="logout-btn">Выйти</h2>
    </div>
    <div class="profile-menu-option-container">
      <h2>Your balance: {{ currentUser?.currentUser.value?.balance }}</h2>
    </div>
  </div>
  </section>
</template>
<style>
.profile-section{
  max-width:1425px;
  margin: 0 auto;
  padding: 15px;
}
.profile-container{
  padding: 10px;
  display: flex;
  justify-content: space-between;
  column-gap: 25px;
}
.profile-menu-container{
  width:200px;
  height:485px;
  background-color: #FCFCFC;
  border-radius: 9px;
}
.profile-menu-option-container{
  width:1200px;
  height:400px;
  background-color: #FCFCFC;
  border-radius: 9px;
}
.profile-menu-container{
  padding:15px;
}
.menu-title{
  color:black;
  font-size: 14px;
  font-family: 'Roboto';
}
.menu-title-page{
  color:#808080;
  font-size: 14px;
  font-family: 'Roboto';
  cursor: pointer;
  &:hover{
    text-decoration: underline;
    text-decoration-color: black;
  }
}
.profile-img{
  width:85px;
  height:85px;
  background-color: gray;
  margin: 0 auto;
  border-radius: 52px;
}
.profile-menu{
  margin-top: 10px;
  row-gap: 7px;
  display: grid;
}
.profile-change-info{
  font-family: 'Roboto';
  color:#002FFF;
  font-size: 14px;
  cursor: pointer;
}
.profile-username{
  font-family: 'Roboto';
  font-size: 16px;
}
.logout-btn{
  color:red;
  font-family: 'Roboto';
  font-size: 14px;
  margin-top: 10px;
  cursor: pointer;
}
</style>
