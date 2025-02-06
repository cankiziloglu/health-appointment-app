import { z } from 'zod';
import { isPossiblePhoneNumber } from 'react-phone-number-input';

export const signInSchema = z.object({
  email: z.string().email(),
  password: z
    .string()
    .min(6, 'Must be at least 6 characters')
    .max(16, 'Must be 16 characters maximum'),
});
export type SignInSchemaType = z.infer<typeof signInSchema>;

const roles = ['HCP', 'PP'] as const;

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

export const updateUserFormSchema = z.object({
  name: z.string().min(2, 'Must be at least 2 characters'),
  email: z.string().email(),
});
export type updateUserFormSchemaType = z.infer<typeof updateUserFormSchema>;

export const updateUserSchema = z.object({
  userId: z.string().cuid(),
  name: z.string().min(2, 'Must be at least 2 characters'),
  email: z.string().email(),
  emailVerified: z.boolean(),
});
export type updateUserSchemaType = z.infer<typeof updateUserSchema>;

export const changePassFormSchema = z
  .object({
    password: z
      .string()
      .min(6, 'Must be at least 6 characters')
      .max(16, 'Must be 16 characters maximum'),
    cpassword: z
      .string()
      .min(6, 'Must be at least 6 characters')
      .max(16, 'Must be 16 characters maximum'),
  })
  .refine((data) => data.password === data.cpassword, {
    message: 'Passwords do not match',
    path: ['cpassword'],
  });
export type changePassFormSchemaType = z.infer<typeof changePassFormSchema>;

export const changePassSchema = z
  .object({
    userId: z.string().cuid(),
    password: z
      .string()
      .min(6, 'Must be at least 6 characters')
      .max(16, 'Must be 16 characters maximum'),
    cpassword: z
      .string()
      .min(6, 'Must be at least 6 characters')
      .max(16, 'Must be 16 characters maximum'),
  })
  .refine((data) => data.password === data.cpassword, {
    message: 'Passwords do not match',
    path: ['cpassword'],
  });
export type changePassSchemaType = z.infer<typeof changePassSchema>;

export const createDoctorSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  firstName: z.string().min(2, 'Must be at least 2 characters'),
  lastName: z.string().min(2, 'Must be at least 2 characters'),
  email: z.string().email(),
  medicalUnit: z.string().min(1, 'Medical Unit is required'),
  phone: z
    .string()
    .nonempty('Phone number is required')
    .refine((value) => isPossiblePhoneNumber(value), {
      message: 'Invalid phone number',
    }),
  city: z.string().min(2, 'City is required'),
  address: z.string().min(2, 'Address is required'),
  district: z.string().min(2, 'District is required'),
  postalCode: z.string().optional(),
});
export type createDoctorSchemaType = z.infer<typeof createDoctorSchema>;

export const createHealthcareProviderSchema = z.object({
  name: z.string().min(2, 'Name is required'),
  email: z.string().email(),
  phone: z
    .string()
    .nonempty('Phone number is required')
    .refine((value) => isPossiblePhoneNumber(value), {
      message: 'Invalid phone number',
    }),
});
export type createHealthcareProviderSchemaType = z.infer<
  typeof createHealthcareProviderSchema
>;

export const createLocationSchema = z.object({
  city: z.string().min(2, 'City is required'),
  address: z.string().min(2, 'Address is required'),
  district: z.string().min(2, 'District is required'),
  postalCode: z.string().optional(),
});
export type createLocationSchemaType = z.infer<typeof createLocationSchema>;
