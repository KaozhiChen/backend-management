import { request } from '@/utils';
import { createSlice } from '@reduxjs/toolkit';

const userStore = createSlice({
  name: 'user',
  //数据状态
  initialState: {
    token: localStorage.getItem('token_key') || '',
  },
  //同步的修改方法
  reducers: {
    setToken(state, action) {
      state.token = action.payload;
      //save token in localstorage
      localStorage.setItem('token_key', action.payload);
    },
  },
});

//解构
const { setToken } = userStore.actions;

//获取reducer函数
const userReducer = userStore.reducer;

//异步函数 完成登陆获取token

const fetchLogin = (loginForm) => {
  return async (dispatch) => {
    const res = await request.post('/authorizations', loginForm);
    dispatch(setToken(res.data.token));
  };
};
export { fetchLogin, setToken };

export default userReducer;
