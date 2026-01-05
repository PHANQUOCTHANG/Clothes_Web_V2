"use client";

import { useMutation } from "@tanstack/react-query";
import useAuthForm from "./useAuthForm";
import { authService } from "../services/authService";
import {
  getPasswordStrength,
  initialFormState,
} from "@/features/client/auth/constants/constantsAuth";
import { useRouter } from "next/navigation";

const useForgotPasswordFlow = () => {
  const {
    form,
    authFlow,
    setAuthFlow,
    handleChange,
    setForm,
    updateMessage,
    localMessage,
    isError,
  } = useAuthForm("forgot_email");
  const router = useRouter();

  const passwordStrength = getPasswordStrength(form.newPassword || "");

  // --- Mutation Bước 1: Gửi Email nhận OTP ---
  const sendEmailMutation = useMutation({
     mutationFn: (email: string) => authService.sendOtp(email),
    onSuccess: (data) => {
      updateMessage("Mã OTP đã được gửi.", false);
      setAuthFlow("forgot_otp");
      setForm((prev) => ({ ...prev, otp: "" }));
    },
    onError: (error: Error) => updateMessage(error.message, true),
  });

  // --- Mutation Bước 2: Xác thực OTP ---
  const verifyOtpMutation = useMutation({
    mutationFn: ({ email, otp }: { email: string; otp: string }) =>
      authService.verifyOtp(email, otp),
    onSuccess: (data) => {
      updateMessage("Xác thực OTP thành công.", false);
      setAuthFlow("forgot_new_password");
      setForm((prev) => ({ ...prev, newPassword: "" }));
    },
    onError: (error: Error) => updateMessage(error.message, true),
  });

  // --- Mutation Bước 3: Đặt lại mật khẩu ---
  const resetPasswordMutation = useMutation({
    mutationFn: ({
      email,
      otp,
      newPassword,
    }: {
      email: string;
      otp: string;
      newPassword: string;
    }) => authService.resetPassword(email, otp, newPassword),
    onSuccess: (data) => {
      updateMessage("Đặt lại mật khẩu thành công!", false);
      setTimeout(() => router.push("/login"), 500); // Chuyển sang login
      setForm(initialFormState);
    },
    onError: (error: Error) => updateMessage(error.message, true),
  });

  // --- Xử lý submit form theo flow ---
  const submitHandler = (e: React.FormEvent) => {
    e.preventDefault();
    updateMessage("", false);

    if (authFlow === "forgot_email") {
      if (!form.email || !form.email.includes("@")) {
        return updateMessage("Vui lòng nhập email hợp lệ.", true);
      }
      sendEmailMutation.mutate(form.email);
    } else if (authFlow === "forgot_otp") {
      if (!form.otp || form.otp.length !== 6) {
        return updateMessage("Mã OTP phải có 6 chữ số.", true);
      }
      verifyOtpMutation.mutate({ email: form.email, otp: form.otp });
    } else if (authFlow === "forgot_new_password") {
      if (
        !form.newPassword ||
        form.newPassword.length < 6 ||
        passwordStrength.score < 60
      ) {
        return updateMessage("Mật khẩu quá yếu hoặc không đủ 6 ký tự.", true);
      }
      resetPasswordMutation.mutate({
        email: form.email,
        otp: form.otp || "",
        newPassword: form.newPassword,
      });
    }
  };

  // --- Lấy mutation hiện tại theo flow ---
  const currentMutation =
    authFlow === "forgot_email"
      ? sendEmailMutation
      : authFlow === "forgot_otp"
      ? verifyOtpMutation
      : resetPasswordMutation;

  return {
    form,
    authFlow,
    handleChange,
    submitHandler,
    navigateToLogin: () => router.push("/login"), // Back to login
    handleSendOtp: () => sendEmailMutation.mutate(form.email), // Gửi lại OTP
    loading: currentMutation.isPending,
    passwordStrength,
    message: currentMutation.isIdle
      ? localMessage
      : currentMutation.error?.message || localMessage,
    isSuccess: currentMutation.isSuccess,
    isError: isError || currentMutation.isError,
  };
};

export default useForgotPasswordFlow;
