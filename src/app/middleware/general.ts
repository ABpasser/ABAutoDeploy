import { Middleware, WebMiddleware, provide, config } from 'midway';

@provide()
export class GeneralMiddleware implements WebMiddleware {
  @config('programConfig')
  programConfig;

  resolve(): Middleware {
    return async (ctx, next) => {
      // set Global variables
      ctx.state.csrf = ctx.csrf;

      // read config
      ctx.programConfig = this.programConfig;
      await next();
    };
  }
}
