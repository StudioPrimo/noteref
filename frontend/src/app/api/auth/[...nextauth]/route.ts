import { api } from '@/utils/api';
import { Config } from '@/utils/Config';
import nextAuth from 'next-auth';
import { JWT } from 'next-auth/jwt';
import googleProvider from 'next-auth/providers/google';

const handler = nextAuth({
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    googleProvider({
      clientId: Config.CLIENT_ID ?? '',
      clientSecret: Config.CLIENT_SECRET ?? '',
    }),
  ],
  session: {
    strategy: 'jwt',
  },
  callbacks: {
    jwt: async ({ token, user }) => {
      const res = await api.post('/register', {
        email: token.email,
        name: token.name,
      });
      if (user) {
        const u = user as unknown as any;
        return {
          ...token,
          id: u.id,
        };
      }
      console.log('res', res.data);
      const newToken: JWT & { userId: string } = {
        ...token,
        userId: res.data.user_id,
      };
      console.log('newToken', newToken);
      return newToken;
    },
    session: ({ session, token }) => {
      console.log('session token', token);
      return {
        ...session,
        user: {
          ...session.user,
          id: token.userId,
        },
      };
    },
  },
});
export { handler as GET, handler as POST };
