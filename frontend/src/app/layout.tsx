import React from 'react';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Providers } from './provider';
import NextHead from 'next/head';
import { siteConfig } from '@/config/site';

// eslint-disable-next-line new-cap
const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'noteref',
  description: 'A tool for note refugees',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <NextHead>
        <title>{siteConfig.name}</title>
        <meta key="title" content={siteConfig.name} property="og:title" />
        <meta content={siteConfig.description} property="og:description" />
        <meta content={siteConfig.description} name="description" />
        <meta
          key="viewport"
          content="viewport-fit=cover, width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0"
          name="viewport"
        />
        <link href="/favicon.ico" rel="icon" />
      </NextHead>
      <body className={inter.className}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
