import { z } from "zod";

export const passwordSchema = z.object({
  title: z.string().trim().min(1, "Title required"),
  password: z.string().min(4, "The password must have at least 4 characters"),
  length: z.number().min(4).max(128).optional(),
  hasUppercase: z.boolean().optional(),
  hasLowercase: z.boolean().optional(),
  hasNumbers: z.boolean().optional(),
  hasSymbols: z.boolean().optional(),
});

export type PasswordSchemaType = z.infer<typeof passwordSchema>;
