'use server';
import 'server-only';

import { signIn } from '@/auth';
import { signInSchema, SignInSchemaType } from '@/lib/schemas';
import { redirect } from 'next/navigation';

export async function signInAction(payload: SignInSchemaType) {
  
  const result = signInSchema.safeParse(payload);

  if (!result.success) {
    console.log(result.error.flatten())
    return { errors: result.error.flatten() };
  }

  if (result.success) {
    try {
      await signIn("credentials", result.data)
    } catch (error) {
      if (error instanceof AuthError) {
        return redirect(`${SIGNIN_ERROR_URL}?error=${error.type}`)
      }
      throw error
  }
}
