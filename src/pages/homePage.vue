<template>
	<div class="home-page">
		<div class="head">
			<h1 class="title">Карточки</h1>
			<div class="wrapper">
				<app-button @click="saveChanges">Сохранить изменения</app-button>
			</div>
		</div>
		<div class="body">
			<cards-list v-for="(column, key) in columnsData" :key="`column-item-${key}`" v-bind="column"></cards-list>
		</div>
	</div>
</template>

<script setup lang="ts">
import CardsList from "../components/views/homePage/CardsList.vue"
import { useCardsList, useColumnsList, useProjectsList } from "../store"
import { computed, onMounted } from "vue"
import AppButton from "../components/general/AppButton.vue"

const columnsState = useColumnsList()
const cardsState = useCardsList()
const projectsState = useProjectsList()

onMounted(async () => {
	await Promise.all([columnsState.getColumnsList(), cardsState.getCardsList(), projectsState.getProjectsList()])
})

const columnsData = computed(() => columnsState.columnsData)

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
