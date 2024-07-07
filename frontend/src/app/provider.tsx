'use client';

import { NextUIProvider } from '@nextui-org/react';

// eslint-disable-next-line no-undef
export function Providers({ children }: { children: React.ReactNode }) {
  return <NextUIProvider>{children}</NextUIProvider>;
}
