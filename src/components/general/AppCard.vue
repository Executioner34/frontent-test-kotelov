<template>
	<div class="app-card-component">
		<div class="head">
			<h3 class="title">{{ title }}</h3>
			<div class="icon">
				<app-icon name="note-edit" width="14px" height="14px"></app-icon>
			</div>
			<div class="icon">
				<app-icon name="garbage" width="14px" height="14px"></app-icon>
			</div>
			<div class="icon">
				<app-icon name="overflow-menu" width="16px" height="16px"></app-icon>
			</div>
		</div>
		<div class="body">
			<p class="text">Балл: <span>5</span></p>
		</div>
		<div class="bottom">
			<span v-if="project" class="label">{{ project }}</span>
		</div>
	</div>
</template>

<script setup lang="ts">
import AppIcon from "./AppIcon.vue"

interface IProps {
	title?: string
	score?: number
	project?: boolean | string
}

const props = defineProps<IProps>()
</script>

<style lang="scss" scoped>
.app-card-component {
	display: flex;
	flex-direction: column;
	max-width: 296px;
	height: 120px;
	padding: 12px;
	border-radius: 4px;
	background-color: $white;

	.head {
		display: flex;
		align-items: center;
	}

	.title {
		margin-right: 10px;
	}

	.icon {
		width: 17px;
		height: 17px;
		cursor: pointer;
		&:last-child {
			margin-left: auto;
			width: 16px;
			height: 16px;
			cursor: context-menu;
		}
	}

	.body {
		margin-top: 8px;
	}

	.bottom {
		margin-top: auto;
	}

	.text {
		span {
			font-weight: 600;
			color: $primary;
		}
	}

	.label {
		padding: 4px 8px;
		background-color: $labelBg;
		border: $labelBorder;
		border-radius: 4px;
	}
}
</style>
