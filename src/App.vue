<template>
	<main class="main">
		<router-view class="view"></router-view>
	</main>
</template>

<script setup lang="ts"></script>

<style lang="scss" scoped>
.main {
	width: 100%;

	.view {
		max-width: 1440px;
		margin: 0 auto;
		padding: 170px 290px;
	}
}
</style>
