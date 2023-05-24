<template>
	<div class="cards-list-component">
		<div class="head">
			<div class="point"></div>
			<h2 class="title">{{ name }}</h2>
			<div class="icons">
				<app-icon name="arrow-up" width="16px" height="16px" class="icon"></app-icon>
				<app-icon name="arrow-down" width="16px" height="16px" class="icon"></app-icon>
			</div>
		</div>
		<ul class="body" v-if="cards">
			<app-card v-for="card in cards" :key="card.id" :title="card.title" :score="card.score" :project="card.project"></app-card>
		</ul>
		<div class="bottom">
			<button class="btn">Добавить</button>
		</div>
	</div>
</template>

<script setup lang="ts">
import { computed } from "vue"
import { useCardsList } from "../../../store"
import AppIcon from "../../general/AppIcon.vue"
import AppCard from "../../general/AppCard.vue"
import { storeToRefs } from "pinia"

interface IProps {
	name: string
	id: number
	sort: number
	code: string
}

const props = defineProps<IProps>()
const cardsStore = useCardsList()
const { getCards } = storeToRefs(cardsStore)
const cards = computed(() => getCards.value(props.code))
</script>

<style lang="scss" scoped>
.cards-list-component {
	display: flex;
	flex-direction: column;
	width: 100%;
	max-width: 320px;
	padding: 12px;
	border-radius: 4px;
	background-color: $grey;

	.head {
		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	.body {
		display: flex;
		flex-direction: column;
		gap: 8px;
	}

	.point {
		width: 4px;
		height: 4px;
		margin-right: 8px;
		border-radius: 50%;
		background-color: $grey-dark;
	}

	.icons {
		margin-left: auto;
	}

	.icon {
		cursor: pointer;
	}
}
</style>
