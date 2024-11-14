import { createSlice } from '@reduxjs/toolkit';

// Ensure that the `userInfo` property is always part of the state
const initialState = {
  userInfo: localStorage.getItem('userInfo')
    ? JSON.parse(localStorage.getItem('userInfo'))
    : null, // Start with `null` if no user info is found
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      state.userInfo = action.payload;
      localStorage.setItem('userInfo', JSON.stringify(action.payload));
      const expirationTime = new Date().getItem() + 24 * 60 * 60 * 1000;
      localStorage.setItem('expirationTime', expirationTime);
    },
    logout: (state) => {
      state.userInfo = null;
      localStorage.clear();
    },
  },
});

export const { setCredentials, logout } = authSlice.actions;
export default authSlice.reducer;
