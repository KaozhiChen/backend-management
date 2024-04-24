import { removeToken, request } from '@/utils';
import { createSlice } from '@reduxjs/toolkit';
import { setToken as _setToken, getToken } from '@/utils';

const userStore = createSlice({
  name: 'user',
  //数据状态
  initialState: {
    token: getToken() || '',
    userInfo: {},
  },
  //同步的修改方法
  reducers: {
    setToken(state, action) {
      state.token = action.payload;
      //save token in localstorage
      _setToken(state.token);
    },
    setUserInfo(state, action) {
      state.userInfo = action.payload;
    },
    clearUserInfo(state) {
      state.token = '';
      removeToken();
      state.userInfo = {};
    },
  },
});

//解构
const { setToken, setUserInfo, clearUserInfo } = userStore.actions;

//获取reducer函数
const userReducer = userStore.reducer;

//异步函数 完成登陆获取token

const fetchLogin = (loginForm) => {
  return async (dispatch) => {
    const res = await request.post('/authorizations', loginForm);
    dispatch(setToken(res.data.token));
  };
};
const fetchUserInfo = () => {
  return async (dispatch) => {
    const res = await request.get('/user/profile');
    dispatch(setUserInfo(res.data));
  };
};
export { fetchLogin, fetchUserInfo, clearUserInfo };

export default userReducer;
