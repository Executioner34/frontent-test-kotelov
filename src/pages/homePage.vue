<template>
	<div class="home-page">
		<div class="head">
			<h1 class="title">Карточки</h1>
		</div>
		<div class="body" v-if="columnsData">
			<cards-list v-for="(column, key) in columnsData" :key="`column-item-${key}`" v-bind="column"></cards-list>
		</div>
	</div>
</template>

<script setup lang="ts">
import CardsList from "../components/views/homePage/CardsList.vue"
import { useCardsList, useColumnsList, useProjectsList } from "../store"
import { computed, onMounted } from "vue"

const columnsState = useColumnsList()
const cardsState = useCardsList()
const projectsState = useProjectsList()

onMounted(() => {
	columnsState.getColumnsList()
	cardsState.getCardsList()
	projectsState.getProjectsList()
})

const columnsData = computed(() => columnsState.columnsData)
</script>

<style lang="scss" scoped>
.home-page {
	.head {
		display: flex;
		margin-bottom: 20px;
	}

	.body {
		display: flex;
		justify-content: space-between;
		align-items: flex-start;
		gap: 20px;
	}
}
</style>
