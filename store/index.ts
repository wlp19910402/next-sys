import { configureStore } from '@reduxjs/toolkit'
import counterReducer from '@/store/slice/counter'
import userReducer from '@/store/slice/user'
import roleReducer from '@/store/slice/role'
import dicTypeReducer from '@/store/slice/dictype'

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    user: userReducer,
    role: roleReducer,
    dicType: dicTypeReducer,
  },
})
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch

export default store
