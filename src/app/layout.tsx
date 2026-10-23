import type { Metadata, Viewport } from 'next';
import './globals.css';
import { Toaster } from '@/components/ui/sonner';
import { Navbar } from '@/components/layout/navbar';
import { BottomNav } from '@/components/layout/bottom-nav';

export const metadata: Metadata = {
  title: 'Wopido — Women-First Rides',
  description: 'Safe, reliable rides by women, for women. Book your ride across Pune with verified women captains.',
  icons: {
    icon: '/favicon.ico',
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
      <body className="min-h-screen bg-background font-sans antialiased text-foreground flex flex-col">
        {/* Top Navigation Bar */}
        <Navbar />

        {/* Centered Main Workspace with responsive container */}
        <div className="flex-1 w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6 pb-28 lg:pb-10">
          {children}
        </div>

        {/* Mobile Bottom Navigation */}
        <BottomNav />

        <Toaster richColors position="top-center" />
      </body>
    </html>
  );
}
