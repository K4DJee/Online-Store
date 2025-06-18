<script></script>
<template>
	<footer>
		<div class="footer-section">
			<ul class="f-container-one">
				<li>Доставка</li>
				<li>Заказы</li>
			</ul>
		</div>
	</footer>
</template>
<style scoped>
footer {
	background-color: #efefef;
	height: 120px;
}
.footer-section {
	height: 100%;
	display: flex;
	justify-content: space-between;
	max-width: 1400px;
	align-items: center;
	margin: 0 auto;
}
.f-container-one {
	row-gap: 5px;
	display: grid;
	& h2 {
		color: #949494;
	}
}
</style>
