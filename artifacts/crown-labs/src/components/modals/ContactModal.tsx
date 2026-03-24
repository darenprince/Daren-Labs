import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";

export function ContactModal({ trigger }: { trigger: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const message = formData.get("message") as string;

    const newErrors: Record<string, string> = {};
    if (!name) newErrors.name = "Name is required";
    if (!email) newErrors.email = "Email is required";
    if (!message) newErrors.message = "Message is required";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    toast.success("Message sent successfully. We'll be in touch soon.");
    setOpen(false);
    setErrors({});
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className="sm:max-w-[500px] border-border bg-card max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl">Start a conversation with the Lab.</DialogTitle>
          <DialogDescription>
            Reach out for general inquiries, partnerships, or investment.
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
              <Label>Subject</Label>
              <Select name="subject" defaultValue="general">
                <SelectTrigger className="border-border bg-background">
                  <SelectValue placeholder="Select subject" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="general">General inquiry</SelectItem>
                  <SelectItem value="partnership">Partnership</SelectItem>
                  <SelectItem value="investment">Investment</SelectItem>
                  <SelectItem value="media">Media</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="message">Message *</Label>
              <Textarea id="message" name="message" placeholder="How can we help?" className="border-border bg-background min-h-[120px]" />
              {errors.message && <p className="text-xs text-red-500">{errors.message}</p>}
            </div>
          </div>
          <Button type="submit" className="w-full bg-primary text-primary-foreground hover:bg-primary/90">
            Send message
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
