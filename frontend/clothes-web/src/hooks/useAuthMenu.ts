import { useState, useEffect, useCallback } from "react";

export const useAuthMenu = (
  isLoggedIn: boolean,
  onLogout: () => void,
  toggleLoginState: (state: boolean) => void,
  setCurrentView: (view: string) => void
) => {
  const [isOpen, setIsOpen] = useState(false);
  const [statusMessage, setStatusMessage] = useState<string | null>(null);

  const showStatus = (msg: string) => {
    setStatusMessage(msg);
    setTimeout(() => setStatusMessage(null), 3000);
  };

  const handleAction = useCallback((action: string) => {
    setIsOpen(false);
    
    switch (action) {
      case "logout":
        onLogout();
        showStatus("Đăng xuất thành công!");
        break;
      case "login":
      case "register":
        showStatus(`Đang chuyển đến ${action === "login" ? "Đăng nhập" : "Đăng ký"}...`);
        setTimeout(() => {
          toggleLoginState(true);
          showStatus("Thành công!");
        }, 500);
        break;
      case "profile":
        showStatus("Đang chuyển đến hồ sơ...");
        setTimeout(() => setCurrentView("profile"), 300);
        break;
    }
  }, [onLogout, toggleLoginState, setCurrentView]);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (isOpen && !(e.target as HTMLElement).closest(".auth-dropdown-container")) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [isOpen]);

  return { isOpen, setIsOpen, statusMessage, handleAction };
};