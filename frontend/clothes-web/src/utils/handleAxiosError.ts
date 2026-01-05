import { AxiosError } from "axios";

export const handleAxiosError = (error: unknown): never => {
  const axiosError = error as AxiosError<{ message?: string }>;
  throw new Error(
    axiosError.response?.data?.message || axiosError.message || "Có lỗi xảy ra"
  );
};
