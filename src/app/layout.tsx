import type { Metadata, Viewport } from 'next';
import './globals.css';
import { Toaster } from '@/components/ui/sonner';

export const metadata: Metadata = {
  title: 'Wopido — Women-First Rides',
  description: 'Safe, reliable rides by women, for women. Book your ride with Wopido.',
  keywords: ['ride hailing', 'women safety', 'cab booking', 'Pune', 'women drivers'],
  authors: [{ name: 'Wopido Team' }],
  icons: {
    icon: '/favicon.ico',
  },
  openGraph: {
    title: 'Wopido — Women-First Rides',
    description: 'Safe, reliable rides by women, for women.',
    type: 'website',
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  themeColor: '#4A1C6A',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="min-h-screen bg-background font-sans antialiased">
        {children}
        <Toaster richColors position="top-center" />
      </body>
    </html>
  );
}
