export interface DicTypeItemInterface {
  value: string | number
  label: string
  dictStruct: 'combo' | 'tree'
}
export interface DicTypeStateModel {
  dictypeList: DicTypeItemInterface[]
}

export interface WsResponseParams {
  type: string
  data: any
}
