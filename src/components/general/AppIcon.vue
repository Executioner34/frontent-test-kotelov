<template>
	<svg aria-hidden="true">
		<use :href="symbolId" :fill="color" />
	</svg>
</template>

<script lang="ts" setup>
import { computed } from "vue"

interface IProps {
	prefix?: string
	name: string
	color?: string
}
const props = withDefaults(defineProps<IProps>(), {
	prefix: "icon",
	color: "#00000",
})

const symbolId = computed(() => `#${props.prefix}-${props.name}`)
</script>
