import { QrCode, LogIn, LogOut, User, Sparkles } from 'lucide-react';
import { useAuth } from '../auth/AuthProvider';
import { Button } from '../ui/button';

export function Header() {
  const { user, login, logout, loading } = useAuth();

  return (
    <header className="w-full py-6 px-4 relative z-10">
      <div className="max-w-7xl mx-auto flex items-center justify-between glass p-4 rounded-2xl">
        <div className="flex items-center gap-3">
          <div className="bg-primary/20 p-2 rounded-xl backdrop-blur-md border border-primary/20">
            <QrCode className="w-8 h-8 text-primary" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-black tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-primary to-purple-400">
                QRCraft Elite
              </h1>
              <span className="bg-primary/10 text-primary text-[10px] font-bold px-2 py-0.5 rounded-full border border-primary/20 uppercase tracking-widest">
                Pro
              </span>
            </div>
            <p className="text-xs text-muted-foreground font-medium flex items-center gap-1">
              <Sparkles className="w-3 h-3 text-primary" />
              AI-Powered Artisan QR Generator
            </p>
          </div>
        </div>

        <div className="flex items-center gap-4">
          {!loading && (
            <>
              {user ? (
                <div className="flex items-center gap-4">
                  <div className="hidden md:flex flex-col items-end">
                    <span className="text-sm font-bold">{user.displayName}</span>
                    <span className="text-[10px] opacity-50">{user.email}</span>
                  </div>
                  {user.photoURL ? (
                    <img 
                      src={user.photoURL} 
                      alt={user.displayName || 'User'} 
                      className="w-10 h-10 rounded-full border-2 border-primary/20 shadow-lg"
                      referrerPolicy="no-referrer"
                    />
                  ) : (
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center border border-primary/20">
                      <User className="w-6 h-6 text-primary" />
                    </div>
                  )}
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    onClick={logout}
                    className="glass-hover text-muted-foreground hover:text-destructive"
                    title="Logout"
                  >
                    <LogOut className="w-5 h-5" />
                  </Button>
                </div>
              ) : (
                <Button 
                  onClick={login}
                  className="bg-primary text-white hover:bg-primary/90 font-bold rounded-xl px-6 shadow-lg shadow-primary/20"
                >
                  <LogIn className="w-4 h-4 mr-2" />
                  Sign In
                </Button>
              )}
            </>
          )}
        </div>
      </div>
    </header>
  );
}
