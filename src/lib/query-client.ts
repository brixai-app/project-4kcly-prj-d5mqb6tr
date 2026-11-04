import { QueryClient } from '@tanstack/react-query';

export function createQueryClient(): QueryClient {
  return new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 30000,
        gcTime: 300000,
        refetchOnWindowFocus: false,
        retry: (failureCount, error: any) => {
          if (error?.status && [400, 401, 403, 404, 409].includes(error.status)) return false;
          return failureCount < 2;
        },
      },
      mutations: {
        retry: 0,
      },
    },
  });
}

export const queryClient = createQueryClient();
export default queryClient;
