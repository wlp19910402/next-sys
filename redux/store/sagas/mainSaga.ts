//redux>sagas>mainSaga.tsx

import { all } from 'redux-saga/effects'
import watchDemoSaga from '@sagas/demo'

// saga中间件 主saga，用于区别是否需要saga来处理异步操作，如果没有异步，则放行
function* mainSaga() {
  yield all([
    // 监听 saga 中有 userWatchSaga 操作，所以会拦截这个 action
    watchDemoSaga(),
  ])
}

// 主saga要对外暴露出去
export default mainSaga
