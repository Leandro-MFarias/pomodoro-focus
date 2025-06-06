import type { Metadata } from "next";
import "./globals.css";
import { pressStart2p } from "@/lib/fonts";

export const metadata: Metadata = {
  title: "Focus Lab",
  description:
    "Ambiente ideal para produtividade: organize suas tarefas, controle o tempo com o método Pomodoro e ouça músicas enquanto trabalha.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${pressStart2p.className} antialiased dark overflow-hidden`}
        suppressHydrationWarning
      >
        {children}
      </body>
    </html>
  );
}
