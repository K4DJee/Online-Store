export interface responseRequests {
	message: string
	success: boolean
}

export interface requestParams {
	url: string
	method?: string
	data: object
}

export interface appResponses {
	message: string
	success: boolean
	cartProductsRow: any[]
}
