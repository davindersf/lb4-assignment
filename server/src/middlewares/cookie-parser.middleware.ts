import {Middleware} from '@loopback/rest';
import cookieParser from 'cookie-parser';

export const cookieParserMiddleware: Middleware = async (context, next) => {
  cookieParser()(context.request, context.response, () => {});
  return await next()
};
