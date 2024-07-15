import { api } from '@/utils/api';
import { Config } from '@/utils/Config';
import nextAuth from 'next-auth';
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
    jwt: ({ token, user }) => {
      if (user) {
        const u = user as unknown as any;
        return {
          ...token,
          id: u.id,
        };
      }
      return token;
    },
    session: ({ session, token }) => {
      const res = api.post('/register', {
        email: token.email,
        name: token.name,
      });
      console.log(res);
      return {
        ...session,
        user: {
          ...session.user,
          id: token.id,
        },
      };
    },
  },
});
export { handler as GET, handler as POST };
