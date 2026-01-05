import { AppShell } from "@/components/layout/admin/AppShell";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AppShell>
      <div className="min-h-screen bg-gray-50">
        <main className="p-3 sm:p-4 md:p-6">{children}</main>
      </div>
    </AppShell>
  );
}
