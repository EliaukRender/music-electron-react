import { createSlice } from '@reduxjs/toolkit';

export interface UserState {
  userInfo: { name: string } | null;
  token: string;
}

// 初始数据
const initialState: UserState = {
  userInfo: null,
  token: '',
};

/**
 * @description: 用户信息
 */
const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setToken(state, { payload }) {
      state.token = payload;
    },
  },
  extraReducers: () => {},
});

export const { setToken } = userSlice.actions;
export default userSlice.reducer;
