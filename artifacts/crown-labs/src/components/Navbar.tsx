import { useState } from "react";
import { Menu, X, Bell, LogIn, UserCheck, Moon, Sun } from "lucide-react";

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-border/60 bg-background/80 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between h-14">
        <div className="flex items-center gap-4">
          <a href="/" className="flex items-center gap-2">
            <img src="/logo.png" alt="Crown Labs" className="h-8 w-auto" />
          </a>
          <div className="hidden sm:block">
            <p className="text-xs font-semibold tracking-widest text-foreground/90 uppercase">Crown Labs</p>
            <p className="text-[10px] tracking-wider text-muted-foreground uppercase">Applied Intelligence Studio</p>
          </div>
        </div>

        <nav className="hidden md:flex items-center gap-1">
          <a href="#" className="flex items-center gap-1.5 px-3 py-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors">
            <Bell className="h-3.5 w-3.5" />
            Get notifications
          </a>
          <a href="#" className="flex items-center gap-1.5 px-3 py-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors">
            <LogIn className="h-3.5 w-3.5" />
            Lab login
          </a>
          <button className="flex items-center gap-1.5 px-3 py-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors">
            <Moon className="h-3.5 w-3.5" />
          </button>
          <a href="#" className="flex items-center gap-1.5 px-3 py-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors">
            <UserCheck className="h-3.5 w-3.5" />
            User access
          </a>
          <a
            href="#beta"
            className="ml-2 px-4 py-1.5 rounded-md bg-primary text-primary-foreground text-xs font-semibold hover:opacity-90 transition-opacity"
          >
            Beta Testers
          </a>
        </nav>

        <button
          className="md:hidden p-2 text-muted-foreground"
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {mobileOpen && (
        <div className="md:hidden border-t border-border bg-card px-4 py-3 flex flex-col gap-2">
          <a href="#" className="flex items-center gap-2 py-2 text-sm text-muted-foreground">
            <Bell className="h-4 w-4" /> Get notifications
          </a>
          <a href="#" className="flex items-center gap-2 py-2 text-sm text-muted-foreground">
            <LogIn className="h-4 w-4" /> Lab login
          </a>
          <a href="#" className="flex items-center gap-2 py-2 text-sm text-muted-foreground">
            <UserCheck className="h-4 w-4" /> User access
          </a>
          <a href="#beta" className="mt-1 px-4 py-2 rounded-md bg-primary text-primary-foreground text-sm font-semibold text-center">
            Beta Testers
          </a>
        </div>
      )}
    </header>
  );
}
