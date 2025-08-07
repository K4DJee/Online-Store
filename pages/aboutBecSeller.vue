<template>
	<section class="bg-gray-50">
		<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
			<div v-if="user" class="grid grid-cols-1 lg:grid-cols-4 gap-8">
				<!-- Sidebar Menu -->
				<ProfileSidebar />

				<!-- Main Content -->
				<div class="lg:col-span-3 space-y-8">
					<div
						class="max-w-full min-h-[260px] bg-gradient-to-r from-lime-400 via-lime-200 to-white rounded-2xl p-8.75"
					>
						<div class="flex gap-3.75 items-center">
							<div
								class="flex justify-center items-center min-w-[55px] h-[55px] bg-lime-500 rounded-[14px]"
							>
								<svg
									height="35"
									width="35"
									fill="none"
									viewBox="0 0 20 20"
									xmlns="http://www.w3.org/2000/svg"
								>
									<path
										d="M13.4756 0.667969C13.8271 0.667829 14.1754 0.736214 14.5 0.871094C14.824 1.00573 15.1176 1.20363 15.3652 1.45215L15.3662 1.45117L19.0107 5.09668C19.0175 5.10291 19.0237 5.1098 19.0303 5.11621C19.0369 5.12263 19.0434 5.12915 19.0498 5.13574C19.0858 5.1727 19.1184 5.21273 19.1484 5.25488C19.1532 5.26151 19.1585 5.26767 19.1631 5.27441C19.1665 5.27951 19.1695 5.28489 19.1729 5.29004C19.1814 5.30315 19.1894 5.31655 19.1973 5.33008C19.2045 5.34246 19.2121 5.35457 19.2188 5.36719C19.224 5.37709 19.2285 5.38736 19.2334 5.39746C19.2432 5.41762 19.2523 5.4381 19.2607 5.45898C19.2641 5.46739 19.2673 5.47586 19.2705 5.48438C19.2775 5.50304 19.2842 5.52184 19.29 5.54102C19.294 5.55383 19.2964 5.56705 19.2998 5.58008C19.3037 5.59508 19.3083 5.60986 19.3115 5.625C19.3151 5.64176 19.3176 5.65873 19.3203 5.67578C19.3221 5.68685 19.3238 5.69788 19.3252 5.70898C19.3264 5.71842 19.3282 5.72779 19.3291 5.7373C19.3297 5.7441 19.3296 5.75097 19.3301 5.75781C19.3315 5.77604 19.3326 5.79424 19.333 5.8125C19.3331 5.81932 19.334 5.82615 19.334 5.83301V8.33301C19.334 9.04019 19.0528 9.71867 18.5527 10.2188C18.2973 10.4742 17.9946 10.6708 17.666 10.8037V16.667C17.6659 17.3741 17.3858 18.0527 16.8857 18.5527C16.3857 19.0528 15.7071 19.3329 15 19.333H5C4.29291 19.333 3.61432 19.0526 3.11426 18.5527C2.61424 18.0527 2.33309 17.3741 2.33301 16.667V10.8037C2.0051 10.6708 1.70323 10.4737 1.44824 10.2188C0.948222 9.71866 0.666992 9.04019 0.666992 8.33301V5.83301C0.667015 5.73602 0.681254 5.64238 0.707031 5.55371C0.70824 5.54955 0.708697 5.54516 0.709961 5.54102C0.715839 5.52174 0.723477 5.50314 0.730469 5.48438C0.734198 5.47436 0.737149 5.46402 0.741211 5.4541C0.749134 5.43478 0.758502 5.41616 0.767578 5.39746C0.774109 5.38399 0.780915 5.37064 0.788086 5.35742C0.797857 5.33941 0.808513 5.32201 0.819336 5.30469C0.823736 5.29765 0.827439 5.29015 0.832031 5.2832L0.837891 5.27441C0.873886 5.22112 0.914634 5.17129 0.959961 5.12598L4.63477 1.45117V1.45215C4.88246 1.20344 5.17682 1.00579 5.50098 0.871094C5.82567 0.736207 6.1738 0.667786 6.52539 0.667969V0.666992H13.4756V0.667969ZM15 10.4619C14.521 10.7784 13.9664 10.9662 13.3887 10.998C13.3521 11.0001 13.3149 11.0001 13.2783 10.998C12.7006 10.9662 12.1459 10.7785 11.667 10.4619C11.188 10.7785 10.6333 10.9662 10.0557 10.998C10.0191 11.0001 9.98192 11.0001 9.94531 10.998C9.36734 10.9662 8.81215 10.7787 8.33301 10.4619C7.85406 10.7784 7.29931 10.9663 6.72168 10.998C6.68524 11 6.64874 11 6.6123 10.998C6.0344 10.9662 5.47911 10.7786 5 10.4619C4.79088 10.6001 4.56659 10.712 4.33301 10.7988V16.667C4.33309 16.8436 4.40347 17.0128 4.52832 17.1377C4.65334 17.2627 4.82319 17.333 5 17.333H6.5V15C6.50006 14.2928 6.78121 13.6143 7.28125 13.1143C7.78133 12.6142 8.45981 12.333 9.16699 12.333H10.833C11.5402 12.333 12.2187 12.6142 12.7188 13.1143C13.2188 13.6143 13.4999 14.2928 13.5 15V17.333H15C15.1767 17.3329 15.3458 17.2626 15.4707 17.1377C15.5957 17.0127 15.6659 16.8437 15.666 16.667V10.7979C15.4328 10.7111 15.2087 10.5999 15 10.4619ZM9.16699 14.333C8.99024 14.333 8.82033 14.4034 8.69531 14.5283C8.57035 14.6533 8.50006 14.8233 8.5 15V17.333H11.5V15C11.4999 14.8233 11.4297 14.6533 11.3047 14.5283C11.1797 14.4034 11.0098 14.333 10.833 14.333H9.16699ZM2.66699 6.83301V8.33301C2.66699 8.50976 2.73736 8.67967 2.8623 8.80469C2.98207 8.92437 3.14285 8.99145 3.31152 8.99707C3.56985 8.97599 3.81587 8.87712 4.01465 8.70996L4.07324 8.66406C4.34297 8.46926 4.66728 8.36433 5 8.36426L5.125 8.36914C5.37259 8.3887 5.61213 8.46646 5.82422 8.5957L5.92773 8.66406L5.98535 8.70996C6.1785 8.87248 6.41666 8.97019 6.66699 8.99512C6.91732 8.97019 7.15549 8.87248 7.34863 8.70996L7.40625 8.66406C7.67611 8.4691 8.00106 8.36426 8.33398 8.36426L8.45801 8.36914C8.74675 8.39189 9.02466 8.49356 9.26074 8.66406C9.28063 8.67843 9.30056 8.69417 9.31934 8.70996C9.51234 8.87226 9.74992 8.97015 10 8.99512C10.2504 8.97025 10.4884 8.87249 10.6816 8.70996L10.7393 8.66406C11.0091 8.46908 11.3341 8.36426 11.667 8.36426L11.791 8.36914C12.0386 8.3886 12.2781 8.46652 12.4902 8.5957L12.5947 8.66406L12.6523 8.70996C12.8453 8.87228 13.083 8.97009 13.333 8.99512C13.5834 8.97032 13.8214 8.87247 14.0146 8.70996L14.0732 8.66406C14.343 8.46926 14.6673 8.36433 15 8.36426L15.125 8.36914C15.3726 8.3887 15.6121 8.46646 15.8242 8.5957L15.9277 8.66406L15.9854 8.70996C16.184 8.87714 16.4303 8.97586 16.6885 8.99707C16.8575 8.99161 17.0187 8.92462 17.1387 8.80469C17.2636 8.67967 17.334 8.50976 17.334 8.33301V6.83301H2.66699ZM6.52441 2.66699C6.43662 2.66694 6.34965 2.68414 6.26855 2.71777C6.18735 2.75153 6.11278 2.80091 6.05078 2.86328L6.04883 2.86621L4.08203 4.83301H15.9189L13.9512 2.86621L13.9492 2.86328C13.8873 2.80106 13.8135 2.75147 13.7324 2.71777C13.6514 2.6841 13.5643 2.66698 13.4766 2.66699H6.52441Z"
										fill="#FFFFFF"
									/>
								</svg>
							</div>
							<div class="grid gap-2.5">
								<h2 class="text-2xl font-medium sm:text-4xl">
									Стать продавцом
								</h2>
								<h2 class="text-sm text-gray-500 sm:text-xl">
									Начните продавать на нашей платформе уже
									сегодня
								</h2>
							</div>
						</div>

						<div
							class="flex gap-5 flex-wrap m-auto mt-7.5 justify-center"
						>
							<div
								class="w-[240px] h-[70px] bg-white border border-gray-100 rounded-2xl p-3.75 flex gap-2.5 items-center"
							>
								<div
									class="flex justify-center items-center bg-lime-100 w-[40px] h-[40px] rounded-full"
								>
									<svg
										height="21"
										width="24"
										fill="none"
										viewBox="0 0 63 110"
										xmlns="http://www.w3.org/2000/svg"
									>
										<path
											d="M46.6013 52.0137L21.5669 44.8809C18.1659 43.9141 15.4106 41.1855 14.8725 37.6836C14.033 32.2266 18.2735 27.5 23.5904 27.5H39.4763C42.8989 27.5 46.2568 28.5742 49.0337 30.5293C50.4113 31.4961 52.2625 31.3457 53.4464 30.1641L58.3758 25.2441C59.8395 23.7832 59.6888 21.334 58.0529 20.0664C52.7361 15.9629 46.2784 13.75 39.4763 13.75H38.8736V3.4375C38.8736 1.54687 37.3237 0 35.4295 0H28.5413C26.647 0 25.0971 1.54687 25.0971 3.4375V13.75H24.559C13.9684 13.75 4.19575 20.582 1.65573 30.8516C-1.33633 42.9258 6.00391 54.7422 17.3694 57.9863L42.4038 65.1191C45.8048 66.0859 48.5601 68.8145 49.0982 72.3164C49.9377 77.7734 45.6972 82.5 40.3804 82.5H24.4944C21.0719 82.5 17.7139 81.4258 14.937 79.4707C13.5594 78.5039 11.7082 78.6543 10.5243 79.8359L5.59492 84.7559C4.13118 86.2168 4.28186 88.666 5.91781 89.9336C11.2131 94.0371 17.6708 96.25 24.4944 96.25H25.0971V106.562C25.0971 108.453 26.647 110 28.5413 110H35.4295C37.3237 110 38.8736 108.453 38.8736 106.562V96.25H39.4117C50.0023 96.25 59.7749 89.418 62.315 79.1484C65.307 67.0742 57.9668 55.2578 46.6013 52.0137Z"
											fill="#7CCF00"
										/>
									</svg>
								</div>
								<div class="grid items-center">
									<h2 class="font-medium text-base">
										Высокий доход
									</h2>
									<h2 class="text-gray-500 text-sm">
										До 15% комиссии
									</h2>
								</div>
							</div>
							<div
								class="w-[240px] h-[70px] bg-white border border-gray-100 rounded-2xl p-3.75 flex gap-2.5 items-center"
							>
								<div
									class="flex justify-center items-center bg-lime-100 w-[40px] h-[40px] rounded-full"
								>
									<svg
										height="22"
										width="22"
										fill="none"
										viewBox="0 0 82 75"
										xmlns="http://www.w3.org/2000/svg"
									>
										<path
											d="M41.2227 45.167C46.0996 45.1671 50.7771 47.1042 54.2256 50.5527C57.674 54.0012 59.6113 58.6788 59.6113 63.5557V71C59.6112 72.9328 58.0442 74.4999 56.1113 74.5C54.1784 74.5 52.6115 72.9329 52.6113 71V63.5557C52.6113 60.5353 51.411 57.6387 49.2754 55.5029C47.1397 53.3672 44.243 52.1671 41.2227 52.167H18.8887C15.8682 52.1671 12.9717 53.3672 10.8359 55.5029C8.70023 57.6387 7.50006 60.5353 7.5 63.5557V71C7.49987 72.9329 5.93292 74.5 4 74.5C2.06708 74.5 0.500132 72.9329 0.5 71V63.5557C0.50006 58.6788 2.43729 54.0013 5.88574 50.5527C9.33427 47.1042 14.0117 45.1671 18.8887 45.167H41.2227ZM63.8896 48.2754C64.3578 46.4624 66.1636 45.3493 67.9775 45.7207L68.1533 45.7617L68.5215 45.8604C72.3155 46.9243 75.6715 49.1803 78.0898 52.2998C80.586 55.5199 81.9423 59.4784 81.9453 63.5527V71C81.9451 72.9327 80.378 74.4998 78.4453 74.5C76.5124 74.5 74.9455 72.9328 74.9453 71V63.5576L74.9346 63.0859C74.8351 60.7302 74.0069 58.4585 72.5576 56.5889C71.1083 54.7193 69.1149 53.3506 66.8584 52.667L66.4033 52.5391L66.2305 52.4902C64.4631 51.9374 63.4216 50.0886 63.8896 48.2754ZM30.0547 0.5C40.2105 0.5 48.4432 8.73287 48.4434 18.8887C48.4434 29.0446 40.2106 37.2773 30.0547 37.2773C19.8989 37.2772 11.666 29.0445 11.666 18.8887C11.6661 8.73294 19.899 0.500123 30.0547 0.5ZM52.7236 3.59863C53.2087 1.72759 55.1182 0.603977 56.9893 1.08887C60.9325 2.11116 64.425 4.41403 66.918 7.63574C69.4107 10.8573 70.7636 14.8153 70.7637 18.8887C70.7636 22.9622 69.4109 26.9209 66.918 30.1426C64.425 33.3642 60.9325 35.6672 56.9893 36.6895C55.1183 37.1742 53.2088 36.0505 52.7236 34.1797C52.2386 32.3086 53.3623 30.3982 55.2334 29.9131C57.6754 29.2799 59.8379 27.8535 61.3818 25.8584C62.9257 23.8632 63.7636 21.4115 63.7637 18.8887C63.7636 16.3659 62.9257 13.9142 61.3818 11.9189C59.8379 9.92386 57.6754 8.49741 55.2334 7.86426C53.3624 7.37922 52.2389 5.46961 52.7236 3.59863ZM30.0547 7.5C23.765 7.50012 18.6661 12.5989 18.666 18.8887C18.666 25.1785 23.7649 30.2772 30.0547 30.2773C36.3446 30.2773 41.4434 25.1786 41.4434 18.8887C41.4432 12.5989 36.3445 7.5 30.0547 7.5Z"
											fill="#7CCF00"
										/>
									</svg>
								</div>
								<div class="grid items-center">
									<h2 class="font-medium text-base">
										Миллионы клиентов
									</h2>
									<h2 class="text-gray-500 text-sm">
										Широкая аудитория
									</h2>
								</div>
							</div>
							<div
								class="w-[240px] h-[70px] bg-white border border-gray-100 rounded-2xl p-3.75 flex gap-2.5 items-center"
							>
								<div
									class="flex justify-center items-center bg-lime-100 w-[40px] h-[40px] rounded-full"
								>
									<svg
										height="21"
										width="24"
										fill="none"
										viewBox="0 0 106 112"
										xmlns="http://www.w3.org/2000/svg"
									>
										<path
											d="M53 0C54.0157 0 55.0316 0.21987 55.959 0.637695L97.542 18.2119C102.4 20.2574 106.022 25.0304 106 30.793C105.89 52.6123 96.8792 92.5346 58.8076 110.681C55.12 112.44 50.8361 112.44 47.1484 110.681C9.12101 92.5346 0.110416 52.6123 0 30.793C-0.0219001 25.0304 3.59981 20.2574 8.45801 18.2119L50.0635 0.637695C50.9688 0.21993 51.9844 1.43264e-05 53 0ZM52.5 9C51.6664 9.00001 50.8328 9.18243 50.0898 9.5293L15.9424 24.1221C11.9549 25.8206 8.98195 29.7843 9 34.5693C9.09062 52.6872 16.4861 85.8365 47.6973 100.904C50.724 102.365 54.2399 102.365 57.2666 100.904C88.514 85.8365 95.9094 52.6872 96 34.5693C96.018 29.7843 93.0459 25.8206 89.0586 24.1221L54.9287 9.5293C54.1675 9.18235 53.3337 9 52.5 9Z"
											fill="#7CCF00"
										/>
									</svg>
								</div>
								<div class="grid items-center">
									<h2 class="font-medium text-base">
										Безопасность
									</h2>
									<h2 class="text-gray-500 text-sm">
										Защищенные платежи
									</h2>
								</div>
							</div>
						</div>
					</div>

					<div
						class="max-w-full min-h-[280px] bg-white border border-gray-200 rounded-2xl p-5"
					>
						<h2 class="font-medium text-center sm:text-2xl">
							Регистрация продавца
						</h2>
						<h2 class="text-gray-500 text-center sm:text-base">
							Заполните форму для создания магазина
						</h2>

						<div class="flex flex-wrap justify-center mt-5 gap-y-5">
							<ul
								class="grid gap-2.5 w-[330px] lg:w-1/2 lg:px-2.5 md:px-2.5 md:w-1/2"
							>
								<li class="grid w-full">
									<label
										for="shopName"
										class="font-[Roboto] font-medium"
										>Название магазина *</label
									>
									<input
										id="shopName"
										type="text"
										placeholder="Введите название вашего магазина"
										class="border-2 border-gray-200 px-2.5 py-1.25 text-[15px] rounded-lg focus:border-lime-400 focus:border-2 focus:ring-2 focus:ring-lime-100 transition-colors font-[Roboto] min-h-[38px]"
									/>
								</li>
								<li class="grid w-full">
									<label
										for="shopEmail"
										class="font-[Roboto] font-medium"
										>Ваша почта *</label
									>
									<input
										id="shopEmail"
										type="text"
										placeholder="Введите свой email"
										class="border-2 border-gray-200 px-2.5 py-1.25 text-[15px] rounded-lg focus:border-lime-400 focus:border-2 focus:ring-2 focus:ring-lime-100 transition-colors font-[Roboto] min-h-[38px]"
									/>
								</li>
								<li class="grid w-full">
									<label
										for="shopPass"
										class="font-[Roboto] font-medium"
										>Название магазина *</label
									>
									<input
										id="shopPass"
										type="text"
										placeholder="Придумайте пароль"
										class="border-2 border-gray-200 px-2.5 py-1.25 text-[15px] rounded-lg focus:border-lime-400 focus:border-2 focus:ring-2 focus:ring-lime-100 transition-colors font-[Roboto] min-h-[38px]"
									/>
								</li>
							</ul>

