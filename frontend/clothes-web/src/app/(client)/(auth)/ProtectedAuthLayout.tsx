"use client";

import { useRouter } from "next/navigation";
import { useEffect, ReactNode } from "react";

interface ProtectedAuthLayoutProps {
  children: ReactNode;
  isLoggedIn: boolean;
}

/**
 * ProtectedAuthLayout - Bảo vệ pages auth
 * Nếu đã đăng nhập, redirect về home
 * Nếu chưa đăng nhập, hiển thị page
 */
export function ProtectedAuthLayout({
  children,
  isLoggedIn,
}: ProtectedAuthLayoutProps) {
  const router = useRouter();

  useEffect(() => {
    // Nếu đã đăng nhập, redirect về home
    if (isLoggedIn) {
      router.push("/");
    }
  }, [isLoggedIn, router]);

  // Nếu đã đăng nhập, hiển thị loading
  if (isLoggedIn) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-black border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Đang chuyển hướng...</p>
        </div>
      </div>
    );
  }

  // Nếu chưa đăng nhập, hiển thị content
  return <>{children}</>;
}
