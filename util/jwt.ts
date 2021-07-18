import jwt from 'jsonwebtoken';

const signConfig = {
  alg: 'HS256',
};

export async function encode({ token }: { token: any }) {
  const payload = {
    iat: Math.floor(Date.now() / 1000),
    exp: Math.floor(Date.now() / 1000) + 24 * 60 * 60,
    email: token.email,
  };
  return jwt
    .sign(payload, process.env.JWT_SECRET, { algorithm: signConfig.alg })
    .then(() => jwt.sign());
}

export function decode({ token }: { token: string }) {
  return jwt.verify(token, process.env.JWT_SECRET, {
    algorithms: [signConfig.alg],
  });
}
