"use client";

import { useState, useCallback } from "react";
import {
  AuthFlow,
  initialFormState,
  LoginFormState,
} from "@/features/client/auth/constants/constantsAuth";

interface UseAuthFormResult {
  form: LoginFormState; // dữ liệu input
  authFlow: AuthFlow; // trạng thái flow hiện tại
  setAuthFlow: React.Dispatch<React.SetStateAction<AuthFlow>>;
  setForm: React.Dispatch<React.SetStateAction<LoginFormState>>;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  updateMessage: (msg: string, isError: boolean) => void;
  localMessage: string; // message hiển thị
  isError: boolean; // trạng thái lỗi
  resetForm: () => void; // reset form về trạng thái ban đầu
}

const useAuthForm = (initialFlow: AuthFlow = "login"): UseAuthFormResult => {
  const [authFlow, setAuthFlow] = useState<AuthFlow>(initialFlow);
  const [form, setForm] = useState<LoginFormState>(initialFormState);
  const [localMessage, setLocalMessage] = useState("");
  const [isError, setIsError] = useState(false);

  // --- Xử lý input change ---
  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    setLocalMessage(""); // reset message khi user nhập mới
    setIsError(false);
  }, []);

  // --- Cập nhật message ---
  const updateMessage = useCallback((msg: string, error: boolean) => {
    setLocalMessage(msg);
    setIsError(error);
  }, []);

  // --- Reset form về trạng thái ban đầu ---
  const resetForm = useCallback(() => {
    setForm(initialFormState);
    setLocalMessage("");
    setIsError(false);
  }, []);

  return {
    form,
    authFlow,
    setAuthFlow,
    setForm,
    handleChange,
    updateMessage,
    localMessage,
    isError,
    resetForm,
  };
};

export default useAuthForm;
