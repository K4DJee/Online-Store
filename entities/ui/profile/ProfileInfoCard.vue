<template>
	<div class="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
		<div class="flex items-center space-x-3">
			<div
				class="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center"
			>
				<slot name="icon"></slot>
			</div>
			<div>
				<p class="text-sm font-medium text-gray-900">
					<slot name="title"></slot>
				</p>
				<p class="text-xs text-gray-500">
					<slot name="subTitle"></slot>
				</p>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts"></script>

<style scoped></style>
