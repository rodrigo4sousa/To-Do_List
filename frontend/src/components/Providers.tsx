'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { AuthListener } from '../features/auth/components/AuthListener';

const queryClient = new QueryClient();

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthListener>
        {children}
      </AuthListener>

      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}