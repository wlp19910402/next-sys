import { fetchWxLogin } from '@/services/system/user/index'
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { UserStateModel } from '@/store/slice/user/model.d'
import type { PayloadAction } from '@reduxjs/toolkit'
const initialState: UserStateModel = {
  channelId: '',
  loginToken: '',
  authToken: '',
  name: '',
  phone: '',
  headUrl: '',
  roleCode: [],
  id: '',
}

// 根据token登录
const wxLoginThunk = createAsyncThunk(
  'user/login',
  async (params: { code: string; type: string }) => {
    let res = await fetchWxLogin(params)
    if (res.code == 200) {
      localStorage.setItem('authToken', res.data.token)
    }
    return res
  }
)

const UserSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    webSocketMessage: (
      state,
      action: PayloadAction<{
        type: string
        data: UserStateModel
      }>
    ) => {
      let actPayload = action.payload
      switch (actPayload.type) {
        case 'TokenMsg':
          state.channelId = actPayload.data.channelId
          break
        case 'LoginMsg':
          let token = actPayload.data.loginToken
          state.authToken = token
          break
        default:
          break
      }
    },
  },
  extraReducers: (builder) => {
    /**
     * 参数1：异步请求promise的状态（pending、fulfilled、rejected)
     * 参数2：回调函数，相当于同步的reducer
     */
    builder.addCase(wxLoginThunk.fulfilled, (state, action) => {
      if (action.payload.code == 200) {
        let res = action.payload.data
        // state.authToken = res.token
        state.name = res.name
        state.phone = res.phone
        state.headUrl = res.headUrl
        state.roleCode = res.roleCode
        state.id = res.id
      }
    })
  },
})

export const { webSocketMessage } = UserSlice.actions
export { wxLoginThunk }
export default UserSlice.reducer
