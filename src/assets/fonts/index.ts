import { M_PLUS_Rounded_1c } from 'next/font/google';
import localFont from 'next/font/local';

export const fontSans = M_PLUS_Rounded_1c({
  subsets: ['latin'],
  display: 'swap',
  weight: ['400'],
  preload: false,
  variable: '--font-sans',
});

export const fontHeading = localFont({
  src: './MPlusRounded1c-Medium.woff2',
  display: 'swap',
  preload: true,
  variable: '--font-heading',
});

export const fontMono = localFont({
  src: './HackNerdFontMono-Regular.woff2',
  variable: '--font-mono',
});
