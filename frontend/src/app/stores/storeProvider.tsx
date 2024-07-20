'use client';
import { ReactNode } from 'react';
import { Provider } from 'react-redux';
import { store } from '.';

type StoreProviderProps = {
  children: ReactNode;
};

export default function StoreProvider({
  children,
}: Readonly<StoreProviderProps>) {
  return (
    <>
      <Provider store={store}>{children}</Provider>
    </>
  );
}
