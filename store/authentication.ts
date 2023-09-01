import { createSlice } from '@reduxjs/toolkit';
import { RootState } from './store';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface AuthState {
  isAuthenticated: boolean;
  token: string;
}

const initialState: AuthState = { token: '', isAuthenticated: false };

const authSlice = createSlice({
  name: 'authentication',
  initialState,
  reducers: {
    authenticate: (state, action) => {
      state.isAuthenticated = true;
      state.token = action.payload.token;
      AsyncStorage.setItem('token', state.token);
    },
    logout: (state) => {
      state.isAuthenticated = false;
    },
  },
});

export const { authenticate, logout } = authSlice.actions;
export const selectToken = (state: RootState) => state.auth.token;
export const selectIsAuthenticated = (state: RootState) =>
  state.auth.isAuthenticated;
export default authSlice.reducer;
