import {Middleware} from '@loopback/rest';
import * as jwt from 'jsonwebtoken';

export const turnCookieIntoJwt: Middleware = async (context, next) => {
  const {request} = context
  const {cookies} = request;

  if (cookies) {
    // 1. extract the cookie
    const userId = cookies['userId'];
    // 2. turn it into a jwt
    const token = jwt.sign({userId}, process.env.JWT_SECRET!);
    // 3. add it on the request as header
    request.headers.authorization = `Bearer ${token}`
  }

  const result = await next();

  return result;
};
