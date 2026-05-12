import { ReactNode } from 'react';
import { Header } from './Header';

interface MainLayoutProps {
  children: ReactNode;
}

export function MainLayout({ children }: MainLayoutProps) {
  return (
    <div className="min-h-screen bg-[#f8f9fa] flex flex-col font-sans">
      <Header />
      <main className="flex-1 w-full max-w-7xl mx-auto px-4 py-8 md:py-12">
        {children}
      </main>
      <footer className="w-full py-6 text-center text-gray-400 text-sm border-t border-gray-200 bg-white">
        <p>© {new Date().getFullYear()} QR Code Styling Clone. Built with precision.</p>
      </footer>
    </div>
  );
}
