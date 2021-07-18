import NextAuth from 'next-auth';
import Providers from 'next-auth/providers';
// import { encode, decode } from '~/util/jwt';

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
    signingKey: JSON.stringify({
      kty: 'oct',
      kid: '--',
      alg: 'HS256',
      k: '--',
    }),
    verificationOptions: {
      algorithms: ['HS256'],
    },
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
      return {
        ...token,
        provider,
      };
    },
  },
});
