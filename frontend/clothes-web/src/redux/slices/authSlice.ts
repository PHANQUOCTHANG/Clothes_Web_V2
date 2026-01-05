// redux/slices/authSlice.ts
import { User } from "@/features/client/auth/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";


export interface AuthState {
  user: User | null;
  accessToken: string | null;
  isLoggedIn: boolean;
}

const initialState: AuthState = {
  user: null,
  accessToken: null,
  isLoggedIn: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAuth: (state, action: PayloadAction<{ user: User; accessToken: string }>) => {
      state.user = action.payload.user;
      state.accessToken = action.payload.accessToken;
      state.isLoggedIn = true;
    },
    clearAuth: (state) => {
      state.user = null;
      state.accessToken = null;
      state.isLoggedIn = false;
    },
  },
});

export const { setAuth, clearAuth } = authSlice.actions;
export default authSlice.reducer;
