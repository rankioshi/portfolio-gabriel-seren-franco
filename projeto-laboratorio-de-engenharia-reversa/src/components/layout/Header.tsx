import { QrCode } from 'lucide-react';

export function Header() {
  return (
    <header className="w-full bg-gradient-to-r from-[#2e0249] to-[#570a57] text-white py-6 px-4 shadow-lg">
      <div className="max-w-7xl mx-auto flex items-center gap-3">
        <div className="bg-white/20 p-2 rounded-lg backdrop-blur-sm">
          <QrCode className="w-8 h-8" />
        </div>
        <div>
          <h1 className="text-2xl font-bold tracking-tight">QR Code Styling</h1>
          <p className="text-sm text-purple-200/80 font-medium">Professional QR Generator</p>
        </div>
      </div>
    </header>
  );
}
