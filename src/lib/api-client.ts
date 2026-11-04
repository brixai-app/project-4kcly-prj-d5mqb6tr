import { createBrixApiClient, BrixApiError } from '@/lib/api-client-impl';
export { BrixApiError };
export const apiClient = createBrixApiClient();
export default apiClient;
