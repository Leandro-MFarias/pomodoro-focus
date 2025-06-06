import type { Metadata } from "next";
import "./globals.css";
import { pressStart2p } from "@/lib/fonts";

export const metadata: Metadata = {
  title: "Focus Lab",
  description:
    "Ambiente ideal para produtividade: organize suas tarefas, controle o tempo com o método Pomodoro e ouça músicas enquanto trabalha.",
  openGraph: {
    title: "Focus Lab",
    description: "Seu app de foco com técnica Pomodoro!",
    url: "https://pomodoro-focus-sandy.vercel.app/",
    type: "website",
    images: [
      {
        url: "https://pomodoro-focus-sandy.vercel.app/opengraph-image.png",
        width: 1200,
        height: 630,
        alt: "Logo do Focus Lab",
      },
    ],
  },
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
