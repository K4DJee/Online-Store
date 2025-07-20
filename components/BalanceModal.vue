<template>
    <Teleport to="body">
        <Transition
        appear
		enter-active-class="transition-opacity duration-200"
		enter-from-class="opacity-0"
		enter-to-class="opacity-100"
		leave-active-class="transition-opacity duration-200"
		leave-from-class="opacity-100"
		leave-to-class="opacity-0"
    >
        <div v-show="show" class="w-full h-screen fixed top-0 right-0 flex justify-center items-center backdrop-blur-sm bg-black/50 transition-all">
            
            <div class="bg-white overflow-x-auto h-[550px] rounded-2xl w-[650px] border border-gray-200 p-5">
                <div class=" items-center flex justify-end">
                    <div class="bg-gray-200 size-[35px] rounded-sm items-center flex justify-center"
                    @click="closeModal">
                        <svg data-v-ff55f906="" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path data-v-ff55f906="" d="M18 6L6 18M6 6L18 18" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path></svg>
                    </div>
                </div>
                <div class="mt-2.5 bg-lime-50 gap-2.5 min-h-[100px] rounded-2xl flex items-center justify-center border border-gray-200 p-5">
                    <svg height="38" width="40" fill="none" viewBox="0 0 40 38" xmlns="http://www.w3.org/2000/svg">
                        <path d="M30.0449 0.5C30.9384 0.500171 31.796 0.855525 32.4277 1.4873C33.0592 2.11917 33.4141 2.97679 33.4141 3.87012V7.97852H33.7842C34.6776 7.97868 35.5352 8.33403 36.167 8.96582C36.7985 9.59769 37.1533 10.4553 37.1533 11.3486V17.6787C37.4769 17.8396 37.7758 18.0532 38.0361 18.3135C38.6678 18.9453 39.0234 19.8028 39.0234 20.6963V24.4355C39.0233 25.3291 38.668 26.1865 38.0361 26.8184C37.776 27.0785 37.4767 27.2903 37.1533 27.4512V33.7842C37.1531 34.6776 36.7988 35.5352 36.167 36.167C35.5352 36.7988 34.6776 37.1532 33.7842 37.1533H5.73926C4.34991 37.1533 3.01669 36.6014 2.03418 35.6191C1.05179 34.6367 0.500106 33.3034 0.5 31.9141V5.73926C0.500008 4.34972 1.05163 3.01673 2.03418 2.03418C3.01673 1.05163 4.34972 0.500008 5.73926 0.5H30.0449ZM3.5 31.9141C3.50011 32.5078 3.7364 33.0782 4.15625 33.498C4.57612 33.9175 5.14573 34.1533 5.73926 34.1533H33.7842C33.882 34.1532 33.9757 34.1141 34.0449 34.0449C34.1141 33.9758 34.1531 33.882 34.1533 33.7842V27.8057H30.0449C28.6556 27.8057 27.3224 27.2528 26.3398 26.2705C25.3576 25.2881 24.8058 23.9556 24.8057 22.5664C24.8057 21.1769 25.3573 19.8439 26.3398 18.8613C27.3224 17.8788 28.6554 17.3271 30.0449 17.3271H34.1533V11.3486C34.1533 11.2508 34.114 11.1562 34.0449 11.0869C33.9758 11.0178 33.8819 10.9787 33.7842 10.9785H5.73926C4.95758 10.9785 4.19357 10.8032 3.5 10.4756V31.9141ZM30.0449 20.3271C29.451 20.3271 28.8809 20.5625 28.4609 20.9824C28.041 21.4024 27.8057 21.9725 27.8057 22.5664C27.8058 23.16 28.0413 23.7296 28.4609 24.1494C28.8809 24.5691 29.4512 24.8057 30.0449 24.8057H35.6533C35.7512 24.8056 35.8458 24.7665 35.915 24.6973C35.9843 24.628 36.0233 24.5335 36.0234 24.4355V20.6963C36.0234 20.5986 35.9839 20.5048 35.915 20.4355C35.8458 20.3663 35.7512 20.3272 35.6533 20.3271H30.0449ZM5.73926 3.5C5.14537 3.50001 4.57619 3.73631 4.15625 4.15625C3.73631 4.57619 3.50001 5.14537 3.5 5.73926C3.5001 6.333 3.73641 6.90241 4.15625 7.32227C4.57615 7.74197 5.14555 7.97851 5.73926 7.97852H30.4141V3.87012C30.4141 3.77226 30.3747 3.67768 30.3057 3.6084C30.2365 3.5393 30.1427 3.50017 30.0449 3.5H5.73926Z" fill="#7CCF00"/>
                    </svg>
                    <h2 class="font-medium text-left">Пополняйте баланс быстро и безопасно с помощью удобного способа оплаты</h2>
                </div>
                <div class="grid mt-5">
                    <label for="" class="font-[Roboto] font-medium">Введите сумму пополнения (₽)</label>
                    <input
                    v-model="amount"
                    type="text" 
                    class="py-1.25 px-2.5 rounded-lg w-full border border-gray-200 font-[Roboto]" min="100" max="50000">
                    <h2 class="text-gray-500 text-sm mt-1.25">Минимальная сумма: 100 ₽, максимальная: 50 000 ₽</h2>
                </div>

                <div class="min-h-0.25 border border-gray-200 mt-5 mb-5"></div>

                <div class="grid">
                    <h2 class="font-medium">Способ пополнения</h2>
                    <ul class="grid gap-7.5">
                        <li class="cursor-pointer relative border border-gray-200 min-h-[75px] rounded-lg p-2.5 flex items-center">
                            <div class="flex gap-2.5">
                                <input type="radio">
                                <div class="grid">
                                    <h2 class="font-medium text-sm flex gap-1.25 items-center">
                                        <svg height="12" width="13" fill="none" viewBox="0 0 22 16" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M19 0C20.6569 0 22 1.34315 22 3V13C22 14.6569 20.6569 16 19 16H3C1.34315 16 0 14.6569 0 13V3C0 1.34315 1.34315 0 3 0H19ZM2 7V13C2 13.5523 2.44772 14 3 14H19C19.5523 14 20 13.5523 20 13V7H2ZM3 2C2.44772 2 2 2.44772 2 3V5H20V3C20 2.44772 19.5523 2 19 2H3Z" fill="black"/>
                                        </svg>
                                        Банковская карта</h2>
                                    <h2 class="text-gray-500 text-sm">Visa, Mastercard, Мир</h2>
                                </div>
                            </div>

                            <div class="absolute top-2.5 right-2.5 bg-gray-200 rounded-xl text-xs px-1.25 py-0.25 font-medium">Без комиссии</div>
                        </li>
                        <li class="cursor-pointer relative border border-gray-200 min-h-[75px] rounded-lg p-2.5 flex items-center">
                            <div class="flex gap-2.5">
                                <input type="radio">
                                <div class="grid">
                                    <h2 class="font-medium text-sm flex gap-1.25 items-center">
                                        <svg height="12" width="13" fill="none" viewBox="0 0 21 20" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M16 0C16.5304 0 17.039 0.210864 17.4141 0.585938C17.7891 0.961012 18 1.46957 18 2V4C18.5304 4 19.039 4.21086 19.4141 4.58594C19.7891 4.96101 20 5.46957 20 6V9.26953C20.1498 9.35611 20.2896 9.46145 20.4141 9.58594C20.7891 9.96101 21 10.4696 21 11V13C21 13.5304 20.7891 14.039 20.4141 14.4141C20.2897 14.5384 20.1496 14.6429 20 14.7295V18C20 18.5304 19.7891 19.039 19.4141 19.4141C19.039 19.7891 18.5304 20 18 20H3C2.20435 20 1.44152 19.6837 0.878906 19.1211C0.316297 18.5585 0 17.7956 0 17V3C0 2.96473 0.00132041 2.92984 0.00488281 2.89551C0.0313094 2.13786 0.340999 1.41681 0.878906 0.878906C1.44152 0.316297 2.20435 0 3 0H16ZM2 17C2 17.2652 2.10543 17.5195 2.29297 17.707C2.48051 17.8946 2.73478 18 3 18H18V15H16C15.2043 15 14.4415 14.6837 13.8789 14.1211C13.3867 13.6289 13.0829 12.9835 13.0146 12.2969L13 12C13 11.2043 13.3163 10.4415 13.8789 9.87891C14.4415 9.3163 15.2043 9 16 9H18V6H3C2.65556 6 2.31856 5.93709 2 5.82422V17ZM16 11C15.7348 11 15.4805 11.1054 15.293 11.293C15.1054 11.4805 15 11.7348 15 12L15.0049 12.0986C15.0276 12.3276 15.1288 12.5429 15.293 12.707C15.4805 12.8946 15.7348 13 16 13H19V11H16ZM3 2C2.73478 2 2.48051 2.10543 2.29297 2.29297C2.10543 2.48051 2 2.73478 2 3L2.00488 3.09863C2.02757 3.32763 2.12883 3.54289 2.29297 3.70703C2.48051 3.89457 2.73478 4 3 4H16V2H3Z" fill="black"/>
                                    </svg>   
                                    YooMoney</h2>
                                    <h2 class="text-gray-500 text-sm">Быстро и безопасно</h2>
                                </div>
                            </div>

                            <div class="absolute top-2.5 right-2.5 bg-gray-200 rounded-xl text-xs px-1.25 py-0.25 font-medium">Без комиссии</div>
                        </li>
                        <li 
                        @click="refillBalance(amount)"
                        class="cursor-pointer relative border border-gray-200 min-h-[75px] rounded-lg p-2.5 flex items-center">
                            <div class="flex gap-2.5">
                                <input type="radio">
                                <div class="grid">
                                    <h2 class="font-medium text-sm flex gap-1.25 items-center">
                                    <svg height="12" width="13" fill="none" viewBox="0 0 21 20" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M16 0C16.5304 0 17.039 0.210864 17.4141 0.585938C17.7891 0.961012 18 1.46957 18 2V4C18.5304 4 19.039 4.21086 19.4141 4.58594C19.7891 4.96101 20 5.46957 20 6V9.26953C20.1498 9.35611 20.2896 9.46145 20.4141 9.58594C20.7891 9.96101 21 10.4696 21 11V13C21 13.5304 20.7891 14.039 20.4141 14.4141C20.2897 14.5384 20.1496 14.6429 20 14.7295V18C20 18.5304 19.7891 19.039 19.4141 19.4141C19.039 19.7891 18.5304 20 18 20H3C2.20435 20 1.44152 19.6837 0.878906 19.1211C0.316297 18.5585 0 17.7956 0 17V3C0 2.96473 0.00132041 2.92984 0.00488281 2.89551C0.0313094 2.13786 0.340999 1.41681 0.878906 0.878906C1.44152 0.316297 2.20435 0 3 0H16ZM2 17C2 17.2652 2.10543 17.5195 2.29297 17.707C2.48051 17.8946 2.73478 18 3 18H18V15H16C15.2043 15 14.4415 14.6837 13.8789 14.1211C13.3867 13.6289 13.0829 12.9835 13.0146 12.2969L13 12C13 11.2043 13.3163 10.4415 13.8789 9.87891C14.4415 9.3163 15.2043 9 16 9H18V6H3C2.65556 6 2.31856 5.93709 2 5.82422V17ZM16 11C15.7348 11 15.4805 11.1054 15.293 11.293C15.1054 11.4805 15 11.7348 15 12L15.0049 12.0986C15.0276 12.3276 15.1288 12.5429 15.293 12.707C15.4805 12.8946 15.7348 13 16 13H19V11H16ZM3 2C2.73478 2 2.48051 2.10543 2.29297 2.29297C2.10543 2.48051 2 2.73478 2 3L2.00488 3.09863C2.02757 3.32763 2.12883 3.54289 2.29297 3.70703C2.48051 3.89457 2.73478 4 3 4H16V2H3Z" fill="black"/>
                                    </svg>    
                                    Stripe</h2>
                                    <h2 class="text-gray-500 text-sm">Visa, Mastercard, Мир</h2>
                                </div>
                            </div>

                            <div class="absolute top-2.5 right-2.5 bg-gray-200 rounded-xl text-xs px-1.25 py-0.25 font-medium">Без комиссии</div>
                        </li>
                    </ul>

                    <div class="min-h-0.25 border border-gray-200 mt-5 mb-5"></div>

                    <div class="grid">
                        <h2 class="font-medium text-lg">Данные банковской карты</h2>
                    <div class="grid mt-2.5">
                        <label for="" class="font-[Roboto] font-medium">Номер карты</label>
                        <input 
                        placeholder="1234 2324 2123 2421"
                        type="text" 
                        class="py-1.25 px-2.5 rounded-lg w-full border border-gray-200 font-[Roboto]">
                    </div>
                    <ul class="flex flex-wrap sm:flex-nowrap gap-2.5">
                        <li  class="grid w-full sm:w-[200px]">
                            <label for="" class="font-[Roboto] font-medium">Срок действия</label>
                            <input
                            placeholder="ММ/ГГ"
                            type="text" 
                            class="py-1.25 px-2.5 rounded-lg w-full border border-gray-200 font-[Roboto]">
                        </li>
                        <li class="grid w-full sm:w-[200px]">
                            <label for="" class="font-[Roboto] font-medium">CVC</label>
                            <input 
                            placeholder="123"
                            type="text" 
                            class="py-1.25 px-2.5 rounded-lg w-full border border-gray-200 font-[Roboto]">
                        </li>
                    </ul>

                    <div class="grid">
                        <label for="" class="font-[Roboto] font-medium">Имя владельца</label>
                        <input type="text" class="py-1.25 px-2.5 rounded-lg w-full border border-gray-200 font-[Roboto]">
                    </div>
                    </div>
                    
                    <div class="min-h-0.25 border border-gray-200 mt-5 mb-5"></div>

                    <button class="w-full border border-gray-200 bg-lime-400 text-white font-[Roboto] py-2.5 rounded-xl cursor-pointer text-lg">Пополнить на 1000 ₽</button>

                    <div class="p-5 bg-lime-50 border border-gray-200 rounded-2xl mt-5">
                        <div class="flex gap-2.5">
                            <svg height="22" width="18" fill="none" viewBox="0 0 18 22" xmlns="http://www.w3.org/2000/svg">
                                <path d="M9 0C9.51678 0 10.0163 0.184832 10.4092 0.520508L10.418 0.527344C12.0575 1.96075 14.3229 3 16 3C16.5303 3 17.039 3.21101 17.4141 3.58594C17.789 3.96091 17.9999 4.46973 18 5V12C18 14.7641 17.021 16.8893 15.4463 18.5049C13.8988 20.0925 11.8204 21.1446 9.66895 21.8945L9.66113 21.8975C9.23301 22.0425 8.76877 22.0373 8.34375 21.8848V21.8857C8.33787 21.8837 8.33205 21.8809 8.32617 21.8789C8.32463 21.8783 8.32283 21.8785 8.32129 21.8779V21.877C6.17204 21.1325 4.09956 20.0851 2.55566 18.5039C1.07782 16.9903 0.125167 15.0283 0.0117188 12.5117L0 12V5C0.000119048 4.46973 0.210971 3.9609 0.585938 3.58594C0.960988 3.21101 1.46967 3 2 3L2.32129 2.98828C3.95847 2.86776 6.05353 1.86257 7.58203 0.527344L7.59082 0.520508C7.98374 0.184832 8.48322 0 9 0ZM9 2C8.95951 2 8.92043 2.01472 8.88965 2.04102L8.88867 2.04004C7.03932 3.65244 4.32008 5 2 5V12L2.00879 12.4121C2.09782 14.4376 2.8465 15.9389 3.98633 17.1064C5.22945 18.3796 6.98355 19.3001 8.99609 19.9951C9.00337 19.9976 9.01133 19.9993 9.01855 20.002C11.0236 19.3022 12.7728 18.3815 14.0137 17.1084C15.229 15.8615 16 14.2358 16 12V5C13.6805 5 10.9706 3.66341 9.11035 2.04004C9.07963 2.01395 9.04031 2 9 2Z" fill="#7CCF00"/>
                            </svg>
                            <h2 class="font-medium">Безопасность платежа</h2>
                        </div>
                        <ul class="grid mt-5">
                            <li class="list-disc text-xs font-[Roboto]">Все данные защищены 256-битным SSL шифрованием</li>
                            <li class="list-disc text-xs font-[Roboto]">Возможны комиссии платежных систем (указаны выше)</li>
                            <li class="list-disc text-xs font-[Roboto]">Средства поступают на баланс мгновенно</li>
                        </ul>
                    </div>

                </div>
            </div>
        </div>
    </Transition>
    </Teleport>
</template>

<script setup lang="ts">
const {refillBalance} = useStripe();
const amount = ref(0);
const props = defineProps<{
    show:boolean
}>()

const emit = defineEmits<{
    (e: 'confirm'): void;
    (e: 'close'): void
}>()

function closeModal(){
    emit('close');
}
</script>

<style>
::-webkit-scrollbar {
	width: 6px;
}

::-webkit-scrollbar-track {
	background: transparent;
}

::-webkit-scrollbar-thumb {
	background: #d1d5db;
	border-radius: 3px;
}

::-webkit-scrollbar-thumb:hover {
	background: #9ca3af;
}</style>