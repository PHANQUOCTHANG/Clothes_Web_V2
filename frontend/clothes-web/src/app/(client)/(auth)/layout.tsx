"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { ProtectedAuthLayout } from "./ProtectedAuthLayout";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    // Kiểm tra auth state từ localStorage hoặc session
    const checkAuth = () => {
      try {
        const authState = localStorage.getItem("authState");
        if (authState) {
          const { isLoggedIn: logged } = JSON.parse(authState);
          setIsLoggedIn(logged || false);
        }
      } catch (error) {
        console.error("Error checking auth:", error);
      } finally {
        setIsChecking(false);
      }
    };

    checkAuth();
  }, []);

  if (isChecking) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-black border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Đang kiểm tra...</p>
        </div>
      </div>
    );
  }

  return (
    <ProtectedAuthLayout isLoggedIn={isLoggedIn}>
      {children}
    </ProtectedAuthLayout>
  );
}
