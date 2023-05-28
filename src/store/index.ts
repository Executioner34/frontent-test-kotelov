import { defineStore } from "pinia"
import { getItem, setItem } from "../helpers/localStorage.ts"
import columnsListData from "../mock/columnsList.json"
import cardsListData from "../mock/cardsList.json"
import projectListData from "../mock/projectsList.json"

import { ICard, IColumn, IProject } from "../types"

export const useColumnsList = defineStore("columnsList", {
	state: () => ({
		columnsData: [] as Array<IColumn>,
	}),
	actions: {
		async fetchColumnsMock(): Promise<Array<IColumn>> {
			return await new Promise((resolve) => {
				setTimeout(
					() => resolve(columnsListData as Array<IColumn>),
					2000
				)
			})
		},
		async getColumnsList() {
			const items = getItem("columnsList") as Array<IColumn>
			if (items === null) {
				try {
					const result = await this.fetchColumnsMock()
					this.columnsData = result
					setItem("columnsList", result)
					return
				} catch (e) {
					console.error(e)
				}
			}
			this.columnsData = items
		},
	},
})

export const useCardsList = defineStore("cardsList", {
	state: () => ({
		cardsData: [] as Array<ICard>,
	}),
	getters: {
		getCards: (state) => {
			return (code: string) =>
				state.cardsData.filter((card) => card.stage === code)
		},
		lastIdInCardData: (state) =>
			state.cardsData.sort((a, b) => b.id - a.id)[0].id + 1,
	},
	actions: {
		async fetchCardsMock(): Promise<Array<ICard>> {
			return await new Promise((resolve) => {
				setTimeout(() => resolve(cardsListData as Array<ICard>), 2000)
			})
		},
		async getCardsList() {
			const items = getItem("cardsList") as Array<ICard>
			if (items === null) {
				try {
					const result = await this.fetchCardsMock()
					this.cardsData = result
					setItem("cardsList", result)
					return
				} catch (e) {
					console.error(e)
				}
			}
			this.cardsData = items
		},
		updateStageInCard({
			element,
			newIndex,
		}: {
			element: ICard
			newIndex: number
		}) {
			const cardInd = this.cardsData.findIndex(
				(item) => item.id === element.id
			)
			this.cardsData[cardInd].stage =
				useColumnsList().columnsData[newIndex].code
		},
		async putCardsList() {
			return await new Promise((resolve) => {
				return setTimeout(() => {
					setItem("cardsList", this.cardsData)
					resolve(true)
				}, 2000)
			})
		},
	},
})

export const useProjectsList = defineStore("projectsList", {
	state: () => ({
		projectsData: [] as Array<IProject>,
	}),
	actions: {
		async fetchProjectsMock(): Promise<Array<IProject>> {
			return await new Promise((resolve) => {
				setTimeout(
					() => resolve(projectListData as Array<IProject>),
					2000
				)
			})
		},
		async getProjectsList() {
			const items = getItem("projectsList") as Array<IProject>
			if (items === null) {
				try {
					const result = await this.fetchProjectsMock()
					this.projectsData = result
					setItem("projectsList", result)
					return
				} catch (e) {
					console.error(e)
				}
			}
			this.projectsData = items
		},
	},
})