<<<<<<< HEAD
							<div
								class="grid mb-10 w-[330px] lg:w-1/2 max-h-[100px] lg:px-2.5 md:px-2.5 md:w-1/2"
							>
								<label
									for="shopDescription"
									class="font-[Roboto] font-medium"
									>Описание магазина *</label
								>
								<textarea
									id="shopDescription"
									class="resize-none border-2 border-gray-200 px-2.5 py-1.25 text-[15px] rounded-lg focus:border-lime-400 focus:ring-2 focus:ring-lime-100 transition-colors font-[Roboto] h-[120px] outline-0"
								></textarea>
							</div>
						</div>
=======
                        <div class="flex flex-wrap justify-center mt-5 gap-y-5">
                            <ul class="grid gap-2.5 w-[330px] lg:w-1/2 lg:px-2.5 md:px-2.5 md:w-1/2">
                                <li class="grid w-full">
                                    <label for="shopName" class="font-[Roboto] font-medium">Название магазина *</label>
                                    <input id="shopName" type="text" 
                                    placeholder="Введите название вашего магазина" 
                                    class="border-2 border-gray-200 px-2.5 py-1.25 text-[15px] rounded-lg focus:border-lime-400 focus:border-2 focus:ring-2 focus:ring-lime-100 transition-colors font-[Roboto] min-h-[38px]">
                                </li>
                                <li class="grid w-full">
                                    <label for="shopEmail" class="font-[Roboto] font-medium">Ваша почта *</label>
                                    <input id="shopEmail" type="text" 
                                    placeholder="Введите свой email" 
                                    class="border-2 border-gray-200 px-2.5 py-1.25 text-[15px] rounded-lg focus:border-lime-400 focus:border-2 focus:ring-2 focus:ring-lime-100 transition-colors font-[Roboto] min-h-[38px]">
                                </li>
                                <li class="grid w-full">
                                    <label for="shopPass" class="font-[Roboto] font-medium">Название магазина *</label>
                                    <input id="shopPass" type="text"
                                    placeholder="Придумайте пароль" 
                                    class="border-2 border-gray-200 px-2.5 py-1.25 text-[15px] rounded-lg focus:border-lime-400 focus:border-2 focus:ring-2 focus:ring-lime-100 transition-colors font-[Roboto] min-h-[38px]">
                                </li>
                            </ul>
                            
                            <div class="grid  mb-10  w-[330px] lg:w-1/2  max-h-[100px] lg:px-2.5 md:px-2.5 md:w-1/2">
                                <label for="shopDescription" class="font-[Roboto] font-medium">Описание магазина *</label>
                                <textarea id="shopDescription" class="resize-none border-2 border-gray-200 px-2.5 py-1.25 text-[15px] rounded-lg focus:border-lime-400 focus:ring-2 focus:ring-lime-100 transition-colors font-[Roboto] h-[120px] outline-0"></textarea>
                            </div>
                        </div>
