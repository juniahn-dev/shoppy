'use client';

import '@/styles/globals.scss';

import { AuthContextProvider } from '@/components/Context/AuthContext';
import { RecoilRoot } from 'recoil';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <RecoilRoot>
          <AuthContextProvider>{children}</AuthContextProvider>
        </RecoilRoot>
      </body>
    </html>
  );
}
