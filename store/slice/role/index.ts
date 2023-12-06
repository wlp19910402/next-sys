import { fetchSysRolePageList } from '@/services/system/role/index'
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { RoleStateModel } from '@/store/slice/role/model.d'
import type { PayloadAction } from '@reduxjs/toolkit'

const initialState: RoleStateModel = {
  roleList: [],
}

// 获取所有的用户角色
const roleAllThunk = createAsyncThunk(
  'role/all',
  async (params: { size: number; current: number }) => {
    return await fetchSysRolePageList(params)
  }
)

const RoleSlice = createSlice({
  name: 'role',
  initialState,
  reducers: {
    webSocketMessage: (
      state,
      action: PayloadAction<{
        type: string
        data: RoleStateModel
      }>
    ) => {
      let actPayload = action.payload
      switch (actPayload.type) {
        case 'TokenMsg':
          state.roleList = actPayload.data.roleList
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
    builder.addCase(roleAllThunk.fulfilled, (state, action) => {
      if (action.payload.code == 200) {
        let res = action.payload.data
        // state.authToken = res.token
        state.roleList = res.records.map((item) => ({
          ...item,
          value: item.id,
          label: item.roleName,
        }))
      }
    })
  },
})

export const { webSocketMessage } = RoleSlice.actions
export { roleAllThunk }
export default RoleSlice.reducer
