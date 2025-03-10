import { M_PLUS_Rounded_1c } from 'next/font/google';
import localFont from 'next/font/local';

export const fontMPlusRounded = M_PLUS_Rounded_1c({
  subsets: ['latin'],
  display: 'swap',
  weight: ['400', '500', '700'],
  preload: false,
  variable: '--font-m-plus-rounded',
});

export const fontHack = localFont({
  src: './HackNerdFontMono-Regular.woff2',
  variable: '--font-hack',
});
