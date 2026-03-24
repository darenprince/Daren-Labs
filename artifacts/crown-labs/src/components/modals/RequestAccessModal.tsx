import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

export function RequestAccessModal({ trigger, productName }: { trigger: React.ReactNode, productName: string }) {
  const [open, setOpen] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const understand = formData.get("understand") as string;

    const newErrors: Record<string, string> = {};
    if (!name) newErrors.name = "Name is required";
    if (!email) newErrors.email = "Email is required";
    if (!understand) newErrors.understand = "You must understand this is a pre-release product";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    toast.success("Your request has been submitted. We'll be in touch.");
    setOpen(false);
    setErrors({});
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className="sm:max-w-[500px] border-border bg-card max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl">Request Access — {productName}</DialogTitle>
          <DialogDescription>
            Early access is limited. Submit your details to be considered.
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
            <div className="space-y-2">
              <Label htmlFor="org">Organization (optional)</Label>
              <Input id="org" name="org" placeholder="Company Inc." className="border-border bg-background" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="usecase">Role / Use case</Label>
              <Textarea id="usecase" name="usecase" placeholder="How do you plan to use this product?" className="border-border bg-background min-h-[80px]" />
            </div>
            <div className="flex items-start space-x-2 pt-2">
              <Checkbox id="understand" name="understand" value="yes" className="mt-1" />
              <div className="grid gap-1.5 leading-none">
                <Label htmlFor="understand" className="text-sm font-normal">I understand this is a pre-release product</Label>
                {errors.understand && <p className="text-xs text-red-500">{errors.understand}</p>}
              </div>
            </div>
          </div>
          <Button type="submit" className="w-full bg-primary text-primary-foreground hover:bg-primary/90">
            Submit request
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
