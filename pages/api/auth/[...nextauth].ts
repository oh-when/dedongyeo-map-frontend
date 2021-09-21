import NextAuth from 'next-auth';
import Providers from 'next-auth/providers';
import { encode, decode } from './_jwt';
import { gql } from '@apollo/client';
import { initializeApollo } from '~/lib/apollo/client';

const LOG_IN = gql`
  mutation LogIn($loginInput: loginInput!) {
    login(loginInput: $loginInput) {
      accessToken
      user {
        _id
        createdAt
        email
        isAcceptTerms
        nickName
        phone
        status
        updatedAt
      }
    }
  }
`;

export default NextAuth({
  providers: [
    Providers.Kakao({
      clientId: process.env.KAKAO_CLIENT_ID,
      clientSecret: process.env.KAKAO_CLIENT_SECRET,
    }),
    Providers.Naver({
      clientId: process.env.NAVER_CLIENT_ID,
      clientSecret: process.env.NAVER_CLIENT_SECRET,
    }),
    Providers.Google({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
      authorizationUrl:
        'https://accounts.google.com/o/oauth2/v2/auth?prompt=consent&access_type=offline&response_type=code',
    }),
    Providers.Credentials({
      id: 'dedong',
      name: 'dedong',
      type: 'credentials',
      credentials: {
        email: {
          type: 'text',
          placeholder: '이메일 (example@gmail.com)',
        },
        password: {
          type: 'password',
          placeholder: '비밀번호',
        },
      },
      authorize: async (credentials) => {
        const { email, password } = credentials;
        const client = initializeApollo();

        const user = await client.mutate({
          mutation: LOG_IN,
          variables: {
            loginInput: { email, password },
          },
        });

        if (user) {
          return user;
        } else {
          return null;
        }
      },
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
      if (token.picture && token.picture.indexOf('kakao') > 0) {
        provider = 'kakao';
      } else if (token.picture && token.picture.indexOf('naver') > 0) {
        provider = 'naver';
      } else if (token.picture && token.picture.indexOf('google') > 0) {
        provider = 'google';
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
