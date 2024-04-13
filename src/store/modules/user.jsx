import { createSlice } from '@reduxjs/toolkit';

const userStore = createSlice({
  name: 'user',
  //数据状态
  initialState: {
    token: '',
  },
  //同步的修改方法
  reducers: {
    setToken(state, action) {
      state.action = action.payload;
    },
  },
});

//解构
const { setToken } = userStore.actions;

//获取reducer函数
const userReducer = userStore.reducer;

export { setToken };

export default userReducer;
