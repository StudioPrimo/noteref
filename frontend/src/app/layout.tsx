import React from 'react';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Providers } from './provider';
import { fonts } from './fonts';
import { Grid, GridItem } from '@chakra-ui/react';
import Header from '@/components/ui/header';
import Footer from '@/components/ui/footer';
import ListFiles from '@/components/features/GetFileList';

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
      <head>
        <title>noteref</title>
      </head>
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
                <Header />
              </GridItem>
              <GridItem pl="2" bg="pink.300" area={'nav'}>
                <ListFiles />
              </GridItem>
              <GridItem pl="2" bg="green.300" area={'main'} overflowY={'auto'}>
                {children}
              </GridItem>
              <GridItem pl="2" bg="blue.300" area={'footer'}>
                <Footer />
              </GridItem>
            </Grid>
          </div>
        </Providers>
      </body>
    </html>
  );
}
