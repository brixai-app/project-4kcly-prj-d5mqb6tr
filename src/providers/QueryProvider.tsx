import React, { useMemo } from 'react';
import { QueryClientProvider } from '@tanstack/react-query';
import { createQueryClient, queryClient as defaultClient } from './query-client';

export function QueryProvider({ children }: { children: React.ReactNode }) {
  const client = useMemo(() => defaultClient, []);
  return <QueryClientProvider client={client}>{children}</QueryClientProvider>;
}

export default QueryProvider;
