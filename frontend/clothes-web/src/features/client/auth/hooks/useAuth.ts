import { useAppDispatch, useAppSelector } from "@/redux/hook";
import { loginThunk, logoutThunk, registerThunk } from "@/redux/slices/authThunk";


export const useAuth = () => {
  const dispatch = useAppDispatch();
  const authState = useAppSelector((state) => state.auth);

  const register = (fullName: string, email: string, password: string) =>
    dispatch(registerThunk({ fullName, email, password }));

  const login = (email: string, password: string) =>
    dispatch(loginThunk({ email, password }));

  const logout = () => dispatch(logoutThunk());

  return {
    authState,
    register,
    login,
    logout,
  };
};
