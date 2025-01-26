import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: null, // Stores user data after login
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    login(state, action) {
      state.user = action.payload; // Save user details in state
    },
    logout(state) {
      state.user = null; // Clear user data on logout
    },
  },
});

export const { login, logout } = userSlice.actions;

// export const selectUser = (state) => state.user.user; // Selector for accessing user data

export default userSlice.reducer;
