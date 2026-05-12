import { ReactNode } from 'react';
import { Header } from './Header';

interface MainLayoutProps {
  children: ReactNode;
}

export function MainLayout({ children }: MainLayoutProps) {
  return (
    <div className="min-h-screen flex flex-col font-sans relative overflow-x-hidden">
      {/* Decorative background elements */}
      <div className="fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary/20 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-purple-500/20 rounded-full blur-[120px] animate-pulse delay-700" />
      </div>

      <Header />
      <main className="flex-1 w-full max-w-7xl mx-auto px-4 py-8 md:py-12 relative z-10">
        {children}
      </main>
      <footer className="w-full py-8 text-center relative z-10">
        <div className="max-w-7xl mx-auto px-4">
          <div className="glass p-6 rounded-2xl flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-sm font-medium opacity-50">
              © {new Date().getFullYear()} QRCraft Elite. All rights reserved.
            </p>
            <div className="flex items-center gap-6 text-xs font-bold uppercase tracking-widest opacity-30">
              <span>Privacy</span>
              <span>Terms</span>
              <span>API</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
