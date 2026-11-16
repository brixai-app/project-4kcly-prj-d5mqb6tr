import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';

type BrixDataProviderProps = {
  children: React.ReactNode;
};

type BrixDataContextValue = {
  ready: boolean;
  hydrated: boolean;
  lastSyncAt: string | null;
  refresh: () => void;
};

const BrixDataContext = createContext<BrixDataContextValue | undefined>(undefined);

export function useBrixData() {
  const context = useContext(BrixDataContext);
  if (!context) {
    throw new Error('useBrixData must be used within a BrixDataProvider');
  }
  return context;
}

export const BrixDataProvider: React.FC<BrixDataProviderProps> = ({ children }) => {
  const [ready, setReady] = useState(false);
  const [hydrated, setHydrated] = useState(false);
  const [lastSyncAt, setLastSyncAt] = useState<string | null>(null);

  useEffect(() => {
    setHydrated(true);

    const sync = () => {
      setReady(true);
      setLastSyncAt(new Date().toISOString());
    };

    sync();

    const onStorage = (event: StorageEvent) => {
      if (event.key && event.key.startsWith('brix:')) {
        sync();
      }
    };

    window.addEventListener('storage', onStorage);
    return () => window.removeEventListener('storage', onStorage);
  }, []);

  const refresh = () => {
    setReady(false);
    requestAnimationFrame(() => {
      setReady(true);
      setLastSyncAt(new Date().toISOString());
    });
  };

  const value = useMemo<BrixDataContextValue>(
    () => ({
      ready,
      hydrated,
      lastSyncAt,
      refresh,
    }),
    [ready, hydrated, lastSyncAt]
  );

  return <BrixDataContext.Provider value={value}>{children}</BrixDataContext.Provider>;
};

export default BrixDataProvider;