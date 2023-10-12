export interface IApiResponse {
  code: number
  data: any
  message: string
  errors: []
}

export interface IPaginationResponse {
  _limit: number
  _page: number
  _totalRows: number
}

export interface IDataListResponse<T> {
  data: T[]
  pagination: IPaginationResponse
}
