import { fetchSysDicTypePageList } from '@/services/system/dictype/index'
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { DicTypeStateModel } from '@/store/slice/dictype/model.d'

const initialState: DicTypeStateModel = {
  dictypeList: [],
}

// 获取所有的字典类型
const dicTypeAllThunk = createAsyncThunk(
  'dictype/all',
  async (params: { size: number; current: number }) => {
    return await fetchSysDicTypePageList(params)
  }
)

const RoleSlice = createSlice({
  name: 'role',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    /**
     * 参数1：异步请求promise的状态（pending、fulfilled、rejected)
     * 参数2：回调函数，相当于同步的reducer
     */
    builder.addCase(dicTypeAllThunk.fulfilled, (state, action) => {
      if (action.payload.code == 200) {
        let res = action.payload.data
        state.dictypeList = res.records.map((item) => ({
          ...item,
          value: item.typeCode,
          label: item.typeName,
          dictStruct: item.dictStruct,
        }))
      }
    })
  },
})

export { dicTypeAllThunk }
export default RoleSlice.reducer
