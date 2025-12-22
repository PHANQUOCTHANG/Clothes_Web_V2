import React, { useMemo } from "react";
import { User } from "lucide-react";
import { useAuthMenu } from "@/features/home/hooks/useAuthMenu";

interface Props {
  isLoggedIn: boolean;
  onLogout: () => void;
  toggleLoginState: (s: boolean) => void;
  userName?: string;
  setCurrentView: (v: string) => void;
}

const AuthDropdownMenu: React.FC<Props> = (props) => {
  const { isOpen, setIsOpen, statusMessage, handleAction } = useAuthMenu(
    props.isLoggedIn,
    props.onLogout,
    props.toggleLoginState,
    props.setCurrentView
  );

  // Lưu các tùy chọn menu để tránh tính toán lại khi re-render
  const menuOptions = useMemo(
    () =>
      props.isLoggedIn
        ? [
            { label: "Hồ sơ của tôi", action: "profile" },
            { label: "Đăng xuất", action: "logout", className: "text-red-500" },
          ]
        : [
            { label: "Đăng nhập", action: "login" },
            { label: "Đăng ký", action: "register" },
          ],
    [props.isLoggedIn]
  );

  return (
    <div className="relative auth-dropdown-container">
      {/* Thông báo trạng thái (xác nhận, lỗi, etc) */}
      {statusMessage && (
        <div className="absolute top-full right-0 mt-2 bg-black text-white text-xs px-3 py-1 rounded shadow-lg z-50 animate-fade-in">
          {statusMessage}
        </div>
      )}

      {/* Nút mở menu dropdown */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 group focus:outline-none"
      >
        {props.isLoggedIn && (
          <span className="hidden sm:block text-sm font-semibold group-hover:text-red-600 transition">
            {props.userName}
          </span>
        )}
        <User
          size={24}
          className={`transition ${
            isOpen
              ? "text-red-600"
              : props.isLoggedIn
              ? "text-black group-hover:text-red-600"
              : "text-gray-400 group-hover:text-black"
          }`}
        />
      </button>

      {/* Menu dropdown: Đăng nhập, Đăng ký hoặc Hồ sơ, Đăng xuất */}
      {isOpen && (
        <nav className="absolute right-0 mt-3 w-48 bg-white border border-gray-200 rounded-md shadow-xl z-30 overflow-hidden">
          {menuOptions.map(({ label, action, className }) => (
            <button
              key={action}
              onClick={() => handleAction(action)}
              className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-50 transition ${
                className || "text-gray-700"
              }`}
            >
              {label}
            </button>
          ))}
        </nav>
      )}
    </div>
  );
};

export default AuthDropdownMenu;
