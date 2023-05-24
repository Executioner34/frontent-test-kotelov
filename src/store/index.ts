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
		fetchColumnsMock() {
			return columnsListData
		},
		getColumnsList() {
			const items = getItem("columnsList") as Array<IColumn>
			if (items === null) {
				try {
					setTimeout(() => {
						const result = this.fetchColumnsMock()
						this.columnsData = result
						setItem("columnsList", result)
						return
					}, 2000)
				} catch (e) {
					console.log(e)
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
			return (code: string) => state.cardsData.filter((card) => card.stage === code)
		},
	},
	actions: {
		fetchCardsMock() {
			return cardsListData as Array<ICard>
		},
		getCardsList() {
			const items = getItem("cardsList") as Array<ICard>
			if (items === null) {
				try {
					setTimeout(() => {
						const result = this.fetchCardsMock()
						this.cardsData = result
						setItem("cardsList", result)
						return
					}, 2000)
				} catch (e) {
					console.log(e)
				}
			}
			this.cardsData = items
		},
	},
})

export const useProjectsList = defineStore("projectsList", {
	state: () => ({
		projectsData: [] as Array<IProject>,
	}),
	actions: {
		fetchProjectsMock() {
			return projectListData as Array<IProject>
		},
		getProjectsList() {
			const items = getItem("projectsList") as Array<IProject>
			if (items === null) {
				try {
					setTimeout(() => {
						const result = this.fetchProjectsMock()
						this.projectsData = result
						setItem("projectsList", result)
						return
					}, 2000)
				} catch (e) {
					console.log(e)
				}
			}
			this.projectsData = items
		},
	},
})
