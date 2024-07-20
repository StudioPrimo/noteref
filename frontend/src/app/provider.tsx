// app/providers.tsx
'use client';
import React from 'react';
import { ChakraProvider } from '@chakra-ui/react';
import { SessionProvider } from 'next-auth/react';
import { Provider } from 'react-redux';
import { store } from '@/app/stores';
import StoreProvider from './stores/storeProvider';

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <ChakraProvider>
        <StoreProvider>{children}</StoreProvider>
      </ChakraProvider>
    </SessionProvider>
  );
}
