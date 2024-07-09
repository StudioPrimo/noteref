// app/fonts.ts
import { Rubik } from 'next/font/google';

// eslint-disable-next-line new-cap
const rubik = Rubik({
  subsets: ['latin'],
  variable: '--font-rubik',
});

export const fonts = {
  rubik,
};
