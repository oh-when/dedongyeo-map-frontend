import base64url from 'base64url';
import { createHmac } from 'crypto';
import jwt from 'jsonwebtoken';

export function encode(content: Record<string, any>) {
  const header = {
    typ: "JWT",
    alg: "HS256"
  };
  const payload = {
    iss: "dedong.com",
    iat: Date.now(),
    exp: Date.now() + 1000 * 60 * 60 * 24 * 30,
    ...content
  };

  const encodedHeader = base64url(JSON.stringify(header));
  const encodedPayload = base64url(JSON.stringify(payload));
  const signature = createHmac('sha256', process.env.JWT_SECRET)
    .update(encodedHeader + '.' + encodedPayload)
    .digest('base64');
  
  return `${encodedHeader}.${encodedPayload}.${base64url.fromBase64(signature)}`;
};

export function decode(token: string) {
  return jwt.verify(token, process.env.JWT_SECRET, {
    algorithms: "HS256"
  });
}