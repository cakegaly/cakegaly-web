import { M_PLUS_Rounded_1c, Noto_Sans_JP } from 'next/font/google';
import localFont from 'next/font/local';

export const fontNotoSansJp = Noto_Sans_JP({
  subsets: ['latin'],
  display: 'swap',
  preload: false,
  variable: '--font-noto-sans-jp',
});

export const fontMPlusRounded = M_PLUS_Rounded_1c({
  weight: ['400', '700'],
  subsets: ['latin'],
  display: 'swap',
  preload: false,
  variable: '--font-m-plus-rounded',
});

export const fontHack = localFont({
  src: './HackNerdFontMono-Regular.woff2',
  variable: '--font-hack',
});
