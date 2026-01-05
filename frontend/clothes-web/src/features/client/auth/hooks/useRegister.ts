"use client";

import { useMutation } from "@tanstack/react-query";
import useAuthForm from "./useAuthForm";
import { authService } from "../services/authService";
import { getPasswordStrength } from "@/features/client/auth/constants/constantsAuth";
import { useRouter } from "next/navigation";

const useRegister = () => {
  const { form, handleChange, updateMessage, localMessage, isError } =
    useAuthForm("register");
  const router = useRouter();

  // --- Mutation đăng ký ---
  const registerMutation = useMutation({
    mutationFn: ({
      fullName,
      email,
      password,
    }: {
      fullName: string;
      email: string;
      password: string;
    }) => authService.register(fullName, email, password),

    onSuccess: (data) => {
      // Hiển thị thông báo thành công
      updateMessage("Đăng ký thành công!", false);
      // Chuyển sang trang login sau 0.5s
      setTimeout(() => router.push("/login"), 500);
    },

    onError: (error: Error) => {
      // Hiển thị thông báo lỗi
      updateMessage(error.message, true);
    },
  });

  // --- Handle submit form ---
  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    updateMessage("", false);

    // Kiểm tra form đầy đủ
    if (!form.name || !form.email || !form.password) {
      updateMessage("Vui lòng điền đầy đủ thông tin.", true);
      return;
    }

    // Kiểm tra độ mạnh mật khẩu
    const strength = getPasswordStrength(form.password);
    if (strength.score < 60) {
      updateMessage(
        `Mật khẩu quá yếu (${strength.level}). Vui lòng chọn mật khẩu mạnh hơn.`,
        true
      );
      return;
    }

    // Thực hiện mutation đăng ký
    registerMutation.mutate({
      fullName: form.name,
      email: form.email,
      password: form.password,
    });
  };

  // --- Chuyển sang login ---
  const navigateToLogin = () => router.push("/login");

  // --- Trả về props + trạng thái ---
  return {
    form,
    handleChange,
    handleRegister,
    loading: registerMutation.isPending, // trạng thái loading
    passwordStrength: getPasswordStrength(form.password), // độ mạnh mật khẩu
    message: registerMutation.isIdle
      ? localMessage
      : registerMutation.error?.message || localMessage, // hiển thị message
    isSuccess: registerMutation.isSuccess, // đăng ký thành công
    isError: isError || registerMutation.isError, // có lỗi
    navigateToLogin, // chuyển sang login
  };
};

export default useRegister;
