import React from 'react';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import NextHead from 'next/head';
import { siteConfig } from '@/config/site';
import { Providers } from './provider';
import { fonts } from './fonts';
import { Grid, GridItem } from '@chakra-ui/react';

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
    <html lang="ja" className={fonts.rubik.variable}>
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
        <Providers>
          <div className="w-screen h-screen">
            <Grid
              gridTemplateAreas={`"header header"
                  "nav main"
                  "nav footer"`}
              gridTemplateRows={'10vh 1fr 5vh'}
              gridTemplateColumns={'20vh 1fr'}
              gap="1"
              color="blackAlpha.700"
              fontWeight="bold"
              height={'100vh'}
            >
              <GridItem pl="2" bg="orange.300" area={'header'}>
                Header
              </GridItem>
              <GridItem pl="2" bg="pink.300" area={'nav'}>
                Nav
              </GridItem>
              <GridItem pl="2" bg="green.300" area={'main'}>
                {children}
              </GridItem>
              <GridItem pl="2" bg="blue.300" area={'footer'}>
                Footer
              </GridItem>
            </Grid>
          </div>
        </Providers>
      </body>
    </html>
  );
}
