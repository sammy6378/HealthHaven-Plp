// store/adminAuthSlice.ts

import { createSlice } from '@reduxjs/toolkit';
import { TAdmin } from '../../services/service';

export interface AdminAuthState {
  admin: TAdmin | null;
  isAuthenticated: boolean;
  token: string | null;
}

const initialState: AdminAuthState = {
  admin: null,
  isAuthenticated: false,
  token: null
};

const adminAuthSlice = createSlice({
  name: 'adminAuth',
  initialState,
  reducers: {
    setAdmin: (state, action) => {
      state.admin = action.payload;
      state.isAuthenticated = true;
      state.token = action.payload.token;
    },
    clearAdmin: (state) => {
      state.admin = null;
      state.isAuthenticated = false;
      state.token = null;
    },
  },
});

export const { setAdmin, clearAdmin } = adminAuthSlice.actions;

export default adminAuthSlice.reducer;
