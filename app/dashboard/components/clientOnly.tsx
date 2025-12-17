// components/ClientOnly.tsx
'use client';

import { useState, useEffect, ReactNode } from 'react';

interface ClientOnlyProps {
  children: ReactNode;
}

export function ClientOnly({ children }: ClientOnlyProps) {
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setHasMounted(true);
  }, []);

  if (!hasMounted) {
    return null;
  }

  return <>{children}</>;
}