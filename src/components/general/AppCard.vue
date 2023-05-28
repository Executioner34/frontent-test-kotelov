<template>
	<div class="app-card-component">
		<div class="head">
			<h3 class="title">{{ title }}</h3>
			<div class="icon">
				<app-icon
					name="note-edit"
					width="14px"
					height="14px"
					@click="onClickEdit"
				/>
			</div>
			<div class="icon">
				<app-icon
					name="garbage"
					width="14px"
					height="14px"
					@click="onClickDelete"
				/>
			</div>
			<div class="icon">
				<app-icon name="overflow-menu" width="16px" height="16px" />
			</div>
		</div>
		<div class="body">
			<p class="text">
				Балл: <span>{{ score }}</span>
			</p>
		</div>
		<div class="bottom">
			<span v-if="project" class="label">{{ project }}</span>
		</div>
		<app-modal
			:is-show="isShowModal"
			:id-card="idCard"
			:projects-list="projectsList"
			:project="project"
			:score="score"
			:title-card="title"
			:stage="stage"
			@update:is-show="updateIsShowModal"
			@edit-card="editModalHandler"
		/>
	</div>
</template>

<script setup lang="ts">
import AppIcon from "./AppIcon.vue"
import AppModal from "./AppModal.vue"
import { ref } from "vue"
import { ICard } from "../../types"

interface IProps {
	idCard: number
	title: string
	score: number
	project: boolean | string
	projectsList: Array<{ name: string; code: string }>
	stage: string
	element: object
}

interface IEmits {
	(e: "edit", card: ICard): ICard
	(e: "delete", card: ICard, isDeleting: boolean): ICard
}

const props = defineProps<IProps>()
const emit = defineEmits<IEmits>()

const isShowModal = ref(false)

const updateIsShowModal = (value: boolean) => (isShowModal.value = value)

const onClickEdit = () => (isShowModal.value = true)
const onClickDelete = () => {
	console.log(props.idCard)
	const card: ICard = {
		title: props.title,
		score: props.score,
		id: props.idCard,
		project: props.project,
		stage: props.stage,
	}
	emit("delete", card, true)
}

const editModalHandler = (card: ICard) => {
	console.log(card.id)
	emit("edit", card)
}
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
			cursor: move;
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
