<template>
	<svg aria-hidden="true" class="icon">
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
	color: "#00000",
	width: "20px",
	height: "20px",
})

const symbolId = computed(() => `#${props.prefix}-${props.name}`)
</script>

<style lang="scss" scoped>
.icon {
	display: inline-block;
	width: v-bind(width);
	height: v-bind(height);
	fill: currentColor;
}
</style>
