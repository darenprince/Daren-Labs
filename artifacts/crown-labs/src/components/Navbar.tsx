import { useState, useEffect } from "react";
import { Menu, X, Bell, LogIn, UserCheck, Moon, Sun } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { NotificationsPopover } from "./modals/NotificationsPopover";
import { BetaTestersModal } from "./modals/BetaTestersModal";

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 border-b border-border/60 transition-colors duration-300 ${scrolled ? "bg-background/90 backdrop-blur-md" : "bg-background/0"}`}>
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
          <NotificationsPopover trigger={
            <button className="flex items-center gap-1.5 px-3 py-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors">
              <Bell className="h-3.5 w-3.5" />
              Get notifications
            </button>
          } />
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
          <BetaTestersModal trigger={
            <button className="ml-2 px-4 py-1.5 rounded-md bg-primary text-primary-foreground text-xs font-semibold hover:opacity-90 transition-opacity">
              Beta Testers
            </button>
          } />
        </nav>

        <button
          className="md:hidden p-2 text-muted-foreground relative z-50"
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          <AnimatePresence mode="wait">
            {mobileOpen ? (
              <motion.div key="close" initial={{ opacity: 0, rotate: -90 }} animate={{ opacity: 1, rotate: 0 }} exit={{ opacity: 0, rotate: 90 }} transition={{ duration: 0.2 }}>
                <X className="h-5 w-5" />
              </motion.div>
            ) : (
              <motion.div key="menu" initial={{ opacity: 0, rotate: 90 }} animate={{ opacity: 1, rotate: 0 }} exit={{ opacity: 0, rotate: -90 }} transition={{ duration: 0.2 }}>
                <Menu className="h-5 w-5" />
              </motion.div>
            )}
          </AnimatePresence>
        </button>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileOpen(false)}
              className="md:hidden fixed inset-0 z-40 bg-black/60 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ type: "spring", bounce: 0, duration: 0.3 }}
              className="md:hidden relative z-40 border-t border-border bg-card px-4 py-3 flex flex-col gap-2 shadow-xl"
            >
              <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 }}>
                <NotificationsPopover trigger={
                  <button className="flex w-full items-center gap-2 py-2 text-sm text-muted-foreground">
                    <Bell className="h-4 w-4" /> Get notifications
                  </button>
                } />
              </motion.div>
              <motion.a initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.15 }} href="#" className="flex items-center gap-2 py-2 text-sm text-muted-foreground">
                <LogIn className="h-4 w-4" /> Lab login
              </motion.a>
              <motion.a initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }} href="#" className="flex items-center gap-2 py-2 text-sm text-muted-foreground">
                <UserCheck className="h-4 w-4" /> User access
              </motion.a>
              <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.25 }}>
                <BetaTestersModal trigger={
                  <button className="w-full mt-1 px-4 py-2 rounded-md bg-primary text-primary-foreground text-sm font-semibold text-center">
                    Beta Testers
                  </button>
                } />
              </motion.div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  );
}
