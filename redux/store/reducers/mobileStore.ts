/**
 * @description 该store，判断是否是移动端
 * */

/**
 * @description 定义相关接口或者枚举
 * */
export enum MobileStoreActionEnum {
  INIT = 'mobileStoreInit',
  CHANGE = 'mobileStoreChange',
}

export type MobileStoreStateType = boolean

interface MobileStoreActionInterface {
  type: MobileStoreActionEnum
  payload: MobileStoreStateType
}

/**
 * @description store逻辑
 * */
const mobileInitState: MobileStoreStateType = false
const mobileStore = (
  state: MobileStoreStateType = mobileInitState,
  action: MobileStoreActionInterface
): MobileStoreStateType => {
  switch (action.type) {
    case MobileStoreActionEnum.INIT:
      return state
    case MobileStoreActionEnum.CHANGE:
      return action.payload
    default:
      return state
  }
}
export default mobileStore
