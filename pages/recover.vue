<script setup lang="ts">
import {ref} from 'vue';
import email_code_recover from '~/components/email_code_recover.vue';
import email_recover from '~/components/email_recover.vue';
const nextStage = ref(false);

</script>
<template>
    <section class="recover-section">
        <div class="recover-container">
            <email_recover v-if="!nextStage" @next="nextStage = true"></email_recover>
            <email_code_recover v-if="nextStage === true"></email_code_recover>
        </div>
    </section>
</template>
<style scoped>
.recover-section{
    width:100%;
    height:600px;
    display: flex;
    justify-content: center;
    align-items: center; 
}
.recover-container{
    width:600px;
    /* height:210px; */
    background-color: white;
    border-radius: 9px;
    padding: 25px;
}
</style>