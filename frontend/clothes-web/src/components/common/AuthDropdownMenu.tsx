import React, { useMemo, useState, useCallback, useEffect } from "react";
import { useRouter } from "next/navigation";
import { User } from "lucide-react";

interface Props {
  isLoggedIn: boolean;
  onLogout: () => void;
  toggleLoginState: (s: boolean) => void;
  userName?: string;
  setCurrentView: (v: string) => void;
}

const AuthDropdownMenu: React.FC<Props> = (props) => {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);

  // Xử lý các hành động menu
  const handleAction = useCallback(
    (action: string) => {
      setIsOpen(false);

      switch (action) {
        case "logout":
          props.onLogout();
          break;
        case "login":
          router.push("/login");
          break;
        case "register":
          router.push("/register");
          break;
        case "profile":
          props.setCurrentView("profile");
          break;
      }
    },
    [router, props]
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

  // Đóng menu khi click bên ngoài
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (
        isOpen &&
        !(e.target as HTMLElement).closest(".auth-dropdown-container")
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [isOpen]);

  return (
    <div className="relative auth-dropdown-container">
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