>>>>>>> 2a795a1ec9caaf21f816718b97a380cc705ad0b4

						<div class="border-b mt-5 border-b-gray-200"></div>

						<div class="mt-5 flex justify-center">
							<button
								class="flex gap-2.5 items-center justify-center cursor-pointer w-full bg-gradient-to-r to-lime-200 via-lime-300 from-lime-200 text-white text-base sm:text-lg font-[Roboto] rounded-2xl h-[45px]"
							>
								Зарегистрироваться как продавец
								<svg
									height="24"
									width="22"
									fill="none"
									viewBox="0 0 22 13"
									xmlns="http://www.w3.org/2000/svg"
								>
									<path
										d="M15.2734 0.907471C15.5035 0.696937 15.8773 0.696963 16.1074 0.907471L21.8271 6.11841C22.0573 6.32896 22.0573 6.6706 21.8271 6.8811L16.1074 12.092C15.8773 12.3025 15.5036 12.3025 15.2734 12.092L14.9268 11.7747C14.6966 11.5641 14.6966 11.2225 14.9268 11.012L19.0479 7.26392H0.588867C0.263729 7.26371 0.000165633 7.02229 0 6.72485V6.27563C0 5.97807 0.263627 5.73678 0.588867 5.73657H19.0479L14.9268 1.98755C14.6967 1.77702 14.6967 1.43633 14.9268 1.22583L15.2734 0.907471Z"
										fill="white"
									/>
								</svg>
							</button>
						</div>
					</div>

					<ul class="flex flex-wrap gap-11.5 justify-center">
						<li
							class="w-[270px] min-h-[240px] bg-white rounded-2xl border border-gray-200 p-5 hover:shadow-sm transition-shadow"
						>
							<div class="flex gap-2.5 items-center">
								<div
									class="flex justify-center items-center w-[40px] h-[40px] rounded-lg bg-lime-100"
								>
									<svg
										height="20"
										width="20"
										fill="none"
										viewBox="0 0 20 20"
										xmlns="http://www.w3.org/2000/svg"
									>
										<path
											d="M1 0C1.55228 0 2 0.447715 2 1V17C2 17.2652 2.10543 17.5195 2.29297 17.707C2.48051 17.8946 2.73478 18 3 18H19C19.5523 18 20 18.4477 20 19C20 19.5523 19.5523 20 19 20H3C2.20435 20 1.44152 19.6837 0.878906 19.1211C0.316297 18.5585 0 17.7956 0 17V1C0 0.447715 0.447715 0 1 0ZM6 11C6.55228 11 7 11.4477 7 12V15C7 15.5523 6.55228 16 6 16C5.44772 16 5 15.5523 5 15V12C5 11.4477 5.44772 11 6 11ZM11 2C11.5523 2 12 2.44772 12 3V15C12 15.5523 11.5523 16 11 16C10.4477 16 10 15.5523 10 15V3C10 2.44772 10.4477 2 11 2ZM16 6C16.5523 6 17 6.44772 17 7V15C17 15.5523 16.5523 16 16 16C15.4477 16 15 15.5523 15 15V7C15 6.44772 15.4477 6 16 6Z"
											fill="#7CCF00"
										/>
									</svg>
								</div>
								<h2 class="font-medium text-lg">
									Аналитика продаж
								</h2>
							</div>
							<h2 class="text-gray-500 mt-2.5">
								Подробная статистика и отчеты для оптимизации
								вашего бизнеса
							</h2>
						</li>
						<li
							class="w-[270px] min-h-[240px] bg-white rounded-2xl border border-gray-200 p-5 hover:shadow-sm transition-shadow"
						>
							<div class="flex gap-2.5 items-center">
								<div
									class="flex justify-center items-center min-w-[40px] h-[40px] rounded-lg bg-lime-100"
								>
									<svg
										height="22"
										width="22"
										fill="none"
										viewBox="0 0 22 22"
										xmlns="http://www.w3.org/2000/svg"
									>
										<path
											d="M11 0C17.0751 0 22 4.92487 22 11C22 17.0751 17.0751 22 11 22C4.92487 22 0 17.0751 0 11C0 4.92487 4.92487 0 11 0ZM11 2C6.02944 2 2 6.02944 2 11C2 15.9706 6.02944 20 11 20C15.9706 20 20 15.9706 20 11C20 6.02944 15.9706 2 11 2ZM11 4C14.866 4 18 7.13401 18 11C18 14.866 14.866 18 11 18C7.13401 18 4 14.866 4 11C4 7.13401 7.13401 4 11 4ZM11 6C8.23858 6 6 8.23858 6 11C6 13.7614 8.23858 16 11 16C13.7614 16 16 13.7614 16 11C16 8.23858 13.7614 6 11 6ZM11 8C12.6569 8 14 9.34315 14 11C14 12.6569 12.6569 14 11 14C9.34315 14 8 12.6569 8 11C8 9.34315 9.34315 8 11 8ZM11 10C10.4477 10 10 10.4477 10 11C10 11.5523 10.4477 12 11 12C11.5523 12 12 11.5523 12 11C12 10.4477 11.5523 10 11 10Z"
											fill="#7CCF00"
										/>
									</svg>
								</div>
								<h2 class="font-medium text-lg">
									Маркетинговые инструменты
								</h2>
							</div>
							<h2 class="text-gray-500 mt-2.5">
								Промо-акции, скидки и реклама для увеличения
								продаж
							</h2>
						</li>
						<li
							class="w-[270px] min-h-[240px] bg-white rounded-2xl border border-gray-200 p-5 hover:shadow-sm transition-shadow"
						>
							<div class="flex gap-2.5 items-center">
								<div
									class="flex justify-center items-center w-[40px] h-[40px] rounded-lg bg-lime-100"
								>
									<svg
										height="22"
										width="20"
										fill="none"
										viewBox="0 0 20 22"
										xmlns="http://www.w3.org/2000/svg"
									>
										<path
											d="M11.2286 0.0251496C11.5215 -0.0290069 11.823 0.00478694 12.0948 0.121829L12.2091 0.177493L12.3184 0.241946C12.5311 0.380056 12.7049 0.570025 12.8243 0.793704L12.88 0.907962L12.9249 1.0271C13.018 1.30765 13.0262 1.61036 12.9474 1.89722C12.9438 1.91015 12.9407 1.92351 12.9366 1.93628L11.0167 7.95581L11.0001 8.00269H18.003C18.3805 8.00195 18.7507 8.10768 19.0704 8.30835C19.3909 8.50955 19.6473 8.79806 19.8106 9.13941C19.9739 9.48077 20.0377 9.86127 19.9933 10.2371C19.9488 10.6129 19.7981 10.9685 19.5597 11.2625C19.5411 11.2854 19.5216 11.3077 19.5011 11.3289L9.60067 21.5291L9.5997 21.5281C9.38098 21.762 9.09425 21.9218 8.77841 21.9802C8.44388 22.0421 8.09794 21.9884 7.79794 21.8279C7.49796 21.6674 7.26127 21.409 7.12704 21.0964C6.99296 20.7839 6.96947 20.4351 7.05966 20.1072L7.0704 20.0681L8.99032 14.0486L9.00692 14.0027H2.00302V14.0017C1.62592 14.0022 1.25605 13.8966 0.936611 13.696C0.616324 13.4949 0.359698 13.2071 0.196376 12.866C0.03302 12.5246 -0.0306495 12.1432 0.013759 11.7673C0.0582164 11.3916 0.208999 11.0358 0.447353 10.7419C0.465903 10.7191 0.485456 10.6967 0.505947 10.6755L10.4063 0.476321C10.625 0.242298 10.9127 0.0836142 11.2286 0.0251496ZM2.00595 12.0027H9.00302C9.32555 12.0021 9.6436 12.0794 9.92977 12.2283C10.2167 12.3775 10.4637 12.5937 10.6485 12.8591C10.8334 13.1246 10.9509 13.4317 10.9913 13.7527C11.0296 14.0573 10.9939 14.3653 10.8936 14.655L10.8966 14.656L9.62997 18.6267L18.0011 10.0027H11.003V10.0017C10.6809 10.0021 10.3631 9.92577 10.0772 9.7771C9.79026 9.62781 9.54333 9.41074 9.35849 9.14527C9.17376 8.8799 9.05617 8.57348 9.01571 8.25269C8.97728 7.94768 9.01191 7.63847 9.11239 7.34839H9.11044L10.3761 3.37671L2.00595 12.0027Z"
											fill="#7CCF00"
										/>
									</svg>
								</div>
								<h2 class="font-medium text-lg">
									Быстрый старт
								</h2>
							</div>
							<h2 class="text-gray-500 mt-2.5">
								Начните продавать в течение 24 часов после
								регистрации
							</h2>
						</li>
					</ul>

					<div
						class="min-h-[240px] bg-white rounded-2xl border border-gray-200 p-5"
					>
						<h2 class="text-center font-medium text-xl">
							Как стать продавцом
						</h2>

						<ul class="flex mt-5 flex-wrap justify-center gap-y-5">
							<li class="w-[287px] lg:w-1/3">
								<div
									class="m-auto flex items-center justify-center bg-lime-500 w-[60px] h-[60px] rounded-full"
								>
									<h2 class="text-white font-medium text-2xl">
										1
									</h2>
								</div>
								<h2
									class="mt-2.5 text-center font-medium text-lg"
								>
									Регистрация
								</h2>

								<h2 class="text-gray-500 text-center mt-2">
									Заполните форму выше и отправьте заявку
								</h2>
							</li>
							<li class="w-[287px] lg:w-1/3">
								<div
									class="m-auto flex items-center justify-center bg-lime-500 w-[60px] h-[60px] rounded-full"
								>
									<h2 class="text-white font-medium text-2xl">
										2
									</h2>
								</div>
								<h2
									class="mt-2.5 text-center font-medium text-lg"
								>
									Проверка
								</h2>

								<h2 class="text-gray-500 text-center mt-2">
									Мы проверим ваши данные в течение 1-2
									рабочих дней
								</h2>
							</li>
							<li class="w-[287px] lg:w-1/3">
								<div
									class="m-auto flex items-center justify-center bg-lime-500 w-[60px] h-[60px] rounded-full"
								>
									<h2 class="text-white font-medium text-2xl">
										3
									</h2>
								</div>
								<h2
									class="mt-2.5 text-center font-medium text-lg"
								>
									Начало продаж
								</h2>

								<h2 class="text-gray-500 text-center mt-2">
									Добавляйте товары и начинайте зарабатывать
								</h2>
							</li>
						</ul>
					</div>

					<div
						class="bg-lime-50 border border-gray-200 min-h-[180px] rounded-2xl p-5"
					>
						<h2 class="text-center font-medium text-2xl">
							Присоединяйтесь к успешным продавцам
						</h2>
						<h2 class="text-center text-gray-500">
							Наша платформа помогает тысячам продавцов расти
						</h2>

						<ul
							class="flex mt-5 flex-wrap justify-center gap-5 lg:gap-0"
						>
							<li class="grid lg:w-1/4">
								<h2
									class="text-lime-500 text-3xl font-medium text-center"
								>
									50К+
								</h2>
								<h2 class="text-gray-500 text-center text-base">
									Активных продавцов
								</h2>
							</li>

							<li class="grid lg:w-1/4">
								<h2
									class="text-lime-500 text-3xl font-medium text-center"
								>
									₽2.5M
								</h2>
								<h2 class="text-gray-500 text-center text-base">
									Средний доход в месяц
								</h2>
							</li>

							<li class="grid lg:w-1/4">
								<h2
									class="text-lime-500 text-3xl font-medium text-center"
								>
									98%
								</h2>
								<h2 class="text-gray-500 text-center text-base">
									Довольных клиентов
								</h2>
							</li>

							<li class="grid lg:w-1/4">
								<h2
									class="text-lime-500 text-3xl font-medium text-center"
								>
									24/7
								</h2>
								<h2 class="text-gray-500 text-center text-base">
									Поддержка
								</h2>
							</li>
						</ul>
					</div>
				</div>
			</div>
		</div>
	</section>
</template>
<script setup lang="ts">
const profileStore = useProfileStore()
const { user } = storeToRefs(profileStore)
import ProfileSidebar from '~/features/profile/profile-sidebar/ui/ProfileSidebar.vue'
</script>
<style></style>
