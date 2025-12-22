// File: src/hooks/useForgotPasswordFlow.ts
"use client";
import { useMutation } from "@tanstack/react-query";
import useAuthForm from "./useAuthForm";
import { authService } from "../services/authService";
import {
  AuthFlow,
  getPasswordStrength,
  initialFormState,
} from "@/features/auth/constants/constantsAuth";
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

  // Hàm chuyển hướng về login (nút Back)
  const navigateToLogin = () => router.push("/login");
  const passwordStrength = getPasswordStrength(form.newPassword || "");

  // --- B1: Mutation Gửi Email ---
  const sendEmailMutation = useMutation({
    mutationFn: (email: string) => authService.sendPasswordResetEmail(email),
    onSuccess: (response) => {
      updateMessage(response.message || "Mã OTP đã được gửi.", false);
      setAuthFlow("forgot_otp");
      setForm((prev) => ({ ...prev, otp: "" }));
    },
    onError: (error: Error) => updateMessage(error.message, true),
  });

  // --- B2: Mutation Xác thực OTP ---
  const verifyOtpMutation = useMutation({
    mutationFn: ({ email, otp }: { email: string; otp: string }) =>
      authService.verifyOtp(email, otp),
    onSuccess: (response) => {
      updateMessage(response.message || "Xác thực OTP thành công.", false);
      setAuthFlow("forgot_new_password");
      setForm((prev) => ({ ...prev, newPassword: "" }));
    },
    onError: (error: Error) => updateMessage(error.message, true),
  });

  // --- B3: Mutation Đặt lại Mật khẩu ---
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
    onSuccess: (response) => {
      updateMessage(response.message || "Đặt lại mật khẩu thành công!", false);
      // Chuyển về trang login sau khi reset thành công
      setTimeout(() => router.push("/login"), 100);
      setForm(initialFormState);
    },
    onError: (error: Error) => updateMessage(error.message, true),
  });

  const submitHandler = (e: React.FormEvent) => {
    e.preventDefault();
    updateMessage("", false);

    if (authFlow === "forgot_email") {
      if (!form.email || !form.email.includes("@"))
        return updateMessage("Vui lòng nhập email hợp lệ.", true);
      sendEmailMutation.mutate(form.email);
    } else if (authFlow === "forgot_otp") {
      if (!form.otp || form.otp.length !== 6)
        return updateMessage("Mã OTP phải có 6 chữ số.", true);
      verifyOtpMutation.mutate({ email: form.email, otp: form.otp });
    } else if (authFlow === "forgot_new_password") {
      if (
        !form.newPassword ||
        form.newPassword.length < 6 ||
        passwordStrength.score < 60
      ) {
        return updateMessage(`Mật khẩu quá yếu hoặc không đủ 6 ký tự.`, true);
      }
      resetPasswordMutation.mutate({
        email: form.email,
        otp: form.otp || "",
        newPassword: form.newPassword,
      });
    }
  };

  const currentMutation =
    authFlow === "forgot_email"
      ? sendEmailMutation
      : authFlow === "forgot_otp"
      ? verifyOtpMutation
      : authFlow === "forgot_new_password"
      ? resetPasswordMutation
      : sendEmailMutation;

  return {
    form,
    authFlow,
    handleChange,
    submitHandler,
    navigateToLogin,
    handleSendOtp: (e: React.FormEvent) => sendEmailMutation.mutate(form.email), // Cho phép gửi lại OTP
    loading: currentMutation.isPending,
    passwordStrength,
    message: currentMutation.isIdle
      ? localMessage
      : currentMutation.error?.message || localMessage,
    isSuccess:
      currentMutation.isSuccess ||
      (authFlow === "forgot_otp" &&
        localMessage.includes("Mã OTP đã được gửi")),
    isError: isError || currentMutation.isError,
  };
};

export default useForgotPasswordFlow;
