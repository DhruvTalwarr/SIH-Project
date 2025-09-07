import type { Metadata } from 'next';
import './globals.css';
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/toaster";
import { SiteHeader } from '@/components/site-header';
import { cn } from '@/lib/utils';
import { SiteFooter } from '@/components/site-footer';

export const metadata: Metadata = {
  title: 'AgriSafeNet',
  description: 'AI-Powered Livestock Health Monitoring',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link href="https://fonts.googleapis.com/css2?family=PT+Sans:ital,wght@0,400;0,700;1,400;1,700&display=swap" rel="stylesheet" />
      </head>
      <body className={cn("font-body antialiased min-h-screen flex flex-col")}>
        <ThemeProvider
          storageKey="agrisafenet-theme"
        >
          <SiteHeader />
          <main className="flex-1 container mx-auto py-8 px-4 sm:px-6 lg:px-8">{children}</main>
          <SiteFooter />
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
