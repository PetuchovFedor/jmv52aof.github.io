export interface PointOnMap {
	latitude: number
	longitude: number
}

export interface MarkerInfo extends PointOnMap {
	id: number
	color: string
}

export interface ViewState extends PointOnMap {
	zoom: number
}
