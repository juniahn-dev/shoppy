import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import { AuthContext } from '@/components/Context/AuthContext';
import { ReactNode } from 'react';

export function withAllContexts({
  children,
  user,
  login,
  logout,
}: {
  children: ReactNode;
  user: any;
  login: any;
  logout: any;
}) {
  const testClient = createTestQueryClient();

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      <QueryClientProvider client={testClient}>{children}</QueryClientProvider>
    </AuthContext.Provider>
  );
}

function createTestQueryClient() {
  return new QueryClient({
    defaultOptions: {
      queries: { retry: false },
    },
    // logger: {
    //   log: console.log,
    //   warn: console.warn,
    //   error: () => {},
    // },
  });
}
