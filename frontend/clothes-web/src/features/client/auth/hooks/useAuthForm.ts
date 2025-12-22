// File: hooks/useAuthForm.ts
"use client";
import {
  AuthFlow,
  initialFormState,
  LoginFormState,
} from "@/features/auth/constants/constantsAuth";
import { useState, useCallback } from "react";

interface UseAuthFormResult {
  form: LoginFormState;
  authFlow: AuthFlow;
  setAuthFlow: React.Dispatch<React.SetStateAction<AuthFlow>>;
  setForm: React.Dispatch<React.SetStateAction<LoginFormState>>;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  updateMessage: (msg: string, isError: boolean) => void;
  localMessage: string;
  isError: boolean;
}

const useAuthForm = (initialFlow: AuthFlow = "login"): UseAuthFormResult => {
  const [authFlow, setAuthFlow] = useState<AuthFlow>(initialFlow);
  const [form, setForm] = useState<LoginFormState>(initialFormState);
  const [localMessage, setLocalMessage] = useState("");
  const [isError, setIsError] = useState(false);

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    setLocalMessage("");
  }, []);

  const updateMessage = useCallback((msg: string, error: boolean) => {
    setLocalMessage(msg);
    setIsError(error);
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
  };
};

export default useAuthForm;
