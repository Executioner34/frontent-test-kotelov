<template>
	<div class="home-page">
		<div class="head">
			<h1 class="title">Карточки</h1>
			<div class="wrapper">
				<app-button @click="saveChanges"
					>Сохранить изменения</app-button
				>
			</div>
		</div>
		<div class="body">
			<cards-list
				v-for="(column, key) in columnsData"
				:key="`column-item-${key}`"
				v-bind="column"
			/>
		</div>
	</div>
</template>

<script setup lang="ts">
import CardsList from "../components/views/homePage/CardsList.vue"
import { useCardsList, useColumnsList, useProjectsList } from "../store"
import { onMounted, ref } from "vue"
import AppButton from "../components/general/AppButton.vue"
import { IColumn } from "../types"

const columnsState = useColumnsList()
const cardsState = useCardsList()
const projectsState = useProjectsList()

const columnsData = ref([]) as [] | Array<IColumn>

onMounted(async () => {
	await Promise.all([
		columnsState.getColumnsList(),
		projectsState.getProjectsList(),
		cardsState.getCardsList(),
	])
	columnsData.value = columnsState.columnsData
})

const saveChanges = async () => {
	await cardsState.putCardsList()
}
</script>

<style lang="scss" scoped>
.home-page {
	.head {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-bottom: 20px;
	}

	.wrapper {
		display: flex;
		gap: 8px;
	}

	.body {
		display: flex;
		justify-content: space-between;
		align-items: flex-start;
		gap: 20px;
	}
}
</style>
