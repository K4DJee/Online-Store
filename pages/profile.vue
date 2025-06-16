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
    regDate:Date
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
      <li class="menu-title-page active" @click="router.push('/profile')">Главная</li>
      <li class="menu-title-page" @click="router.push('/balance')">Баланс средств</li>
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
      <div class="p_m_o_c_1">
        <div class="p-balance-container">
          <div class="p-user-balance">
            <div class="p-user-balance-container">
              <div class="ruble-container">₽</div>
              <h2 class="p-balance">{{ currentUser?.currentUser.value?.balance }} ₽</h2>
            </div>
            <h2 class="p-balance-title">Баланс</h2>
          </div>
          <button class="p-balance-btn">Пополнить</button>
        </div>
        <ul class="profile-options">
          <li class="profile-option-item">
            <div class="p-svg-icon">
              <svg width="34" height="32" viewBox="0 0 34 32" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path opacity="0.45" d="M26.2872 32C25.8832 32 25.4812 31.878 25.1352 31.635L17.0002 25.8955L8.86523 31.635C8.52819 31.8736 8.12315 32.0012 7.70794 31.9998C7.29274 31.9984 6.8886 31.868 6.55324 31.6271C6.21757 31.3877 5.9672 31.0502 5.83775 30.6627C5.70831 30.2751 5.70638 29.8573 5.83224 29.4687L8.86623 19.8353L0.804263 14.2463C0.470146 14.0037 0.222011 13.6639 0.0949564 13.275C-0.0320978 12.886 -0.0316398 12.4676 0.0962657 12.079C0.22518 11.6912 0.47469 11.3532 0.809532 11.1126C1.14437 10.8719 1.54761 10.7409 1.96226 10.738L11.9472 10.7233L15.1262 1.32896C15.2574 0.941957 15.509 0.605366 15.8454 0.366855C16.1819 0.128344 16.586 0 17.0007 0C17.4154 0 17.8195 0.128344 18.156 0.366855C18.4924 0.605366 18.744 0.941957 18.8752 1.32896L22.0002 10.7233L32.0362 10.738C32.4513 10.7404 32.8551 10.8713 33.1903 11.1123C33.5255 11.3533 33.775 11.692 33.9033 12.0804C34.0316 12.4689 34.0322 12.8872 33.9051 13.276C33.778 13.6648 33.5296 14.0043 33.1951 14.2463L25.1332 19.8353L28.1672 29.4687C28.2933 29.8572 28.2916 30.275 28.1623 30.6626C28.033 31.0501 27.7828 31.3877 27.4472 31.6271C27.1108 31.8699 26.7043 32.0005 26.2872 32Z" fill="#1178FF"/>
            </svg>
            </div>
            <div class="profile-option-info">
              <h2 class="p_o_i_title1">Ждут оценки</h2>
              <h2 class="p_o_i_title2">5 товаров</h2>
            </div>
          </li>
          <li class="profile-option-item">
            <div class="p-svg-icon">
              <svg width="34" height="26" viewBox="0 0 34 26" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path opacity="0.45" d="M33.2917 9.28572H28.9884L21.3849 0.490824C20.8783 -0.0952784 19.9843 -0.166546 19.388 0.331632C18.7919 0.82981 18.7194 1.70888 19.2262 2.29498L25.2699 9.28572H8.73015L14.7739 2.29492C15.2806 1.70882 15.2081 0.829752 14.612 0.331574C14.0159 -0.166604 13.1218 -0.0952783 12.6151 0.490766L5.01152 9.28572H0.708333C0.317156 9.28572 0 9.59755 0 9.98215V11.375C0 11.7596 0.317156 12.0714 0.708333 12.0714H1.8102L3.43843 23.5975C3.63292 24.9747 4.8306 26 6.24478 26H27.7552C29.1694 26 30.3671 24.9747 30.5616 23.5975L32.1898 12.0714H33.2917C33.6828 12.0714 34 11.7596 34 11.375V9.98215C34 9.59755 33.6828 9.28572 33.2917 9.28572ZM27.7552 23.2143H6.24478L4.67069 12.0714H29.3292L27.7552 23.2143ZM18.4167 15.3214V19.9643C18.4167 20.7336 17.7824 21.3571 17 21.3571C16.2176 21.3571 15.5833 20.7336 15.5833 19.9643V15.3214C15.5833 14.5522 16.2176 13.9286 17 13.9286C17.7824 13.9286 18.4167 14.5522 18.4167 15.3214ZM25.0278 15.3214V19.9643C25.0278 20.7336 24.3935 21.3571 23.6111 21.3571C22.8287 21.3571 22.1944 20.7336 22.1944 19.9643V15.3214C22.1944 14.5522 22.8287 13.9286 23.6111 13.9286C24.3935 13.9286 25.0278 14.5522 25.0278 15.3214ZM11.8056 15.3214V19.9643C11.8056 20.7336 11.1713 21.3571 10.3889 21.3571C9.60648 21.3571 8.97222 20.7336 8.97222 19.9643V15.3214C8.97222 14.5522 9.60648 13.9286 10.3889 13.9286C11.1713 13.9286 11.8056 14.5522 11.8056 15.3214Z" fill="#14EA5B"/>
            </svg>
            </div>
            <div class="profile-option-info">
              <h2 class="p_o_i_title1">В корзине</h2>
              <h2 class="p_o_i_title2">5 товаров</h2>
            </div>
          </li>
          <li class="profile-option-item">
            <div class="p-svg-icon">
              <svg width="31" height="31" viewBox="0 0 31 31" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path opacity="0.45" d="M3.50826 1.83371L0 8.85714H14.3929V0H6.48371C5.22433 0 4.07567 0.712723 3.50826 1.83371ZM16.6071 8.85714H31L27.4917 1.83371C26.9243 0.712723 25.7757 0 24.5163 0H16.6071V8.85714ZM31 11.0714H0V26.5714C0 29.0141 1.98594 31 4.42857 31H26.5714C29.0141 31 31 29.0141 31 26.5714V11.0714Z" fill="#FFAC33"/>
            </svg>
            </div>
            <div class="profile-option-info">
              <h2 class="p_o_i_title1">К выдаче</h2>
              <h2 class="p_o_i_title2">5 товаров</h2>
            </div>
          </li>
          <li class="profile-option-item">
            <div class="p-svg-icon">
              <svg width="32" height="26" viewBox="0 0 32 26" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M3.55556 0C1.59444 0 0 1.66563 0 3.71429V5.57143H32V3.71429C32 1.66563 30.4056 0 28.4444 0H3.55556ZM32 11.1429H0V22.2857C0 24.3344 1.59444 26 3.55556 26H28.4444C30.4056 26 32 24.3344 32 22.2857V11.1429ZM6.22222 18.5714H9.77778C10.2667 18.5714 10.6667 18.9893 10.6667 19.5C10.6667 20.0107 10.2667 20.4286 9.77778 20.4286H6.22222C5.73333 20.4286 5.33333 20.0107 5.33333 19.5C5.33333 18.9893 5.73333 18.5714 6.22222 18.5714ZM12.4444 19.5C12.4444 18.9893 12.8444 18.5714 13.3333 18.5714H20.4444C20.9333 18.5714 21.3333 18.9893 21.3333 19.5C21.3333 20.0107 20.9333 20.4286 20.4444 20.4286H13.3333C12.8444 20.4286 12.4444 20.0107 12.4444 19.5Z" fill="black"/>
            </svg>
            </div>
            <div class="profile-option-info">
              <h2 class="p_o_i_title1">Куплено</h2>
              <h2 class="p_o_i_title2">5 товаров</h2>
            </div>
          </li>
        </ul>
      </div>
      <div class="p_m_o_c_2">
        <div class="change-email-container">
          <h2 class="change-email-title">Почта, привязанная к аккаунту:</h2>
          <div class="p-user-email">{{ currentUser?.currentUser.value?.email }}</div>
          <button class="change-email-btn">Привязать другую почту</button>
        </div>

        <div class="account-regDate-container">
          <h2 class="account-regDate-title">Дата регистрации аккаунта:</h2>
          <div class="account-regDate">{{ currentUser?.currentUser.value?.regDate }}</div>
        </div>

        <div class="promo-container">
          <h2 class="promo-title">Активировать промокод</h2>
          <input class="promo-input" type="text">
          <button class="promo-btn">Активировать</button>
        </div>
      </div>
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
  padding: 25px;
  display: flex;
  column-gap: 15px;
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
.p_m_o_c_1{
  display: grid;
  row-gap: 15px;
  height:275px;
}
.profile-options{
  width:430px;
  /* height:159px; */
  display: flex;
  flex-wrap: wrap;
  gap: 15px;
}
.p-balance-container{
  width:265px;
  height:75px;
  padding:0 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border: 1px solid #1178FF;
  border-radius: 9px;
}
.p-user-balance{
  width:95px;
  height:42px;
}
.p-user-balance-container{
  display: flex;
  column-gap: 5px;
  align-items: center;
}
.ruble-container{
  width:30px;
  height:30px;
  display: flex;
  justify-content: center;
  align-items:center;
  background-color: #1178FF;
  color:white;
  font-size: 20px;
  font-family: 'Roboto';
  border-radius: 4px;
}
.p-balance{
  font-size: 17px;
}
.p-balance-title{
  font-size: 16px;
}
.p-balance-btn{
  font-size: 15px;
  padding: 5px 10px;
  color:white;
  background-color: #1178FF;
  border-radius: 4px;
  cursor: pointer;
}

