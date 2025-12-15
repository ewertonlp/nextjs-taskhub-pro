// components/ClientOnly.tsx
'use client';

import { useState, useEffect, ReactNode } from 'react';

interface ClientOnlyProps {
  children: ReactNode;
}

export function ClientOnly({ children }: ClientOnlyProps) {
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    // Esta linha garante que o componente está no cliente
    setHasMounted(true);
  }, []);

  if (!hasMounted) {
    return null;
  }

  return <>{children}</>;
}