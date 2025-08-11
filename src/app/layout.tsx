import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { ThemeProvider } from '@/components/theme-provider';
import { Toaster } from 'react-hot-toast'
import { ResearchProvider } from '@/context/ResearchContext';
const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Research Dashboard',
  description: 'Find the best science, faster.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <Toaster />
        <ThemeProvider attribute="class" defaultTheme="light">
          <ResearchProvider>
            {children}
          </ResearchProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}