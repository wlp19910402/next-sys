//redux>sagas>demo.tsx
import { call, put, takeEvery } from '@redux-saga/core/effects'
import {
  DemoStoreActionEnum,
  DemoStoreActionInterface,
} from '@reducers/demoStore'

// 延时器
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

function* asyncDemoSaga(action: DemoStoreActionInterface): Generator {
  yield call(delay, 2000)
  yield put({ type: DemoStoreActionEnum.CHANGE, payload: action.payload })
}

function* watchDemoSaga(): Generator {
  yield takeEvery(DemoStoreActionEnum.WATCH, asyncDemoSaga)
}

export default watchDemoSaga
