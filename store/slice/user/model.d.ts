export interface UserStateModel {
  channelId: string //请求
  loginToken: string //请求登录的token
  authToken: string //登录后的token
  name: string
  phone: string
  headUrl: string
  roleCode: string[]
  id: string
}

export interface WsResponseParams {
  type: string
  data: any
}
