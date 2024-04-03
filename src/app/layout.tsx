'use client';

import '@/styles/globals.scss';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import { AuthContextProvider } from '@/components/Context/AuthProvider';
import { RecoilRoot } from 'recoil';

const queryClient = new QueryClient();

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <RecoilRoot>
          <QueryClientProvider client={queryClient}>
            <AuthContextProvider>{children}</AuthContextProvider>
          </QueryClientProvider>
        </RecoilRoot>
      </body>
    </html>
  );
}
