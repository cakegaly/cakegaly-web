import type { Metadata } from 'next';
import { fontHeading, fontMono, fontSans } from '@/assets/fonts';

import { siteConfig } from '@/config/site';
import { cn } from '@/lib/utils';

import { SiteFooter } from '@/components/layout/site-footer';
import { SiteHeader } from '@/components/layout/site-header';
import { ThemeProvider } from '@/components/layout/theme-provider';
import { TailwindIndicator } from '@/components/shared/tailwind-indicator';

import '@/styles/globals.css';

interface RootLayoutProps {
  children: React.ReactNode;
}

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  alternates: {
    types: {
      'application/rss+xml': [
        {
          url: '/rss.xml',
          title: 'cakegaly-web RSS Feed',
        },
      ],
    },
  },
  keywords: ['Tech Blog', 'Next.js', 'React', 'Tailwind CSS', 'shadcn ui'],
  openGraph: {
    type: 'website',
    locale: 'ja_JP',
    url: siteConfig.url,
    title: siteConfig.name,
    description: siteConfig.description,
    siteName: siteConfig.name,
  },
  twitter: {
    card: 'summary_large_image',
    title: siteConfig.name,
    description: siteConfig.description,
    images: [`${siteConfig.url}/og.png`],
    creator: '@cakegaly',
  },
  verification: {
    google: 'sOglKlq48i0vvrlPm0URAufimNWPcnmNzsj6ZnFk_UE',
  },
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon-16x16.png',
    apple: '/apple-touch-icon.png',
  },
  manifest: `${siteConfig.url}/site.webmanifest`,
};

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="ja" suppressHydrationWarning>
      <head />
      <body
        className={cn(
          'bg-background min-h-screen font-sans antialiased',
          fontSans.variable,
          fontHeading.variable,
          fontMono.variable
        )}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <div className="flex min-h-screen flex-col">
            <SiteHeader />
            <main className="flex-1">{children}</main>
            <SiteFooter />
          </div>
          <TailwindIndicator />
        </ThemeProvider>
      </body>
    </html>
  );
}
