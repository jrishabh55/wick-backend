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
    const { messages = {}, message, status, code, flashToSession, ...rest } = error

    const errorMessage = message.split(':')[1]?.trim() || message

    let res = {
      status: 'error',
      code,
      errors : messages.errors || [{ message: errorMessage }],
    }

    if (process.env.NODE_ENV === 'development') {
      res = { ...res, ...rest }
    }

    ctx.response.status(status || rest.statusCode || 500).json(res)
  }
}
