import { z } from 'zod';

export const signInSchema = z.object({
  email: z.string().email(),
  password: z
    .string()
    .min(6, 'Must be at least 6 characters')
    .max(16, 'Must be 16 characters maximum'),
});
export type SignInSchemaType = z.infer<typeof signInSchema>;

export const registerSchema = z.object({
  name: z.string().min(2, 'Must be at least 2 characters'),
  email: z.string().email(),
  password: z
    .string()
    .min(6, 'Must be at least 6 characters')
    .max(16, 'Must be 16 characters maximum'),
  role: z.enum(['HEALTHCAREPROVIDER', 'PRIVATEPRACTITIONER']),
});
export type RegisterSchemaType = z.infer<typeof registerSchema>;
