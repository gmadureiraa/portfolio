import { z } from "zod";

export const newsletterSchema = z.object({
  email: z.string().email("E-mail invalido"),
});

export type NewsletterSchema = z.infer<typeof newsletterSchema>;
