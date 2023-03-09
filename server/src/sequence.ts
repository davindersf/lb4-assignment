import {config, Context, inject} from '@loopback/core';
import {
  InvokeMiddleware,
  InvokeMiddlewareOptions,
  MiddlewareSequence,
  RequestContext,
  RestBindings,
} from '@loopback/rest';
import {Logger, LogLevel} from './components/winston-logger';

export class MySequence extends MiddlewareSequence {
  constructor(
    @inject.context()
    context: Context,
    @inject(RestBindings.INVOKE_MIDDLEWARE_SERVICE)
    readonly invokeMiddleware: InvokeMiddleware,
    @config()
    readonly options: InvokeMiddlewareOptions = MiddlewareSequence.defaultOptions,
    @inject('winston-logger') private logger: Logger,
  ) {
    super(context, invokeMiddleware, options);
  }

  async handle(context: RequestContext) {
    // log request info using winston logger
    this.logger('Start time - ' + new Date().toLocaleTimeString());
    this.logger('Referer - ' + context.request.headers.referer);
    this.logger('Request IP - ' + context.request.ip);

    try {
      await super.handle(context);
    } catch (error) {
      this.logger(error?.message || error?.toString() || error, LogLevel.ERROR);
      throw error;
    }
  }
}
