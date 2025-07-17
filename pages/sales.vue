<template>
	<section class="bg-gray-50">
		<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
			<div v-if="user" class="grid grid-cols-1 lg:grid-cols-4 gap-8">
				<!-- Sidebar Menu -->
				<ProfileSidebar />

				<!-- Main Content -->
				<div class="lg:col-span-3 space-y-8">
					<ul class="flex flex-wrap md:flex-nowrap justify-center gap-5">
                        <li class="bg-white w-[281px] rounded-2xl p-5 flex justify-between items-center min-h-[150px] border border-gray-200 hover:shadow-sm transition-shadow">
                            <div class="">
                                <h2 class="text-gray-500 text-sm">Всего продаж</h2>
                                <h2 class="font-medium text-2xl">287</h2>
                            </div>
                            <div class="flex justify-center items-center w-[45px] h-[45px] bg-lime-100 rounded-full">
                                <svg height="16" width="22" fill="none" viewBox="0 0 29 16" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M27.0739 0C27.9547 0 28.6667 0.715518 28.6667 1.60059V9.60059C28.6667 10.4857 27.9547 11.2012 27.0739 11.2012C26.1932 11.2012 25.4812 10.4856 25.4812 9.60059V5.46582L17.0515 13.9307C16.4295 14.5557 15.4196 14.5557 14.7976 13.9307L9.55734 8.66602L2.72042 15.5312C2.09845 16.1562 1.08854 16.1561 0.466518 15.5312C-0.155506 14.9062 -0.155506 13.8907 0.466518 13.2656L8.42843 5.26562C9.05046 4.64061 10.0603 4.64059 10.6823 5.26562L15.9275 10.5361L23.2273 3.2002H19.112C18.2314 3.20018 17.5195 2.48543 17.5193 1.60059C17.5193 0.715525 18.2312 1.08787e-05 19.112 0H27.0739Z" fill="#7CCF00"/>
                                </svg>
                            </div>
                        </li>
                        <li class="bg-white w-[281px] rounded-2xl p-5 flex justify-between items-center min-h-[150px] border border-gray-200 hover:shadow-sm transition-shadow">
                            <div class="">
                                <h2 class="text-gray-500 text-sm">Доход за месяц</h2>
                                <h2 class="font-medium text-2xl">₽127,543</h2>
                            </div>
                            <div class="flex justify-center items-center w-[45px] h-[45px] bg-lime-100 rounded-full">
                                <svg height="16" width="22" fill="none" viewBox="0 0 29 16" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M27.0739 0C27.9547 0 28.6667 0.715518 28.6667 1.60059V9.60059C28.6667 10.4857 27.9547 11.2012 27.0739 11.2012C26.1932 11.2012 25.4812 10.4856 25.4812 9.60059V5.46582L17.0515 13.9307C16.4295 14.5557 15.4196 14.5557 14.7976 13.9307L9.55734 8.66602L2.72042 15.5312C2.09845 16.1562 1.08854 16.1561 0.466518 15.5312C-0.155506 14.9062 -0.155506 13.8907 0.466518 13.2656L8.42843 5.26562C9.05046 4.64061 10.0603 4.64059 10.6823 5.26562L15.9275 10.5361L23.2273 3.2002H19.112C18.2314 3.20018 17.5195 2.48543 17.5193 1.60059C17.5193 0.715525 18.2312 1.08787e-05 19.112 0H27.0739Z" fill="#7CCF00"/>
                                </svg>
                            </div>
                        </li>
                        <li class="bg-white w-[281px] rounded-2xl p-5 flex justify-between items-center min-h-[150px] border border-gray-200 hover:shadow-sm transition-shadow">
                            <div class="">
                                <h2 class="text-gray-500 text-sm">Активных товаров</h2>
                                <h2 class="font-medium text-2xl">156</h2>
                            </div>
                            <div class="flex justify-center items-center w-[45px] h-[45px] bg-lime-100 rounded-full">
                                <svg height="16" width="22" fill="none" viewBox="0 0 29 16" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M27.0739 0C27.9547 0 28.6667 0.715518 28.6667 1.60059V9.60059C28.6667 10.4857 27.9547 11.2012 27.0739 11.2012C26.1932 11.2012 25.4812 10.4856 25.4812 9.60059V5.46582L17.0515 13.9307C16.4295 14.5557 15.4196 14.5557 14.7976 13.9307L9.55734 8.66602L2.72042 15.5312C2.09845 16.1562 1.08854 16.1561 0.466518 15.5312C-0.155506 14.9062 -0.155506 13.8907 0.466518 13.2656L8.42843 5.26562C9.05046 4.64061 10.0603 4.64059 10.6823 5.26562L15.9275 10.5361L23.2273 3.2002H19.112C18.2314 3.20018 17.5195 2.48543 17.5193 1.60059C17.5193 0.715525 18.2312 1.08787e-05 19.112 0H27.0739Z" fill="#7CCF00"/>
                                </svg>
                            </div>
                        </li>
                    </ul>

                    <div class="bg-white min-h-[100px] rounded-2xl p-5">
                        <h2 class="font-medium">Последние заказы</h2>
                        <div class="overflow-x-auto">
                            <table class="w-full mt-5 table-auto">
                            <thead>
                                <tr>
                                    <th class="px-4 py-2 text-left text-base">Заказ</th>
                                    <th class="px-4 py-2 text-left text-base">Покупатель</th>
                                    <th class="px-4 py-2 text-left text-base">Товар</th>
                                    <th class="px-4 py-2 text-left text-base">Сумма</th>
                                    <th class="px-4 py-2 text-left text-base">Статус</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr class="border-t border-t-gray-200">
                                    <td class="px-4 py-2 text-left">#12345</td>
                                    <td class="px-4 py-2 text-left">Иван Петров</td>
                                    <td class="px-4 py-2 text-left">Телефон iPhone 15</td>
                                    <td class="px-4 py-2 text-left">₽89,990</td>
                                    <td class="px-4 py-2 text-left"></td>
                                </tr>
                            </tbody>
                        </table>
                        </div>
                        
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