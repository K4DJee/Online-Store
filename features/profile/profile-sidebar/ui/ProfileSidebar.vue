<template>
	<div class="lg:col-span-1">
		<div
			class="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden sticky top-8"
		>
			<!-- Profile Header -->
			<ProfileHeader />

			<!-- Navigation Menu -->
			<SidebarNav />

			<!-- Logout Button -->
			<div class="p-4 border-t border-gray-100">
				<button
					@click="useLogout()"
					class="w-full flex items-center justify-center px-4 py-2 text-sm font-medium text-red-600 hover:bg-red-50 rounded-lg transition-colors"
				>
					<svg
						class="mr-2 w-5 h-5"
						fill="currentColor"
						viewBox="0 0 24 24"
					>
						<path
							d="M17 7l-1.41 1.41L18.17 11H8v2h10.17l-2.58 2.58L17 17l5-5zM4 5h8V3H4c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h8v-2H4V5z"
						/>
					</svg>
					Выйти
				</button>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts"></script>

<style scoped></style>
