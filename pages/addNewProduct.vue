<template>
<section class="bg-gray-50">
		<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
			<div v-if="user" class="grid grid-cols-1 lg:grid-cols-4 gap-8">
				<!-- Sidebar Menu -->
				<ProfileSidebar />

				<!-- Main Content -->
				<div class="lg:col-span-3 space-y-8">
					<div class="bg-white rounded-2xl min-h-[900px] border border-gray-200 p-5">
                        <h2 class="text-2xl font-medium">Добавить товар</h2>
                        <div class="flex flex-wrap justify-center w-full">
                            <ul class="grid p-2.5 w-[320px] md:w-1/2 gap-2.5">
                                <li class="grid">
                                    <label for="11" class="font-[Roboto] font-medium">Название товара</label>
                                    <input id="11" type="text" 
                                    placeholder="Введите название товара" 
                                    class="border border-gray-200 px-2.5 py-1.25 text-[15px] rounded-lg focus:border-lime-400 focus:border-3 transition-colors font-[Roboto] min-h-[38px]"/>
                                </li>
                                <li class="grid">
                                    <label for="11" class="font-[Roboto] font-medium">Цена</label>
                                    <input id="11" type="number" 
                                    placeholder="0.00" 
                                    class="border border-gray-200 px-2.5 py-1.25 text-[15px] rounded-lg focus:border-lime-400 focus:border-3 transition-colors font-[Roboto] min-h-[38px]"/>
                                </li>
                                <li class="grid">
                                    <label for="11" class="font-[Roboto] font-medium">Категория</label>
                                    <input id="11" type="text" 
                                    placeholder="Выберите категорию товара" 
                                    class="border border-gray-200 px-2.5 py-1.25 text-[15px] rounded-lg focus:border-lime-400 focus:border-3 transition-colors font-[Roboto] min-h-[38px]"/>
                                </li>
                            </ul>
                            <ul class="grid p-2.5 w-[320px] md:w-1/2 gap-2.5">
                                <li class="grid">
                                    <label for="11" class="font-[Roboto] font-medium">Количество на складе</label>
                                    <input id="11" type="number" 
                                    placeholder="1" 
                                    class="border border-gray-200 px-2.5 py-1.25 text-[15px] rounded-lg focus:border-lime-400 focus:border-3 transition-colors font-[Roboto] min-h-[38px]"/>
                                </li>
                                <li class="grid">
                                    <label for="11" class="font-[Roboto] font-medium">Название товара</label>
                                    <input id="11" type="text" 
                                    placeholder="Введите название товара" 
                                    class="border border-gray-200 px-2.5 py-1.25 text-[15px] rounded-lg focus:border-lime-400 focus:border-3 transition-colors font-[Roboto] min-h-[38px]"/>
                                </li>
                                <li class="grid">
                                    <label for="11" class="font-[Roboto] font-medium">Вес (кг)</label>
                                    <input id="11" type="number" 
                                    placeholder="0.00" 
                                    class="border border-gray-200 px-2.5 py-1.25 text-[15px] rounded-lg focus:border-lime-400 focus:border-3 transition-colors font-[Roboto] min-h-[38px]"/>
                                </li>
                            </ul>
                        </div>

                        <div class="grid mt-5">
                            <label for="" class="font-[Roboto] font-medium">Описание товара</label>
                            <textarea 
                            placeholder="Подробное описание товара"
                            class="outline-0  border border-gray-200 focus:border-lime-400 focus:border-3 rounded-2xl p-2.5 min-h-[125px] transition-colors"></textarea>
                        </div>

                        <div class="mt-5 grid">
                            <h2>Изображения товара</h2>
                            <ul class="flex flex-wrap gap-5 justify-center"> <!--Сделать overflow-x-auto-->
                                <li class=" group flex justify-center items-center size-[175px] lg:size-[200px] border-3 border-dashed border-gray-200 rounded-2xl hover:border-lime-300 cursor-pointer transition-colors">
                                    <svg height="25" width="26" fill="none" viewBox="0 0 34 33" xmlns="http://www.w3.org/2000/svg">
                                        <path class="group-hover:fill-lime-500 transition-colors" d="M19.8959 2.99279C19.8959 1.63125 18.7615 0.53125 17.3574 0.53125C15.9533 0.53125 14.819 1.63125 14.819 2.99279V14.0697H3.39588C1.9918 14.0697 0.857422 15.1697 0.857422 16.5313C0.857422 17.8928 1.9918 18.9928 3.39588 18.9928H14.819V30.0697C14.819 31.4313 15.9533 32.5313 17.3574 32.5313C18.7615 32.5313 19.8959 31.4313 19.8959 30.0697V18.9928H31.319C32.723 18.9928 33.8574 17.8928 33.8574 16.5313C33.8574 15.1697 32.723 14.0697 31.319 14.0697H19.8959V2.99279Z" fill="#E5E7EB"/>
                                    </svg>
                                </li>
                                <li class=" group flex justify-center items-center size-[175px] lg:size-[200px] border-3 border-dashed border-gray-200 rounded-2xl hover:border-lime-300 cursor-pointer transition-colors">
                                    <svg height="25" width="26" fill="none" viewBox="0 0 34 33" xmlns="http://www.w3.org/2000/svg">
                                        <path class="group-hover:fill-lime-500 transition-colors" d="M19.8959 2.99279C19.8959 1.63125 18.7615 0.53125 17.3574 0.53125C15.9533 0.53125 14.819 1.63125 14.819 2.99279V14.0697H3.39588C1.9918 14.0697 0.857422 15.1697 0.857422 16.5313C0.857422 17.8928 1.9918 18.9928 3.39588 18.9928H14.819V30.0697C14.819 31.4313 15.9533 32.5313 17.3574 32.5313C18.7615 32.5313 19.8959 31.4313 19.8959 30.0697V18.9928H31.319C32.723 18.9928 33.8574 17.8928 33.8574 16.5313C33.8574 15.1697 32.723 14.0697 31.319 14.0697H19.8959V2.99279Z" fill="#E5E7EB"/>
                                    </svg>
                                </li>
                                <li class=" group flex justify-center items-center size-[175px] lg:size-[200px] border-3 border-dashed border-gray-200 rounded-2xl hover:border-lime-300 cursor-pointer transition-colors">
                                    <svg height="25" width="26" fill="none" viewBox="0 0 34 33" xmlns="http://www.w3.org/2000/svg">
                                        <path class="group-hover:fill-lime-500 transition-colors" d="M19.8959 2.99279C19.8959 1.63125 18.7615 0.53125 17.3574 0.53125C15.9533 0.53125 14.819 1.63125 14.819 2.99279V14.0697H3.39588C1.9918 14.0697 0.857422 15.1697 0.857422 16.5313C0.857422 17.8928 1.9918 18.9928 3.39588 18.9928H14.819V30.0697C14.819 31.4313 15.9533 32.5313 17.3574 32.5313C18.7615 32.5313 19.8959 31.4313 19.8959 30.0697V18.9928H31.319C32.723 18.9928 33.8574 17.8928 33.8574 16.5313C33.8574 15.1697 32.723 14.0697 31.319 14.0697H19.8959V2.99279Z" fill="#E5E7EB"/>
                                    </svg>
                                </li>
                                <li class=" group flex justify-center items-center size-[175px] lg:size-[200px] border-3 border-dashed border-gray-200 rounded-2xl hover:border-lime-300 cursor-pointer transition-colors">
                                    <svg height="25" width="26" fill="none" viewBox="0 0 34 33" xmlns="http://www.w3.org/2000/svg">
                                        <path class="group-hover:fill-lime-500 transition-colors" d="M19.8959 2.99279C19.8959 1.63125 18.7615 0.53125 17.3574 0.53125C15.9533 0.53125 14.819 1.63125 14.819 2.99279V14.0697H3.39588C1.9918 14.0697 0.857422 15.1697 0.857422 16.5313C0.857422 17.8928 1.9918 18.9928 3.39588 18.9928H14.819V30.0697C14.819 31.4313 15.9533 32.5313 17.3574 32.5313C18.7615 32.5313 19.8959 31.4313 19.8959 30.0697V18.9928H31.319C32.723 18.9928 33.8574 17.8928 33.8574 16.5313C33.8574 15.1697 32.723 14.0697 31.319 14.0697H19.8959V2.99279Z" fill="#E5E7EB"/>
                                    </svg>
                                </li>
                            </ul>
                        </div>

                        <button class="w-full py-2.5 cursor-pointer bg-lime-400 mt-5 rounded-xl text-white">Добавить товар</button>
                    </div>
				</div>
			</div>
		</div>
	</section>
</template>
<script setup lang="ts">
import ProfileSidebar from '~/features/profile/profile-sidebar/ui/ProfileSidebar.vue'
const profileStore = useProfileStore()
const { user } = storeToRefs(profileStore)
</script>
<style>

</style>