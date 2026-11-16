import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';

type BrixDataProviderProps = {
  children: React.ReactNode;
};

type BrixDataContextValue = {
  ready: boolean;
  hydrated: boolean;
  lastUpdated: string | null;
  refresh: () => void;
};

const BrixDataContext = createContext<BrixDataContextValue | undefined>(undefined);

const STORAGE_KEY = 'brix-data-provider:last-updated';

function getNowIso() {
  return new Date().toISOString();
}

export function BrixDataProvider({ children }: BrixDataProviderProps) {
  const [ready, setReady] = useState(false);
  const [hydrated, setHydrated] = useState(false);
  const [lastUpdated, setLastUpdated] = useState<string | null>(null);

  useEffect(() => {
    setHydrated(true);

    try {
      const stored = window.localStorage.getItem(STORAGE_KEY);
      if (stored) {
        setLastUpdated(stored);
      } else {
        const now = getNowIso();
        window.localStorage.setItem(STORAGE_KEY, now);
        setLastUpdated(now);
      }
    } catch {
      setLastUpdated(getNowIso());
    }

    const id = window.setTimeout(() => setReady(true), 0);
    return () => window.clearTimeout(id);
  }, []);

  const refresh = () => {
    const now = getNowIso();
    setLastUpdated(now);
    try {
      window.localStorage.setItem(STORAGE_KEY, now);
    } catch {
      // ignore storage failures
    }
  };

  const value = useMemo<BrixDataContextValue>(
    () => ({
      ready,
      hydrated,
      lastUpdated,
      refresh,
    }),
    [ready, hydrated, lastUpdated]
  );

  return <BrixDataContext.Provider value={value}>{children}</BrixDataContext.Provider>;
}

export function useBrixData() {
  const context = useContext(BrixDataContext);
  if (!context) {
    throw new Error('useBrixData must be used within a BrixDataProvider');
  }
  return context;
}

export default BrixDataProvider;