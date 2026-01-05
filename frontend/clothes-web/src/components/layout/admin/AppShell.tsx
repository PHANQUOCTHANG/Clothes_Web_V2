"use client";

import { Header } from "./Header";
import { Navigation } from "./Navigation";

interface AppShellProps {
  children: React.ReactNode;
}

export const AppShell = ({ children }: AppShellProps) => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <Navigation />
      <main className="p-6">{children}</main>
    </div>
  );
};
