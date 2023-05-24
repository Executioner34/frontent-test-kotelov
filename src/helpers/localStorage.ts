import { IProps, ICard, IColumn, IProject } from "../types"

export const getItem = (key: string): Array<IProject | ICard | IColumn> | null => {
	const value = localStorage.getItem(key)
	if (value === null) {
		return null
	}
	return JSON.parse(value)
}

export const setItem = (key: string, value: Array<IColumn | ICard | IProject>): void => {
	const serializedValue = JSON.stringify(value)
	localStorage.setItem(key, serializedValue)
}

export const updateItem = (props: IProps) => {
	const { key, value, id } = props
	const arr = getItem(key)
	if (arr === null) {
		return null
	}
	const ind = arr.findIndex((item) => item.id === id)
	if (ind !== -1 && value) {
		arr.splice(ind, 1, value)
		localStorage.setItem(key, JSON.stringify(arr))
	}
	return arr
}

export const deleteItem = (props: IProps) => {
	const { key, id } = props
	const arr = getItem(key)
	if (arr === null) {
		return null
	}
	const newArr = arr.filter((item) => item.id !== id)
	localStorage.setItem(key, JSON.stringify(newArr))
	return newArr
}

export const destroy = () => {
	localStorage.clear()
}
