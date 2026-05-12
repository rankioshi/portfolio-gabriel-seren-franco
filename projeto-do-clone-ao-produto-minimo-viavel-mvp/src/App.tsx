import { MainLayout } from './components/layout/MainLayout';
import { QRControls } from './components/qr/QRControls';
import { QRPreview } from './components/qr/QRPreview';
import { AuthProvider } from './components/auth/AuthProvider';

export default function App() {
  return (
    <AuthProvider>
      <MainLayout>
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_400px] gap-8 items-start">
          <section className="order-2 lg:order-1">
            <QRControls />
          </section>
          <aside className="order-1 lg:order-2">
            <QRPreview />
          </aside>
        </div>
      </MainLayout>
    </AuthProvider>
  );
}
