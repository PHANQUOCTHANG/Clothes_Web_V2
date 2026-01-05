// lib/axios.ts
import axios from "axios";
import { store } from "@/redux/store";
import { setAuth, clearAuth } from "@/redux/slices/authSlice";

export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  withCredentials: true, // gửi cookie HttpOnly
});

// Interceptor tự refresh accessToken khi hết hạn
api.interceptors.response.use(
  (res) => res,
  async (error) => {
    const originalRequest = error.config;
    if (
      error.response?.status === 401 &&
      !originalRequest._retry &&
      error.response.data?.message === "Access token expired"
    ) {
      originalRequest._retry = true;
      try {
        const refreshRes = await axios.post(
          "/api/auth/refresh",
          {},
          { withCredentials: true }
        );
        const newToken = refreshRes.data.data.accessToken;
        const currentUser = store.getState().auth.user;
        if (currentUser) store.dispatch(setAuth({ user: currentUser, accessToken: newToken }));

        originalRequest.headers["Authorization"] = `Bearer ${newToken}`;
        return axios(originalRequest);
      } catch {
        store.dispatch(clearAuth());
        return Promise.reject(error);
      }
    }
    return Promise.reject(error);
  }
);
