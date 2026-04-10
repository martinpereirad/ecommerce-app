import type { Metadata } from "next";
import "./globals.css";
import QueryProvider from "@/providers/QueryProvider";
import AppShell from "@/components/AppShell";

export const metadata: Metadata = {
  title: "TiendaOnline — E-commerce",
  description: "Tu tienda de electrónica y accesorios favorita",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body>
        <QueryProvider>
          <AppShell>{children}</AppShell>
        </QueryProvider>
      </body>
    </html>
  );
}
