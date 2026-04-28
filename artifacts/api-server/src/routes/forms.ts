import { Router, type IRouter, type Request, type Response } from "express";
import { z } from "zod";

const router: IRouter = Router();

const BetaTesterSchema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  products: z.array(z.string()).optional().default([]),
  expertise: z.string().optional(),
});

const RequestAccessSchema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  productName: z.string().min(1),
  org: z.string().optional(),
  usecase: z.string().optional(),
});

const ContactSchema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  subject: z.string().optional(),
  message: z.string().min(1),
});

const DeveloperAppSchema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  url: z.string().url(),
  expertise: z.string().optional(),
  about: z.string().min(1),
  available: z.boolean().optional().default(false),
});

const NotifSubSchema = z.object({
  email: z.string().email(),
});

function handleSuccess(res: Response, data: unknown) {
  console.log("[FORM SUBMISSION]", data);
  res.json({ success: true });
}

router.post("/forms/beta-tester", (req: Request, res: Response) => {
  const parsed = BetaTesterSchema.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: parsed.error.issues[0]?.message ?? "Validation error" });
    return;
  }
  handleSuccess(res, parsed.data);
});

router.post("/forms/request-access", (req: Request, res: Response) => {
  const parsed = RequestAccessSchema.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: parsed.error.issues[0]?.message ?? "Validation error" });
    return;
  }
  handleSuccess(res, parsed.data);
});

router.post("/forms/contact", (req: Request, res: Response) => {
  const parsed = ContactSchema.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: parsed.error.issues[0]?.message ?? "Validation error" });
    return;
  }
  handleSuccess(res, parsed.data);
});

router.post("/forms/developer-application", (req: Request, res: Response) => {
  const parsed = DeveloperAppSchema.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: parsed.error.issues[0]?.message ?? "Validation error" });
    return;
  }
  handleSuccess(res, parsed.data);
});

router.post("/forms/notification-subscription", (req: Request, res: Response) => {
  const parsed = NotifSubSchema.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: parsed.error.issues[0]?.message ?? "Validation error" });
    return;
  }
  handleSuccess(res, parsed.data);
});

export default router;
