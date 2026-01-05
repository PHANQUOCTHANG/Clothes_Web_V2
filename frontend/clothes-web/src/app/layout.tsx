import type { Metadata } from "next";
import "./globals.css";
import ReactQueryProvider from "@/providers/ReactQueryProvider";
import ReduxProvider from "@/providers/ReduxProvider";

export const metadata: Metadata = {
  title: "Clothes-Shop",
  description: "Welcome to my shop",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <ReduxProvider>
          <ReactQueryProvider>{children}</ReactQueryProvider>
        </ReduxProvider>
      </body>
    </html>
  );
}
