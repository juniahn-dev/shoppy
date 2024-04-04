import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { login, logout } from '@/api/firebase';

import { AuthContext } from '@/components/Context/AuthContext';
import { IUserCombineProps } from '@/hooks/store/user';
import { ReactNode } from 'react';

export function withAllContexts(children: ReactNode, user: any) {
  const testClient = createTestQueryClient();

  return (
    <AuthContext.Provider value={user}>
      <QueryClientProvider client={testClient}>{children}</QueryClientProvider>
    </AuthContext.Provider>
  );
}

function createTestQueryClient() {
  return new QueryClient({
    defaultOptions: {
      queries: { retry: false },
    },
  });
}
