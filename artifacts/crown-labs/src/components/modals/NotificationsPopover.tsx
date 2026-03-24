import { useState } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Bell } from "lucide-react";

export function NotificationsPopover({ trigger }: { trigger: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    toast.success("Subscribed to notifications!");
    setOpen(false);
    setEmail("");
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        {trigger}
      </PopoverTrigger>
      <PopoverContent className="w-80 p-4 border-border bg-card" align="end">
        <div className="flex gap-3 items-start mb-3">
          <div className="mt-1 bg-primary/20 p-1.5 rounded-full text-primary">
            <Bell className="h-4 w-4" />
          </div>
          <div>
            <h4 className="font-semibold text-foreground text-sm">Stay updated</h4>
            <p className="text-xs text-muted-foreground mt-1">Get notified when products launch, beta opens, or portfolio updates.</p>
          </div>
        </div>
        <form onSubmit={handleSubmit} className="flex gap-2">
          <Input 
            type="email" 
            placeholder="Email address" 
            className="h-8 text-xs border-border bg-background" 
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
          />
          <Button type="submit" size="sm" className="h-8 text-xs bg-primary text-primary-foreground hover:bg-primary/90 px-3">
            Subscribe
          </Button>
        </form>
      </PopoverContent>
    </Popover>
  );
}
