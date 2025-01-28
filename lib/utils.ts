import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { Resend } from 'resend';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const resend = new Resend(process.env.RESEND_API_KEY);
