import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";

export function DeveloperApplicationModal({ trigger }: { trigger: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const url = formData.get("url") as string;
    const about = formData.get("about") as string;

    const newErrors: Record<string, string> = {};
    if (!name) newErrors.name = "Name is required";
    if (!email) newErrors.email = "Email is required";
    if (!url) newErrors.url = "Portfolio/GitHub URL is required";
    if (!about) newErrors.about = "Please tell us about yourself";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    toast.success("Application submitted successfully. We'll be in touch.");
    setOpen(false);
    setErrors({});
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className="sm:max-w-[500px] border-border bg-card max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl">Crown Labs Developer Application</DialogTitle>
          <DialogDescription>
            Join the team building applied intelligence systems.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-6 pt-4">
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Full Name *</Label>
              <Input id="name" name="name" placeholder="Ada Lovelace" className="border-border bg-background" />
              {errors.name && <p className="text-xs text-red-500">{errors.name}</p>}
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email address *</Label>
              <Input id="email" name="email" type="email" placeholder="ada@example.com" className="border-border bg-background" />
              {errors.email && <p className="text-xs text-red-500">{errors.email}</p>}
            </div>
            <div className="space-y-2">
              <Label htmlFor="url">GitHub or Portfolio URL *</Label>
              <Input id="url" name="url" placeholder="https://github.com/..." className="border-border bg-background" />
              {errors.url && <p className="text-xs text-red-500">{errors.url}</p>}
            </div>
            <div className="space-y-2">
              <Label>Primary expertise</Label>
              <Select name="expertise" defaultValue="frontend">
                <SelectTrigger className="border-border bg-background">
                  <SelectValue placeholder="Select expertise" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="ai">AI/ML</SelectItem>
                  <SelectItem value="security">Security</SelectItem>
                  <SelectItem value="frontend">Frontend</SelectItem>
                  <SelectItem value="backend">Backend</SelectItem>
                  <SelectItem value="mobile">Mobile</SelectItem>
                  <SelectItem value="forensics">Forensics</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="about">Tell us about yourself *</Label>
              <Textarea id="about" name="about" placeholder="What are you building? What drives you?" className="border-border bg-background min-h-[100px]" />
              {errors.about && <p className="text-xs text-red-500">{errors.about}</p>}
            </div>
            <div className="flex items-center space-x-2 pt-2">
              <Checkbox id="available" name="available" />
              <Label htmlFor="available" className="text-sm font-normal">I'm available for contract or full-time work</Label>
            </div>
          </div>
          <Button type="submit" className="w-full bg-primary text-primary-foreground hover:bg-primary/90">
            Submit application
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
