import { createWrapper, MakeStore } from 'next-redux-wrapper'
import { applyMiddleware, createStore, Store } from 'redux'
import createSagaMiddleware, { SagaMiddleware } from 'redux-saga'
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly'

// import rootReducer from '@store/index'
import rootReducer from '@reducers/demoStore'
import mainSaga from '@sagas/mainSaga' //异步初始化store

const makeStore: MakeStore<Store> = () => {
  const sagaMiddleware: SagaMiddleware = createSagaMiddleware()
  const store: Store = createStore(
    rootReducer,
    composeWithDevTools(applyMiddleware(sagaMiddleware))
  )
  sagaMiddleware.run(mainSaga)
  return store
}

export default createWrapper<Store>(makeStore)
