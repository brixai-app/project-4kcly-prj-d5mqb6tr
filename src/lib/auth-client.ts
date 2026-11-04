import { createAuthClient } from 'better-auth/react';

// Create underlying Better Auth client safely
let rawClient: any = null;
try {
  rawClient = createAuthClient({
    baseURL: typeof window !== 'undefined' ? window.location.origin : 'http://localhost:5173',
  });
} catch (err) {
  console.warn('[auth-client] Failed to initialize createAuthClient:', err);
}

// Fallback session state ensuring destructuring never crashes
const fallbackSessionState = {
  data: null,
  session: null,
  user: null,
  isPending: false,
  error: null,
};

// Safe hook wrapper that NEVER returns null and provides safe session/user/data props
export const useSession = () => {
  try {
    if (rawClient && typeof rawClient.useSession === 'function') {
      const res = rawClient.useSession();
      if (res && typeof res === 'object') {
        return {
          ...res,
          session: res.session ?? res.data?.session ?? res.data ?? null,
          user: res.user ?? res.data?.user ?? null,
          data: res.data ?? null,
          isPending: res.isPending ?? false,
          error: res.error ?? null,
        };
      }
    }
  } catch (e) {
    console.warn('[auth-client] Error calling useSession:', e);
  }
  return fallbackSessionState;
};

// Hybrid action helpers: work BOTH as callable functions (signIn({ email, password })) AND as namespace objects (signIn.email({ email, password }))
const signInHandler = async (credsOrMethod: any, opts?: any) => {
  if (typeof credsOrMethod === 'string' && rawClient?.signIn?.[credsOrMethod]) {
    return rawClient.signIn[credsOrMethod](opts);
  }
  if (rawClient?.signIn?.email) {
    return rawClient.signIn.email(credsOrMethod);
  }
  return { error: { message: 'Authentication server unavailable' } };
};
export const signIn = Object.assign(signInHandler, rawClient?.signIn);

const signUpHandler = async (credsOrMethod: any, opts?: any) => {
  if (typeof credsOrMethod === 'string' && rawClient?.signUp?.[credsOrMethod]) {
    return rawClient.signUp[credsOrMethod](opts);
  }
  if (rawClient?.signUp?.email) {
    return rawClient.signUp.email(credsOrMethod);
  }
  return { error: { message: 'Authentication server unavailable' } };
};
export const signUp = Object.assign(signUpHandler, rawClient?.signUp);

export const signOut = rawClient?.signOut ?? (async () => ({ success: true }));

export const getSession = rawClient?.getSession ?? (async () => fallbackSessionState);

export const authClient = rawClient || {
  signIn,
  signUp,
  signOut,
  useSession,
  getSession,
};

export default authClient;
