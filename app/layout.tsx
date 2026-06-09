import type {Metadata} from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'], variable: '--font-sans' });

export const metadata: Metadata = {
  title: 'FixIt - Home Services',
  description: 'Find trusted home services near you.',
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="font-sans text-slate-900 bg-slate-100 antialiased" suppressHydrationWarning>{children}</body>
    </html>
  );
}
