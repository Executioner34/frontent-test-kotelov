<template>
	<button class="app-button-component" @click="onClick">
		<slot />
	</button>
</template>

<script setup lang="ts">
interface IEmits {
	(e: "click"): void
}

const emit = defineEmits<IEmits>()

const onClick = () => emit("click")
</script>

<style lang="scss" scoped>
.app-button-component {
	display: flex;
	justify-content: center;
	align-items: center;
	width: 100%;
	height: 32px;
	padding: 8px 20px;
	border-radius: 4px;
	border-color: transparent;
	background-color: $blue;
	white-space: nowrap;
	color: $white;
}
</style>
