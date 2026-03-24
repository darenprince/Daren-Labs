import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

export function BetaTestersModal({ trigger }: { trigger: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;

    const newErrors: Record<string, string> = {};
    if (!name) newErrors.name = "Name is required";
    if (!email) newErrors.email = "Email is required";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    toast.success("Welcome to the Crown Labs beta program. We'll reach out with next steps.");
    setOpen(false);
    setErrors({});
  };

  const products = [
    "CrownCode Intelligence Suite", "CrownCam", "Crown SOS", 
    "Pic Detective", "AI Cherry Pie", "CrownCast", 
    "Crown WatchTower", "LumiLogix", "Presence Architect"
  ];

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className="sm:max-w-[500px] border-border bg-card max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl">Become a Beta Tester</DialogTitle>
          <DialogDescription>
            Get early access to Crown Labs products before public release.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-6 pt-4">
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Full Name *</Label>
              <Input id="name" name="name" placeholder="John Doe" className="border-border bg-background" />
              {errors.name && <p className="text-xs text-red-500">{errors.name}</p>}
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email address *</Label>
              <Input id="email" name="email" type="email" placeholder="john@example.com" className="border-border bg-background" />
              {errors.email && <p className="text-xs text-red-500">{errors.email}</p>}
            </div>
            <div className="space-y-3">
              <Label>Which products interest you?</Label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {products.map(p => (
                  <div key={p} className="flex items-center space-x-2">
                    <Checkbox id={`product-${p}`} name="products" value={p} />
                    <Label htmlFor={`product-${p}`} className="text-xs font-normal leading-tight">{p}</Label>
                  </div>
                ))}
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="expertise">Background / Expertise (optional)</Label>
              <Textarea id="expertise" name="expertise" placeholder="Tell us about your technical or industry background..." className="border-border bg-background min-h-[80px]" />
            </div>
          </div>
          <Button type="submit" className="w-full bg-primary text-primary-foreground hover:bg-primary/90">
            Join beta program
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
