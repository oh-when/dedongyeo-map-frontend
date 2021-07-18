import NextAuth from 'next-auth';
import Providers from 'next-auth/providers';
import { encode, decode } from './_jwt';

export default NextAuth({
  providers: [
    Providers.Kakao({
      clientId: process.env.KAKAO_CLIENT_ID,
      clientSecret: process.env.KAKAO_CLIENT_SECRET,
    }),
    Providers.Credentials({
      id: 'dedong',
      name: 'dedong',
      type: "credentials",
      credentials: {
        email: { type: "text", placeholder: "이메일 (example@gmail.com)" },
        password: { type: "password", placeholder: "비밀번호" }
      },
      authorize: async (credentials) => {
        // const client = initializeApollo();
        const { email, password } = credentials;
        let user = null;

        // 로그인 성공시 return user
        // client.query({ ... });
        console.log({ email, password });
        user = { email, nickname: "김재원" };

        // 로그인 실패시 return null

        return user;
      }
    })
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
      if (token.picture && token.picture.indexOf('kakao') > 0) {
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
