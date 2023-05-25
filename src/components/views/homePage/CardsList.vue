<template>
	<div class="cards-list-component">
		<div class="head">
			<div class="point"></div>
			<h2 class="title">{{ name }}</h2>
			<div class="icons">
				<app-icon
					name="arrow-up"
					width="16px"
					height="16px"
					:class="['icon', { 'icon--active': isSortedIconActive }]"
					@click="sortedCards('up')"
				></app-icon>
				<app-icon
					name="arrow-down"
					width="16px"
					height="16px"
					:class="['icon', { 'icon--active': isSortedIconActive }]"
					@click="sortedCards('down')"
				></app-icon>
			</div>
		</div>
		<div v-if="cards.length >= 1" class="body">
			<draggableComponent v-model="cards" item-key="id" group="project" class="list" @change="cardMoveHandler">
				<template #item="{ element }">
					<app-card :title="element.title" :score="element.score" :project="element.project"></app-card>
				</template>
			</draggableComponent>
		</div>
		<div v-else class="cards-empty">
			<p class="empty-text">Список пуст</p>
		</div>
		<div class="bottom">
			<button class="btn">Добавить</button>
		</div>
	</div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from "vue"
import { useCardsList } from "../../../store"
import AppIcon from "../../general/AppIcon.vue"
import AppCard from "../../general/AppCard.vue"
import draggableComponent from "vuedraggable"

interface IProps {
	name: string
	id: number
	sort: number
	code: string
}

const props = defineProps<IProps>()
const cardsStore = useCardsList()
const initialCards = computed(() => cardsStore.getCards(props.code))
const cards = ref(cardsStore.getCards(props.code))

onMounted(() => {
	cards.value = initialCards.value
})

const isSortedIconActive = ref("")

const sortedCards = (sort: string) => {
	if (isSortedIconActive.value === sort) {
		isSortedIconActive.value = ""
		cards.value = cardsStore.getCards(props.code)
		return
	}
	isSortedIconActive.value = sort
	sort === "up" ? cards.value.sort((a, b) => a.score - b.score) : cards.value.sort((a, b) => b.score - a.score)
}

const cardMoveHandler = ({ added }) => {
	if (added) {
		cardsStore.updateStageInCard(added)
	}
}
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
		margin-bottom: 12px;
	}

	.body {
		margin-bottom: 12px;
	}

	.list {
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
		&--active {
			color: black;
		}
	}

	.cards-empty {
		display: flex;
		justify-content: center;
		align-items: center;
		width: 100%;
		height: 120px;
		margin-top: 12px;
		margin-bottom: 12px;
		border: 1px dashed $grey-light;
		border-radius: 4px;
	}

	.bottom {
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.btn {
		width: 100%;
		height: 32px;
		font-size: 13px;
		line-height: 16px;
		font-weight: 400;
		border-color: transparent;
		background-color: transparent;
		color: $grey-dark;
	}
}
</style>
