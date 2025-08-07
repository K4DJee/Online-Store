<template>
  <section class="bg-gray-50">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div v-if="user" class="grid grid-cols-1 lg:grid-cols-4 gap-8">
        <!-- Sidebar Menu -->
        <ProfileSidebar />

        <!-- Main Content -->
        <div class="lg:col-span-3 space-y-8">
          <div
            class="flex justify-between flex-wrap gap-5 bg-gradient-to-r from-white via-lime-50 to-lime-100 min-h-[225px] border border-gray-200 rounded-2xl p-5"
          >
            <div class="grid items-center">
              <div class="grid gap-2.5">
                <div class="flex gap-2.5 items-center">
                  <svg
                    height="26"
                    width="27"
                    fill="none"
                    viewBox="0 0 27 26"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M20.2861 0C20.892 0.00022189 21.4739 0.241464 21.9023 0.669922C22.3305 1.0985 22.5713 1.68032 22.5713 2.28613V5.14258H22.8574C23.4634 5.14276 24.0451 5.38401 24.4736 5.8125C24.9019 6.2411 25.1426 6.8228 25.1426 7.42871V11.8037C25.3685 11.9137 25.5778 12.0602 25.7588 12.2412C26.1872 12.6698 26.4287 13.2514 26.4287 13.8574V16.4287C26.4286 17.0347 26.1873 17.6164 25.7588 18.0449C25.578 18.2257 25.3681 18.3696 25.1426 18.4795V22.8574C25.1424 23.4633 24.9021 24.0451 24.4736 24.4736C24.0451 24.9021 23.4633 25.1424 22.8574 25.1426H3.57129C2.6243 25.1425 1.7156 24.7662 1.0459 24.0967C0.376235 23.427 7.39209e-05 22.5184 0 21.5713V3.57129C3.69355e-05 2.62414 0.376158 1.71564 1.0459 1.0459C1.71564 0.376158 2.62414 3.69355e-05 3.57129 0H20.2861ZM2 21.5713C2.00007 21.9879 2.16537 22.388 2.45996 22.6826C2.7546 22.9771 3.15474 23.1425 3.57129 23.1426H22.8574C22.933 23.1424 23.0062 23.112 23.0596 23.0586C23.1127 23.0052 23.1424 22.9327 23.1426 22.8574V18.7139H20.2861C19.3392 18.7139 18.4305 18.3374 17.7607 17.668C17.0911 16.9983 16.714 16.0896 16.7139 15.1426C16.7139 14.1955 17.091 13.2869 17.7607 12.6172C18.4305 11.9476 19.3391 11.5713 20.2861 11.5713H23.1426V7.42871C23.1426 7.35323 23.1128 7.28008 23.0596 7.22656C23.0062 7.17315 22.9329 7.14276 22.8574 7.14258H3.57129C3.02148 7.14256 2.48462 7.01469 2 6.77734V21.5713ZM20.2861 13.5713C19.8695 13.5713 19.4695 13.7368 19.1748 14.0312C18.8802 14.3259 18.7139 14.7259 18.7139 15.1426C18.714 15.5592 18.8802 15.9593 19.1748 16.2539C19.4695 16.5483 19.8696 16.7139 20.2861 16.7139H24.1426C24.2181 16.7138 24.2913 16.6842 24.3447 16.6309C24.3982 16.5774 24.4286 16.5043 24.4287 16.4287V13.8574C24.4287 13.7818 24.398 13.7088 24.3447 13.6553C24.2912 13.6018 24.2182 13.5714 24.1426 13.5713H20.2861ZM3.57129 2C3.15457 2.00004 2.75463 2.16529 2.45996 2.45996C2.16529 2.75463 2.00004 3.15457 2 3.57129C2.00011 3.98784 2.16545 4.38803 2.45996 4.68262C2.75459 4.97702 3.15477 5.14254 3.57129 5.14258H20.5713V2.28613C20.5713 2.21055 20.5406 2.13752 20.4873 2.08398C20.4339 2.03064 20.3616 2.00022 20.2861 2H3.57129Z"
                      fill="#5EA500"
                    />
                  </svg>
                  <h2 class="text-lg text-gray-500 font-medium">
                    Текущий баланс
                  </h2>
                </div>

                <h2 class="text-3xl font-medium">{{ user.balance }} ₽</h2>

                <h2 class="text-gray-500">Доступно для использования</h2>
              </div>
            </div>

            <div class="grid items-center">
              <div class="grid gap-2.5">
                <button
                  @click="showReplenishmentModal = true"
                  class="flex items-center justify-center gap-2.5 py-1.25 w-[150px] bg-lime-500 rounded-lg hover:bg-lime-600 text-white border-gray-200 cursor-pointer transition-colors"
                >
                  <svg
                    height="10"
                    width="10"
                    fill="none"
                    viewBox="0 0 12 12"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M10.293 0.292969C10.6835 -0.0975555 11.3165 -0.0975555 11.707 0.292969C12.0976 0.683493 12.0976 1.31651 11.707 1.70703L3.41406 10H11C11.5523 10 12 10.4477 12 11C12 11.5523 11.5523 12 11 12H1C0.943333 12 0.888079 11.9934 0.833984 11.9844C0.823582 11.9826 0.813088 11.9816 0.802734 11.9795C0.791231 11.9772 0.779911 11.9744 0.768555 11.9717C0.747986 11.9668 0.727318 11.9623 0.707031 11.9561C0.65838 11.9412 0.61159 11.9222 0.566406 11.9004C0.526617 11.8812 0.487681 11.8597 0.450195 11.835C0.312548 11.7441 0.198874 11.6203 0.120117 11.4746C0.11269 11.4609 0.106345 11.4466 0.0996094 11.4326C0.0778027 11.3873 0.057833 11.3408 0.0429688 11.292C0.0302967 11.2503 0.0217632 11.2077 0.0146484 11.165C0.00571338 11.1113 0 11.0563 0 11V1C0 0.447715 0.447715 0 1 0C1.55228 0 2 0.447715 2 1V8.58594L10.293 0.292969Z"
                      fill="white"
                    />
                  </svg>
                  Пополнить
                </button>
                <button
                  class="flex items-center justify-center gap-2.5 py-1.25 w-[150px] bg-white rounded-lg text-black border border-gray-200 cursor-pointer"
                >
                  <svg
                    height="10"
                    width="10"
                    fill="none"
                    viewBox="0 0 12 12"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M11 0C11.0563 0 11.1113 0.00571338 11.165 0.0146484C11.1738 0.0161084 11.1827 0.0168607 11.1914 0.0185547L11.2012 0.0205078C11.211 0.0225203 11.2207 0.025044 11.2305 0.0273438C11.251 0.032196 11.2717 0.0367993 11.292 0.0429688C11.3408 0.057833 11.3873 0.0778027 11.4326 0.0996094C11.4466 0.106345 11.4609 0.11269 11.4746 0.120117C11.6203 0.198874 11.7441 0.312548 11.835 0.450195C11.8597 0.487681 11.8812 0.526617 11.9004 0.566406C11.9222 0.61159 11.9412 0.65838 11.9561 0.707031C11.9623 0.727318 11.9668 0.747986 11.9717 0.768555C11.9893 0.842936 12 0.92022 12 1V11C12 11.5523 11.5523 12 11 12C10.4477 12 10 11.5523 10 11V3.41406L1.70703 11.707C1.31651 12.0976 0.683493 12.0976 0.292969 11.707C-0.0975555 11.3165 -0.0975555 10.6835 0.292969 10.293L8.58594 2H1C0.447715 2 0 1.55228 0 1C0 0.447715 0.447715 0 1 0H11Z"
                      fill="black"
                    />
                  </svg>
                  Вывести
                </button>
              </div>
            </div>
          </div>

          <ul
            class="flex justify-center gap-5 flex-wrap md:flex-nowrap md:justify-between"
          >
            <li
              @click="showReplenishmentModal = true"
              class="relative grid gap-5 p-5 w-full md:w-[432px] bg-white rounded-2xl min-h-[125px] border border-gray-200 cursor-pointer hover:shadow-sm transition-shadow"
            >
              <div class="flex gap-2.5 items-center">
                <div
                  class="w-[35px] h-[35px] bg-gray-100 flex items-center justify-center rounded-sm"
                >
                  <svg
                    height="12"
                    width="12"
                    fill="none"
                    viewBox="0 0 12 12"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M10.293 0.292969C10.6835 -0.0975555 11.3165 -0.0975555 11.707 0.292969C12.0976 0.683493 12.0976 1.31651 11.707 1.70703L3.41406 10H11C11.5523 10 12 10.4477 12 11C12 11.5523 11.5523 12 11 12H1C0.943333 12 0.888079 11.9934 0.833984 11.9844C0.823582 11.9826 0.813088 11.9816 0.802734 11.9795C0.791231 11.9772 0.779911 11.9744 0.768555 11.9717C0.747986 11.9668 0.727318 11.9623 0.707031 11.9561C0.65838 11.9412 0.61159 11.9222 0.566406 11.9004C0.526617 11.8812 0.487681 11.8597 0.450195 11.835C0.312548 11.7441 0.198874 11.6203 0.120117 11.4746C0.11269 11.4609 0.106345 11.4466 0.0996094 11.4326C0.0778027 11.3873 0.057833 11.3408 0.0429688 11.292C0.0302967 11.2503 0.0217632 11.2077 0.0146484 11.165C0.00571338 11.1113 0 11.0563 0 11V1C0 0.447715 0.447715 0 1 0C1.55228 0 2 0.447715 2 1V8.58594L10.293 0.292969Z"
                      fill="#7CCF00"
                    />
                  </svg>
                </div>
                <h2 class="font-medium">Пополнить баланс</h2>
              </div>

              <h2 class="text-gray-500 text-sm">
                Пополняйте баланс с банковской карты, через СБП или банковский
                перевод
              </h2>

              <div
                class="absolute top-5 right-5 size-3.75 flex items-center justify-center"
              >
                <svg
                  height="10"
                  width="10"
                  fill="none"
                  viewBox="0 0 12 12"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M11 0C11.0563 0 11.1113 0.00571338 11.165 0.0146484C11.1738 0.0161084 11.1827 0.0168607 11.1914 0.0185547L11.2012 0.0205078C11.211 0.0225203 11.2207 0.025044 11.2305 0.0273438C11.251 0.032196 11.2717 0.0367993 11.292 0.0429688C11.3408 0.057833 11.3873 0.0778027 11.4326 0.0996094C11.4466 0.106345 11.4609 0.11269 11.4746 0.120117C11.6203 0.198874 11.7441 0.312548 11.835 0.450195C11.8597 0.487681 11.8812 0.526617 11.9004 0.566406C11.9222 0.61159 11.9412 0.65838 11.9561 0.707031C11.9623 0.727318 11.9668 0.747986 11.9717 0.768555C11.9893 0.842936 12 0.92022 12 1V11C12 11.5523 11.5523 12 11 12C10.4477 12 10 11.5523 10 11V3.41406L1.70703 11.707C1.31651 12.0976 0.683493 12.0976 0.292969 11.707C-0.0975555 11.3165 -0.0975555 10.6835 0.292969 10.293L8.58594 2H1C0.447715 2 0 1.55228 0 1C0 0.447715 0.447715 0 1 0H11Z"
                    fill="gray"
                  />
                </svg>
              </div>
            </li>
            <li
              class="relative grid gap-5 p-5 w-full md:w-[432px] bg-white rounded-2xl min-h-[125px] border border-gray-200 cursor-pointer hover:shadow-sm transition-shadow"
            >
              <div class="flex gap-2.5 items-center">
                <div
                  class="w-[35px] h-[35px] bg-gray-100 flex items-center justify-center rounded-sm"
                >
                  <svg
                    height="12"
                    width="12"
                    fill="none"
                    viewBox="0 0 12 12"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M11 0C11.0563 0 11.1113 0.00571338 11.165 0.0146484C11.1738 0.0161084 11.1827 0.0168607 11.1914 0.0185547L11.2012 0.0205078C11.211 0.0225203 11.2207 0.025044 11.2305 0.0273438C11.251 0.032196 11.2717 0.0367993 11.292 0.0429688C11.3408 0.057833 11.3873 0.0778027 11.4326 0.0996094C11.4466 0.106345 11.4609 0.11269 11.4746 0.120117C11.6203 0.198874 11.7441 0.312548 11.835 0.450195C11.8597 0.487681 11.8812 0.526617 11.9004 0.566406C11.9222 0.61159 11.9412 0.65838 11.9561 0.707031C11.9623 0.727318 11.9668 0.747986 11.9717 0.768555C11.9893 0.842936 12 0.92022 12 1V11C12 11.5523 11.5523 12 11 12C10.4477 12 10 11.5523 10 11V3.41406L1.70703 11.707C1.31651 12.0976 0.683493 12.0976 0.292969 11.707C-0.0975555 11.3165 -0.0975555 10.6835 0.292969 10.293L8.58594 2H1C0.447715 2 0 1.55228 0 1C0 0.447715 0.447715 0 1 0H11Z"
                      fill="#155DFC"
                    />
                  </svg>
                </div>
                <h2 class="font-medium">Вывести средства</h2>
              </div>

              <h2 class="text-gray-500 text-sm">
                Выводите средства на банковскую карту или счет
              </h2>

              <div
                class="absolute top-5 right-5 size-3.75 flex items-center justify-center"
              >
                <svg
                  height="10"
                  width="10"
                  fill="none"
                  viewBox="0 0 12 12"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M11 0C11.0563 0 11.1113 0.00571338 11.165 0.0146484C11.1738 0.0161084 11.1827 0.0168607 11.1914 0.0185547L11.2012 0.0205078C11.211 0.0225203 11.2207 0.025044 11.2305 0.0273438C11.251 0.032196 11.2717 0.0367993 11.292 0.0429688C11.3408 0.057833 11.3873 0.0778027 11.4326 0.0996094C11.4466 0.106345 11.4609 0.11269 11.4746 0.120117C11.6203 0.198874 11.7441 0.312548 11.835 0.450195C11.8597 0.487681 11.8812 0.526617 11.9004 0.566406C11.9222 0.61159 11.9412 0.65838 11.9561 0.707031C11.9623 0.727318 11.9668 0.747986 11.9717 0.768555C11.9893 0.842936 12 0.92022 12 1V11C12 11.5523 11.5523 12 11 12C10.4477 12 10 11.5523 10 11V3.41406L1.70703 11.707C1.31651 12.0976 0.683493 12.0976 0.292969 11.707C-0.0975555 11.3165 -0.0975555 10.6835 0.292969 10.293L8.58594 2H1C0.447715 2 0 1.55228 0 1C0 0.447715 0.447715 0 1 0H11Z"
                    fill="gray"
                  />
                </svg>
              </div>
            </li>
          </ul>

          <!--History transactions-->
          <div
            class="bg-white p-5 rounded-2xl min-h-[125px] border border-gray-200 hover:shadow-xs transition-shadow"
          >
            <h2 class="font-medium">История операций</h2>
            <h2 class="text-gray-500 text-sm">
              Последние транзакции по вашему балансу
            </h2>
            <div class="overflow-x-auto mt-5">
              <table class="w-full table-auto">
                <thead>
                  <tr>
                    <th class="font-[Roboto] p-2.5 text-left font-medium">
                      Дата
                    </th>
                    <th class="font-[Roboto] p-2.5 text-left font-medium">
                      Тип операции
                    </th>
                    <th class="font-[Roboto] p-2.5 text-left font-medium">
                      Сумма
                    </th>
                    <th class="font-[Roboto] p-2.5 text-left font-medium">
                      Статус
                    </th>
                    <th class="font-[Roboto] p-2.5 text-left font-medium">
                      Тип оплаты
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr
                    class="border-t-1 border-t-gray-200"
                    v-for="(
                      transaction, index
                    ) in userTransactions?.userTransactionRows"
                    :key="index"
                    :transaction
                  >
                    <th
                      class="font-[Roboto] p-2.5 text-left font-normal text-sm sm:text-base"
                    >
                      {{ formatDate(parseDate(transaction.createdAt)) }}
                    </th>
                    <th
                      class="font-[Roboto] p-2.5 text-left font-normal text-sm sm:text-base"
                    >
                      {{
                        transaction.type === "credit"
                          ? "Пополнение"
                          : "Списание"
                      }}
                    </th>
                    <th
                      class="font-[Roboto] p-2.5 text-left font-normal text-lime-500 text-sm sm:text-base"
                    >
                      {{ transaction.amount }}
                    </th>
                    <th
                      class="font-[Roboto] p-2.5 text-left font-normal text-green-400 text-sm sm:text-base"
                    >
                      Завершена
                    </th>
                    <th
                      class="font-[Roboto] p-2.5 text-left font-normal text-gray-500 text-sm sm:text-base"
                    >
                      ЮMoney
                    </th>
                  </tr>
                  <tr class="border-t-1 border-t-gray-200">
                    <th
                      class="font-[Roboto] p-2.5 text-left font-normal text-sm sm:text-base"
                    >
                      2024-01-15
                    </th>
                    <th
                      class="font-[Roboto] p-2.5 text-left font-normal text-sm sm:text-base"
                    >
                      Вывод
                    </th>
                    <th
                      class="font-[Roboto] p-2.5 text-left font-normal text-red-500 text-sm sm:text-base"
                    >
                      -3,450.00 ₽
                    </th>
                    <th
                      class="font-[Roboto] p-2.5 text-left font-normal text-green-400 text-sm sm:text-base"
                    >
                      Завершена
                    </th>
                    <th
                      class="font-[Roboto] p-2.5 text-left font-normal text-gray-500 text-sm sm:text-base"
                    >
                      Т-Банк
                    </th>
                  </tr>
                </tbody>
              </table>
            </div>
            <div class="flex gap-2.5 justify-end items-center mt-5 flex-wrap">
              <button
                class="group flex text-sm sm:text-base items-center justify-center gap-0.25 py-1.25 px-5 bg-white border border-gray-200 font-[Roboto] rounded-lg cursor-pointer hover:bg-lime-400 hover:text-white transition-colors"
              >
                <div class="size-[25px] flex items-center justify-center">
                  <svg
                    height="12"
                    width="6"
                    fill="none"
                    viewBox="0 0 8 14"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      class="group-hover:fill-white transition-colors"
                      d="M6.29297 0.292969C6.68349 -0.0975555 7.31651 -0.0975555 7.70703 0.292969C8.09748 0.683499 8.09753 1.31653 7.70703 1.70703L2.41406 7L7.70703 12.293L7.77539 12.3691C8.09567 12.7619 8.07312 13.3409 7.70703 13.707C7.34094 14.0731 6.76191 14.0957 6.36914 13.7754L6.29297 13.707L0.292969 7.70703C-0.0975555 7.31651 -0.0975555 6.68349 0.292969 6.29297L6.29297 0.292969Z"
                      fill="black"
                    />
                  </svg>
                </div>
                Назад
              </button>
              <h2 class="text-sm sm:text-base">Страница 1 из 2</h2>
              <button
                class="group flex text-sm sm:text-base items-center justify-center gap-0.25 py-1.25 px-5 bg-white border border-gray-200 font-[Roboto] rounded-lg cursor-pointer hover:bg-lime-400 hover:text-white transition-colors"
              >
                Вперёд
                <div class="size-[25px] flex items-center justify-center">
                  <svg
                    height="12"
                    width="6"
                    fill="none"
                    viewBox="0 0 8 14"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      class="group-hover:fill-white transition-colors"
                      d="M1.70711 13.7071C1.31658 14.0976 0.683569 14.0976 0.293044 13.7071C-0.0974045 13.3166 -0.0974548 12.6835 0.293044 12.293L5.58601 7.00008L0.293044 1.70711L0.224685 1.63093C-0.0955952 1.23816 -0.0730461 0.659135 0.293044 0.293044C0.659135 -0.0730461 1.23816 -0.0955952 1.63093 0.224685L1.70711 0.293044L7.70711 6.29304C8.09763 6.68357 8.09763 7.31658 7.70711 7.70711L1.70711 13.7071Z"
                      fill="black"
                    />
                  </svg>
                </div>
              </button>
            </div>
          </div>
          <BalanceModal
            :show="showReplenishmentModal"
            @close="showReplenishmentModal = false"
          ></BalanceModal>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { useProfileStore } from "#imports";
import { BalanceModal } from "#components";
import ProfileSidebar from "~/features/profile/profile-sidebar/ui/ProfileSidebar.vue";
import { formatDate, parseDate } from "~/entities/helpers/formatDate";

const { getUserTransactions } = useBalance();
const profileStore = useProfileStore();
const { user } = storeToRefs(profileStore);
const showReplenishmentModal = ref(false);

//temporaily
interface responseUserTransactions {
  message: string;
  success: boolean;
  userTransactionRows: userTransactionRow[];
}

interface userTransactionRow {
  amount: number;
  type: string;
  createdAt: Date;
}

const { data: userTransactions, pending } =
  useAsyncData<responseUserTransactions>(`transactions`, () =>
    getUserTransactions()
  );
// definePageMeta({
// 	middleware: 'auth',
// })
</script>

<style scoped></style>
