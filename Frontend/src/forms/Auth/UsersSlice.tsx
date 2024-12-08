import { createSlice } from '@reduxjs/toolkit';
import { TLogin } from '../../services/service';

export interface AuthState {
  user: TLogin | null; // Covers admin, doctor, and patient
  isAuthenticated: boolean;
  token: string | null;
  role: string | null;
}

const initialState: AuthState = {
  user: null,
  isAuthenticated: false,
  token: null,
  role: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login(state, action) {
      state.isAuthenticated = true;
      state.user = action.payload;
      state.token = action.payload.token;
      state.role = action.payload.role;
    },
    logout(state) {
      state.isAuthenticated = false;
      state.user = null;
      state.token = null;
      state.role = null;
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
