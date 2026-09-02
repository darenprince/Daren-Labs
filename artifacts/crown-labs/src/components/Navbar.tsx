import { useState, useEffect } from "react";
import { Menu, X, Bell, LogIn, LogOut, User, BookOpen } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { NotificationsPopover } from "./modals/NotificationsPopover";
import { BetaTestersModal } from "./modals/BetaTestersModal";
import { useAuth } from "@workspace/replit-auth-web";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const links = [
  { href: "#portfolio", label: "Portfolio" },
  { href: "#documentation", label: "Documentation" },
  { href: "#valuation", label: "Valuation" },
  { href: "#ethics", label: "Principles" },
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { user, isLoading, isAuthenticated, login, logout } = useAuth();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const displayName = user
    ? [user.firstName, user.lastName].filter(Boolean).join(" ") || user.email || "Lab member"
    : null;

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 border-b border-border/60 transition-colors duration-300 ${scrolled ? "bg-background/95 backdrop-blur-md" : "bg-background/70 backdrop-blur-sm"}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between h-16">
        <div className="flex items-center gap-4">
          <a href="/" className="flex items-center gap-2" aria-label="Crown Labs home"><img src="/logo.png" alt="Crown Labs" className="h-8 w-auto" /></a>
          <div className="hidden lg:block"><p className="text-xs font-semibold tracking-widest text-foreground/90 uppercase">Crown Labs</p><p className="text-[10px] tracking-wider text-muted-foreground uppercase">Applied Intelligence Studio</p></div>
        </div>

        <nav className="hidden md:flex items-center gap-1">
          {links.map((link) => <a key={link.href} href={link.href} className="px-3 py-2 text-xs font-medium text-muted-foreground hover:text-foreground transition-colors">{link.label}</a>)}
          <a href="/docs" className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-medium text-muted-foreground hover:text-foreground transition-colors"><BookOpen className="h-3.5 w-3.5" /> Docs</a>
          <NotificationsPopover trigger={<button className="flex items-center gap-1.5 px-3 py-2 text-xs text-muted-foreground hover:text-foreground transition-colors"><Bell className="h-3.5 w-3.5" /> Updates</button>} />

          {isLoading ? <span className="px-3 py-2 text-xs text-muted-foreground">...</span> : isAuthenticated && user ? (
            <DropdownMenu><DropdownMenuTrigger asChild><button className="flex items-center gap-2 px-3 py-2 text-xs text-muted-foreground hover:text-foreground transition-colors">{user.profileImageUrl ? <img src={user.profileImageUrl} alt={displayName ?? ""} className="h-5 w-5 rounded-full object-cover" /> : <div className="h-5 w-5 rounded-full bg-primary/20 flex items-center justify-center"><User className="h-3 w-3 text-primary" /></div>}<span className="max-w-[120px] truncate">{displayName}</span></button></DropdownMenuTrigger><DropdownMenuContent align="end" className="w-48 border-border bg-card"><div className="px-3 py-2"><p className="text-xs font-semibold text-foreground truncate">{displayName}</p>{user.email && <p className="text-[10px] text-muted-foreground truncate">{user.email}</p>}</div><DropdownMenuSeparator className="bg-border" /><DropdownMenuItem onClick={logout} className="text-xs text-muted-foreground cursor-pointer hover:text-foreground focus:text-foreground"><LogOut className="h-3.5 w-3.5 mr-2" />Log out</DropdownMenuItem></DropdownMenuContent></DropdownMenu>
          ) : <button onClick={login} className="flex items-center gap-1.5 px-3 py-2 text-xs text-muted-foreground hover:text-foreground transition-colors"><LogIn className="h-3.5 w-3.5" />Lab login</button>}

          <BetaTestersModal trigger={<button className="ml-2 px-4 py-2 rounded-md bg-primary text-primary-foreground text-xs font-semibold hover:opacity-90 transition-opacity">Beta Testers</button>} />
        </nav>

        <button className="md:hidden p-2 text-muted-foreground relative z-50" onClick={() => setMobileOpen(!mobileOpen)} aria-label="Toggle navigation">
          <AnimatePresence mode="wait">{mobileOpen ? <motion.div key="close" initial={{ opacity: 0, rotate: -90 }} animate={{ opacity: 1, rotate: 0 }} exit={{ opacity: 0, rotate: 90 }}><X className="h-5 w-5" /></motion.div> : <motion.div key="menu" initial={{ opacity: 0, rotate: 90 }} animate={{ opacity: 1, rotate: 0 }} exit={{ opacity: 0, rotate: -90 }}><Menu className="h-5 w-5" /></motion.div>}</AnimatePresence>
        </button>
      </div>

      <AnimatePresence>{mobileOpen && <motion.div initial={{ opacity: 0, y: -12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }} className="md:hidden border-t border-border bg-card px-4 py-4 shadow-xl"><div className="flex flex-col">
        {links.map((link) => <a key={link.href} href={link.href} onClick={() => setMobileOpen(false)} className="py-3 text-sm font-medium text-muted-foreground hover:text-foreground">{link.label}</a>)}
        <a href="/docs" onClick={() => setMobileOpen(false)} className="py-3 text-sm font-medium text-muted-foreground hover:text-foreground flex items-center gap-2"><BookOpen className="h-4 w-4" /> Documentation</a>
        <div className="border-t border-border mt-2 pt-2">{!isLoading && (isAuthenticated && user ? <button onClick={logout} className="flex items-center gap-2 py-3 text-sm text-muted-foreground"><LogOut className="h-4 w-4" /> Log out</button> : <button onClick={login} className="flex items-center gap-2 py-3 text-sm text-muted-foreground"><LogIn className="h-4 w-4" /> Lab login</button>)}<BetaTestersModal trigger={<button className="w-full mt-2 px-4 py-3 rounded-md bg-primary text-primary-foreground text-sm font-semibold">Beta Testers</button>} /></div>
      </div></motion.div>}</AnimatePresence>
    </header>
  );
}
