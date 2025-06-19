<template>
	<div
		class="bg-gradient-to-br from-lime-50 to-gray-50 min-h-screen flex flex-col"
	>
		<Header />

		<main class="flex-grow">
			<slot />
		</main>

		<Footer />
	</div>
</template>

<script setup></script>
