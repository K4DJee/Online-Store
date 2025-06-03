<template>
  <div>
    <Header />
    <slot /> <!-- Здесь будет контент страницы -->
    <Footer />
  </div>
</template>

<script setup>
import Header from '../components/Header.vue'
import Footer from '../components/Footer.vue'
</script>