.profile-option-item{
  display: flex;
  justify-content: center;
  align-items: center;
  column-gap: 10px;
  padding: 0 23px;
  border:1px solid #1178FF;
  border-radius: 9px;
  height:80px;
}
.profile-option-info{
  width:115px;
}
.p-svg-icon{
  width:34px;
  height:32px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.p_o_i_title1{
  font-size: 17px;
}
.p_o_i_title2{
  font-size: 16px;
  color: #949494;
}
.change-email-container{
  display: grid;
  row-gap: 6px;
  width:265px;
}

.p-user-email{
  border: 1px solid black;
  border-radius: 9px ;
  padding:5px 10px;
  display: flex;
  align-items: center;
  font-size: 14px;
  font-family: 'Roboto';
  width:265px;
  height:30px;
}
.change-email-btn{
  padding: 5px 10px;
  font-size: 14px;
  font-family: 'Roboto';
  width:185px;
  background-color: #1178FF;
  color:white;
  border-radius: 4px;
  height:30px;
  cursor: pointer;
}
.change-email-title{
  font-size: 17px;
}
.account-regDate-container{
  display: grid;
  row-gap: 5px;
  height:52px;
}
.account-regDate-title{
  font-size: 16px;
}
.account-regDate{
  width:265px;
  height:30px;
  padding:0 10px;
  border: 1px solid black;
  border-radius: 9px;
  display: flex;
  align-items: center;
  font-size: 14px;
  font-family: 'Roboto';
}

.promo-container{
  display: grid;
  row-gap: 5px;
  height:82px;
  width:200px;
}
.promo-title{
  font-size: 16px;
}
.promo-input{
  border: 1px solid black;
  border-radius: 9px;
  display:flex;
  align-items: center;
  padding: 0 10px;
  font-size: 14px;
  font-family: 'Roboto';
  height:30px;
  width:265px;
}
.promo-btn{
  padding:5px 10px;
  color:white;
  font-size: 14px;
  font-family: 'Roboto';
  background-color: #1178FF;
  width:110px;
  border-radius: 4px;
  cursor: pointer;
}
.p_m_o_c_2{
  display: grid;
  row-gap: 15px;
  height:256px; 
}
</style>
