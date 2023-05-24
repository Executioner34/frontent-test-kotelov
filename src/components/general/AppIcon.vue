<template>
	<svg aria-hidden="true" class="app-icon-component">
		<use :href="symbolId" :fill="color" />
	</svg>
</template>

<script lang="ts" setup>
import { computed } from "vue"

interface IProps {
	prefix?: string
	name: string
	color?: string
	width?: string
	height?: string
}
const props = withDefaults(defineProps<IProps>(), {
	prefix: "icon",
	color: "#71747C",
	width: "20px",
	height: "20px",
})

const symbolId = computed(() => `#${props.prefix}-${props.name}`)
</script>

<style lang="scss" scoped>
.app-icon-component {
	display: inline-block;
	width: v-bind(width);
	height: v-bind(height);
	fill: currentColor;
}
</style>
