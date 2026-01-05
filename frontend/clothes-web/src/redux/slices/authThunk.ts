// features/auth/store/authThunks.ts
import { createAsyncThunk } from "@reduxjs/toolkit";
import { setAuth, clearAuth } from "@/redux/slices/authSlice";
import { authService } from "@/features/client/auth/services/authService";

// --- Đăng ký ---
export const registerThunk = createAsyncThunk(
  "auth/register",
  async ({ fullName, email, password }: { fullName: string; email: string; password: string }, { dispatch }) => {
    const data = await authService.register(fullName, email, password);
    dispatch(setAuth({ user: data.user, accessToken: data.accessToken }));
    return data;
  }
);

// --- Đăng nhập ---
export const loginThunk = createAsyncThunk(
  "auth/login",
  async ({ email, password }: { email: string; password: string }, { dispatch }) => {
    const data = await authService.login(email, password);
    dispatch(setAuth({ user: data.user, accessToken: data.accessToken }));
    return data;
  }
);

// --- Đăng xuất ---
export const logoutThunk = createAsyncThunk("auth/logout", async (_, { dispatch }) => {
  await authService.logout();
  dispatch(clearAuth());
});

