export type BrixApiClientOptions = {
  baseUrl?: string;
  fetchImpl?: typeof fetch;
  defaultHeaders?: HeadersInit;
  getAuthToken?: () => string | null | undefined | Promise<string | null | undefined>;
  onUnauthorized?: (error: BrixApiError) => void;
};

export type BrixApiRequestOptions = Omit<RequestInit, "body"> & {
  body?: unknown;
  query?: Record<string, string | number | boolean | null | undefined>;
  parseAs?: "json" | "text" | "blob" | "arrayBuffer" | "response";
  headers?: HeadersInit;
};

export class BrixApiError extends Error {
  readonly status: number;
  readonly statusText: string;
  readonly url: string;
  readonly method: string;
  readonly responseBody: unknown;
  readonly requestId?: string;
  readonly code?: string;

  constructor(params: {
    message: string;
    status: number;
    statusText: string;
    url: string;
    method: string;
    responseBody?: unknown;
    requestId?: string;
    code?: string;
  }) {
    super(params.message);
    this.name = "BrixApiError";
    this.status = params.status;
    this.statusText = params.statusText;
    this.url = params.url;
    this.method = params.method;
    this.responseBody = params.responseBody;
    this.requestId = params.requestId;
    this.code = params.code;
    Object.setPrototypeOf(this, BrixApiError.prototype);
  }

  static isBrixApiError(error: unknown): error is BrixApiError {
    return error instanceof BrixApiError || (typeof error === "object" && error !== null && (error as { name?: unknown }).name === "BrixApiError");
  }
}

const isAbsoluteUrl = (value: string) => /^https?:\/\//i.test(value);

const joinUrl = (baseUrl: string, path: string) => {
  if (isAbsoluteUrl(path)) return path;
  const normalizedBase = baseUrl.replace(/\/+$/, "");
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  return `${normalizedBase}${normalizedPath}`;
};

const toQueryString = (query?: Record<string, string | number | boolean | null | undefined>) => {
  if (!query) return "";
  const params = new URLSearchParams();
  for (const [key, value] of Object.entries(query)) {
    if (value === null || value === undefined) continue;
    params.set(key, String(value));
  }
  const qs = params.toString();
  return qs ? `?${qs}` : "";
};

const isJsonLike = (value: unknown) => {
  if (value === null) return true;
  if (Array.isArray(value)) return true;
  return typeof value === "object";
};

const safeParseJson = async (response: Response): Promise<unknown> => {
  const text = await response.text();
  if (!text) return null;
  try {
    return JSON.parse(text);
  } catch {
    return text;
  }
};

const getErrorMessage = (status: number, statusText: string, body: unknown) => {
  if (typeof body === "string" && body.trim()) return body;
  if (body && typeof body === "object") {
    const maybeMessage = (body as { message?: unknown; error?: unknown; detail?: unknown }).message ??
      (body as { error?: unknown }).error ??
      (body as { detail?: unknown }).detail;
    if (typeof maybeMessage === "string" && maybeMessage.trim()) return maybeMessage;
  }
  return statusText || `Request failed with status ${status}`;
};

export function createBrixApiClient(options: BrixApiClientOptions = {}) {
  const baseUrl = options.baseUrl ?? (typeof process !== "undefined" ? process.env.NEXT_PUBLIC_API_BASE_URL ?? "" : "");
  const fetchImpl = options.fetchImpl ?? fetch.bind(globalThis);

  const request = async <T = unknown>(path: string, requestOptions: BrixApiRequestOptions = {}): Promise<T> => {
    const {
      query,
      parseAs = "json",
      headers,
      body,
      method = body !== undefined ? "POST" : "GET",
      ...rest
    } = requestOptions;

    const url = `${joinUrl(baseUrl, path)}${toQueryString(query)}`;
    const resolvedHeaders = new Headers(options.defaultHeaders);
    if (headers) new Headers(headers).forEach((value, key) => resolvedHeaders.set(key, value));

    const token = await options.getAuthToken?.();
    if (token && !resolvedHeaders.has("Authorization")) {
      resolvedHeaders.set("Authorization", `Bearer ${token}`);
    }

    let finalBody: BodyInit | undefined;
    if (body !== undefined) {
      if (body instanceof FormData || body instanceof Blob || body instanceof ArrayBuffer || body instanceof URLSearchParams) {
        finalBody = body;
      } else if (typeof body === "string") {
        finalBody = body;
        if (!resolvedHeaders.has("Content-Type")) resolvedHeaders.set("Content-Type", "text/plain;charset=UTF-8");
      } else if (isJsonLike(body)) {
        finalBody = JSON.stringify(body);
        if (!resolvedHeaders.has("Content-Type")) resolvedHeaders.set("Content-Type", "application/json");
      } else {
        finalBody = String(body);
        if (!resolvedHeaders.has("Content-Type")) resolvedHeaders.set("Content-Type", "text/plain;charset=UTF-8");
      }
    }

    const response = await fetchImpl(url, {
      ...rest,
      method,
      headers: resolvedHeaders,
      body: finalBody,
    });

    if (!response.ok) {
      const responseBody = await safeParseJson(response);
      const requestId = response.headers.get("x-request-id") ?? response.headers.get("x-correlation-id") ?? undefined;
      const error = new BrixApiError({
        message: getErrorMessage(response.status, response.statusText, responseBody),
        status: response.status,
        statusText: response.statusText,
        url,
        method,
        responseBody,
        requestId,
        code: typeof responseBody === "object" && responseBody !== null ? (responseBody as { code?: string }).code : undefined,
      });
      if (response.status === 401 || response.status === 403) options.onUnauthorized?.(error);
      throw error;
    }

    if (parseAs === "response") return response as unknown as T;
    if (parseAs === "text") return (await response.text()) as unknown as T;
    if (parseAs === "blob") return (await response.blob()) as unknown as T;
    if (parseAs === "arrayBuffer") return (await response.arrayBuffer()) as unknown as T;

    if (response.status === 204) return undefined as T;
    const contentType = response.headers.get("content-type") ?? "";
    if (contentType.includes("application/json")) return (await response.json()) as T;
    const text = await response.text();
    try {
      return JSON.parse(text) as T;
    } catch {
      return text as unknown as T;
    }
  };

  return {
    request,
    get: <T = unknown>(path: string, requestOptions: Omit<BrixApiRequestOptions, "method" | "body"> = {}) =>
      request<T>(path, { ...requestOptions, method: "GET" }),
    post: <T = unknown>(path: string, body?: unknown, requestOptions: Omit<BrixApiRequestOptions, "method" | "body"> = {}) =>
      request<T>(path, { ...requestOptions, method: "POST", body }),
    put: <T = unknown>(path: string, body?: unknown, requestOptions: Omit<BrixApiRequestOptions, "method" | "body"> = {}) =>
      request<T>(path, { ...requestOptions, method: "PUT", body }),
    patch: <T = unknown>(path: string, body?: unknown, requestOptions: Omit<BrixApiRequestOptions, "method" | "body"> = {}) =>
      request<T>(path, { ...requestOptions, method: "PATCH", body }),
    delete: <T = unknown>(path: string, requestOptions: Omit<BrixApiRequestOptions, "method" | "body"> = {}) =>
      request<T>(path, { ...requestOptions, method: "DELETE" }),
  };
}