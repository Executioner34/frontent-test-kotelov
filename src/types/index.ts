export type IColumn = {
	id: number
	sort: number
	name: string
	code: string
}

export type ICard = {
	id: number
	title: string
	stage: string
	project?: boolean | string
}

export type IProject = {
	id: number
	sort: number
	name: string
	code: string
}

export interface IProps {
	key: string
	value?: IColumn | ICard | IProject
	id: number
}
