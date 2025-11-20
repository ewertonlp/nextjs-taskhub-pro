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
    // Durante a renderização inicial no servidor (SSR), renderiza um placeholder vazio ou um loader
    return null;
  }

  // Apenas no cliente, após a montagem, renderiza os componentes DND
  return <>{children}</>;
}