"use client";

import { SUB_MENU_DATA } from "@/data/mockHome";
import React from "react";

interface SubMenuProps {
  category: string | null;
  topPosition: number;
}

const SubMenu: React.FC<SubMenuProps> = ({ category, topPosition }) => {
  // Logic guard: Trả về null sớm để tránh tính toán không cần thiết
  if (!category || !SUB_MENU_DATA[category]) return null;

  const links = SUB_MENU_DATA[category];

  return (
    <nav
      className="hidden lg:block absolute left-64 w-60 bg-white shadow-xl z-50 border border-gray-100 animate-in fade-in slide-in-from-left-2 duration-200"
      style={{ top: topPosition }}
      aria-label={`Submenu ${category}`}
    >
      <ul className="py-2">
        {links.map((link) => (
          <li key={link} className="group">
            <a
              href={`/category/${link.toLowerCase().replace(/\s+/g, "-")}`}
              className="flex items-center justify-between px-6 py-2.5 text-sm font-medium text-gray-700 hover:text-white hover:bg-black transition-all duration-150"
            >
              <span>{link}</span>
              <span className="opacity-0 group-hover:opacity-100 transition-opacity text-xs">
                →
              </span>
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default SubMenu;
