import { z } from 'zod';

export const signInSchema = z.object({
  email: z.string().email(),
  password: z
    .string()
    .min(6, 'Must be at least 6 characters')
    .max(16, 'Must be 16 characters maximum'),
});
export type SignInSchemaType = z.infer<typeof signInSchema>;

const roles = ['HCP', 'PP'] as const

export const registerSchema = z
  .object({
    name: z.string().min(2, 'Must be at least 2 characters'),
    email: z.string().email(),
    password: z
      .string()
      .min(6, 'Must be at least 6 characters')
      .max(16, 'Must be 16 characters maximum'),
    cpassword: z
      .string()
      .min(6, 'Must be at least 6 characters')
      .max(16, 'Must be 16 characters maximum'),
    role: z.enum(roles),
  })
  .refine((data) => data.password === data.cpassword, {
    message: 'Passwords do not match',
    path: ['password'],
  });
export type RegisterSchemaType = z.infer<typeof registerSchema>;
