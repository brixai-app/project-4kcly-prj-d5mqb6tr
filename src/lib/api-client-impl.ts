export type BrixApiClientOptions = {
  baseUrl?: string;
  getAuthToken?: () => string | Promise<string | null | undefined>;
  defaultHeaders?: HeadersInit;
  fetchImpl?: typeof fetch;
  onUnauthorized?: () => void;
  onError?: (error: BrixApiError) => void;
};

export type BrixApiRequestOptions = Omit<RequestInit, "body"> & {
  body?: unknown;
  query?: Record<string, string | number | boolean | null | undefined>;
  headers?: HeadersInit;
  parseAs?: "json" | "text" | "blob" | "arrayBuffer" | "response";
  signal?: AbortSignal;
};

export class BrixApiError extends Error {
  readonly status: number;
  readonly statusText: string;
  readonly url: string;
  readonly method: string;
  readonly code?: string;
  readonly details?: unknown;
  readonly response?: Response;

  constructor(params: {
    message: string;
    status: number;
    statusText: string;
    url: string;
    method: string;
    code?: string;
    details?: unknown;
    response?: Response;
  }) {
    super(params.message);
    this.name = "BrixApiError";
    this.status = params.status;
    this.statusText = params.statusText;
    this.url = params.url;
    this.method = params.method;
    this.code = params.code;
    this.details = params.details;
    this.response = params.response;
    Object.setPrototypeOf(this, BrixApiError.prototype);
  }

  get isUnauthorized() {
    return this.status === 401;
  }

  get isForbidden() {
    return this.status === 403;
  }

  get isNotFound() {
    return this.status === 404;
  }

  get isServerError() {
    return this.status >= 500;
  }

  toJSON() {
    return {
      name: this.name,
      message: this.message,
      status: this.status,
      statusText: this.statusText,
      url: this.url,
      method: this.method,
      code: this.code,
      details: this.details,
    };
  }
}

const isBrowser = typeof window !== "undefined";

function joinUrl(baseUrl: string, path: string) {
  if (!baseUrl) return path;
  if (/^https?:\/\//i.test(path)) return path;
  const normalizedBase = baseUrl.endsWith("/") ? baseUrl.slice(0, -1) : baseUrl;
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  return `${normalizedBase}${normalizedPath}`;
}

function buildQueryString(query?: Record<string, string | number | boolean | null | undefined>) {
  if (!query) return "";
  const params = new URLSearchParams();
  for (const [key, value] of Object.entries(query)) {
    if (value === null || value === undefined) continue;
    params.append(key, String(value));
  }
  const qs = params.toString();
  return qs ? `?${qs}` : "";
}

function isPlainObject(value: unknown): value is Record<string, unknown> {
  return Object.prototype.toString.call(value) === "[object Object]";
}

async function safeReadErrorDetails(response: Response): Promise<unknown> {
  const contentType = response.headers.get("content-type") || "";
  try {
    if (contentType.includes("application/json")) return await response.json();
    return await response.text();
  } catch {
    return undefined;
  }
}

function normalizeHeaders(headers?: HeadersInit): Headers {
  const result = new Headers();
  if (!headers) return result;
  if (headers instanceof Headers) {
    headers.forEach((value, key) => result.set(key, value));
    return result;
  }
  if (Array.isArray(headers)) {
    for (const [key, value] of headers) result.set(key, value);
    return result;
  }
  for (const [key, value] of Object.entries(headers)) {
    if (value !== undefined) result.set(key, String(value));
  }
  return result;
}

async function resolveToken(getAuthToken?: () => string | Promise<string | null | undefined>) {
  if (!getAuthToken) return null;
  const token = await getAuthToken();
  return token ?? null;
}

export function createBrixApiClient(options: BrixApiClientOptions = {}) {
  const baseUrl = options.baseUrl ?? (isBrowser ? "/api" : "");
  const fetchImpl = options.fetchImpl ?? fetch;

  async function request<T = unknown>(path: string, requestOptions: BrixApiRequestOptions = {}): Promise<T> {
    const {
      query,
      body,
      headers,
      parseAs = "json",
      method = body !== undefined ? "POST" : "GET",
      ...rest
    } = requestOptions;

    const url = joinUrl(baseUrl, path) + buildQueryString(query);
    const finalHeaders = normalizeHeaders(options.defaultHeaders);
    normalizeHeaders(headers).forEach((value, key) => finalHeaders.set(key, value));

    const token = await resolveToken(options.getAuthToken);
    if (token && !finalHeaders.has("authorization")) {
      finalHeaders.set("Authorization", `Bearer ${token}`);
    }

    let finalBody: BodyInit | undefined;
    if (body !== undefined) {
      if (body instanceof FormData || body instanceof Blob || body instanceof ArrayBuffer || body instanceof URLSearchParams) {
        finalBody = body as BodyInit;
      } else if (typeof body === "string") {
        finalBody = body;
      } else if (isPlainObject(body) || Array.isArray(body)) {
        if (!finalHeaders.has("content-type")) finalHeaders.set("Content-Type", "application/json");
        finalBody = JSON.stringify(body);
      } else {
        finalBody = String(body);
      }
    }

    const response = await fetchImpl(url, {
      ...rest,
      method,
      headers: finalHeaders,
      body: finalBody,
    });

    if (!response.ok) {
      const details = await safeReadErrorDetails(response);
      const message =
        (isPlainObject(details) && typeof details.message === "string" && details.message) ||
        response.statusText ||
        `Request failed with status ${response.status}`;

      const error = new BrixApiError({
        message,
        status: response.status,
        statusText: response.statusText,
        url,
        method,
        code: isPlainObject(details) && typeof details.code === "string" ? details.code : undefined,
        details,
        response,
      });

      options.onError?.(error);
      if (response.status === 401) options.onUnauthorized?.();
      throw error;
    }

    if (parseAs === "response") return response as unknown as T;
    if (response.status === 204) return undefined as T;

    if (parseAs === "text") return (await response.text()) as unknown as T;
    if (parseAs === "blob") return (await response.blob()) as unknown as T;
    if (parseAs === "arrayBuffer") return (await response.arrayBuffer()) as unknown as T;

    const contentType = response.headers.get("content-type") || "";
    if (contentType.includes("application/json")) return (await response.json()) as T;

    const text = await response.text();
    if (!text) return undefined as T;

    try {
      return JSON.parse(text) as T;
    } catch {
      return text as unknown as T;
    }
  }

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