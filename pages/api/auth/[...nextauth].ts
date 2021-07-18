import NextAuth from 'next-auth';
import Providers from 'next-auth/providers';
import { encode, decode } from './_jwt';

export default NextAuth({
  providers: [
    Providers.Kakao({
      clientId: process.env.KAKAO_CLIENT_ID,
      clientSecret: process.env.KAKAO_CLIENT_SECRET,
    }),
  ],
  session: { jwt: true },
  jwt: {
    secret: process.env.JWT_SECRET,
    encode: async ({ token }) => encode(token),
    decode: async ({ token }) => decode(token),
  },
  callbacks: {
    async session(_, token) {
      return token;
    },
    async jwt(token) {
      let provider = 'dedong';
      if (token.picture.indexOf('kakao') > 0) {
        provider = 'kakao';
      }
      const data = {
        ...token,
        provider,
      };

      if (!(data as any).token) {
        (data as any).token = encode(data);
      }
      
      return data;
    },
  },
});
