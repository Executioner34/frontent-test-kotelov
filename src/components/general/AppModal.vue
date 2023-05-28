<template>
	<div class="app-modal-component">
		<el-dialog v-model="modalVisible" width="380px" class="modal">
			<template #header>
				<h3 class="title">Добавление</h3>
				<p v-if="stage" class="subtitle">{{ stage }}</p>
			</template>
			<div class="row">
				<label :for="`title-${idCard}`" class="label"
					>Заголовок *:
				</label>
				<el-input
					:id="`title-${idCard}`"
					v-model.trim="titleModel"
					name="title"
				/>
			</div>
			<div class="row">
				<label :for="`project-${idCard}`" class="label">Проект:</label>
				<el-select
					:id="`project-${idCard}`"
					v-model="projectModel"
					size="large"
				>
					<el-option
						v-for="item in projectsList"
						:key="item.code"
						:label="item.name"
						:value="item.code"
					/>
				</el-select>
			</div>
			<div class="row row--number">
				<label :for="`score-${idCard}`" class="label">Балл *:</label>
				<el-input
					:id="`score-${idCard}`"
					v-model.number="scoreModel"
					name="title"
				/>
			</div>
			<template #footer>
				<app-button class="btn" @click="closeModal"
					>Добавить
				</app-button>
			</template>
		</el-dialog>
	</div>
</template>

<script setup lang="ts">
import { computed, ref } from "vue"
import AppButton from "./AppButton.vue"

import "element-plus/es/components/dialog/style/css"
import "element-plus/es/components/input/style/css"
import "element-plus/es/components/select-v2/style/css"
import "element-plus/es/components/option/style/css"

import { ICard } from "../../types"

interface IProps {
	isShow: boolean
	stage?: string
	titleCard?: string
	project?: string | boolean
	score?: number
	projectsList: Array<{ name: string; code: string }>
	idCard?: number
}

interface IEmits {
	(e: "update:isShow", newValue: boolean): boolean
	(e: "editCard", card: ICard): ICard
}

const props = defineProps<IProps>()
const emit = defineEmits<IEmits>()

const modalVisible = computed({
	get: () => props.isShow,
	set: (newValue) => emit("update:isShow", newValue),
})

const titleModel = ref(props.titleCard || "")
const projectModel = ref(props.project || "")
const scoreModel = ref(props.score || 0)
const stageModel = ref(props.stage || "")

const closeModal = () => {
	if (titleModel.value && scoreModel.value) {
		const card = {
			id: props.idCard || 1,
			title: titleModel.value,
			project: projectModel.value || false,
			score: scoreModel.value,
			stage: stageModel.value,
		}
		emit("editCard", card)
		emit("update:isShow", false)
	}
}
</script>

<style lang="scss" scoped>
.app-modal-component {
	.modal {
		::v-global(.el-dialog) {
			display: flex;
			flex-direction: column;
			border-radius: 4px;
		}

		::v-global(.el-dialog__body) {
			display: flex;
			flex-direction: column;
			gap: 20px;
		}

		::v-global(.el-dialog__footer) {
			align-self: center;
		}
	}

	.title {
		margin-bottom: 4px;
		font-size: 20px;
		line-height: 24px;
	}

	.subtitle {
		margin: 0;
	}

	.row {
		&--number {
			width: 80px;
		}
	}

	.label {
		margin-bottom: 4px;
		font-size: 12px;
		line-height: 15px;
	}

	.btn {
		width: 102px;
	}
}
</style>
