import "@/styles/globals.scss";

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Shoppy",
  description: "Juniahn Shoppy web",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
