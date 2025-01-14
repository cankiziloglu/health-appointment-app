
import type { NextAuthConfig } from "next-auth"
import Credentials from "next-auth/providers/credentials";
import { signInSchema } from '@/lib/schemas';
import { getUserByEmail } from '@/server/data/user';
import * as bcrypt from 'bcryptjs';


export default {
  providers: [
    Credentials({
      // You can specify which fields should be submitted, by adding keys to the `credentials` object.
      // e.g. domain, username, password, 2FA token, etc.
      credentials: {
        email: {},
        password: {},
      },
      authorize: async (credentials) => {
        const result = signInSchema.safeParse(credentials);
        if (result.success) {
          const { email, password } = result.data;
          const user = await getUserByEmail(email);
          if (!user || !user.password) return null;
          const pwMatch = await bcrypt.compare(password, user.password);
          if (!pwMatch) return null;
          console.log(user)
          return user;
        }
        return null
      },
    }),
  ],
  callbacks: {
    authorized: async ({ auth }) => {
      // Logged in users are authenticated, otherwise redirect to login page
      return !!auth;
    },
  },
  pages: {
    signIn: '/signin',
  },
} satisfies NextAuthConfig