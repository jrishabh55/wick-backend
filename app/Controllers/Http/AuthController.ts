import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import BaseException from 'App/Exceptions/Base'
import User from 'App/Models/User'

export default class AuthController {
  public async login ({ request, auth }: HttpContextContract) {
    const email = request.input('email')
    const password = request.input('password')

    const token = await auth.use('api').attempt(email, password)
    try {
      const token = await auth.use('api').attempt(email, password)
      return { status: 'ok', data: { ...token.toJSON() } }
    } catch (error) {
      if (error.code === 'E_INVALID_AUTH_UID') {
        // unable to find user using email address
        throw new BaseException('Invalid email address.', 401, error.code)
      }

      if (error.code === 'E_INVALID_AUTH_PASSWORD') {
        throw new BaseException('Invalid password.', 401, error.code)
      }
    }

    return { status: 'ok', data: { ...token.toJSON() } }
  }

  public async register ({ request }: HttpContextContract) {
    const email = request.input('email')
    const password = request.input('password')
    try {
      const user = await User.create({ email, password })
      return { status: 'ok', data: user.toJSON() }
    } catch (error) {
      throw new BaseException('Invalid request.', 400, error.code)
    }
  }
}
