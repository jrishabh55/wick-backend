/*
|--------------------------------------------------------------------------
| Http Exception Handler
|--------------------------------------------------------------------------
|
| AdonisJs will forward all exceptions occurred during an HTTP request to
| the following class. You can learn more about exception handling by
| reading docs.
|
| The exception handler extends a base `HttpExceptionHandler` which is not
| mandatory, however it can do lot of heavy lifting to handle the errors
| properly.
|
*/

import Logger from '@ioc:Adonis/Core/Logger'
import HttpExceptionHandler from '@ioc:Adonis/Core/HttpExceptionHandler'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class ExceptionHandler extends HttpExceptionHandler {
  constructor () {
    super(Logger)
  }

  public async handle (error: any, ctx: HttpContextContract) {
    console.log('handling exception')
    switch (ctx.request.accepts(['json'])) {
      case 'json':
        return this.handleErrorWithApi(error, ctx)
    }

    return super.handle(error, ctx)
  }

  private async handleErrorWithApi (error: any, ctx: HttpContextContract) {
    if (process.env.NODE_ENV === 'development') {
      console.log(error)
      ctx.response.status(error.status || 500).json({
        status: 'error',
        error : {
          message: error.message,
          stack: error.stack,
          code: error.code,
        },
      })
      return
    }

    ctx.response.status(error.status).json({ status: 'error', error: { message: error.message, code: error.code } })
  }
}
