import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import BaseException from 'App/Exceptions/Base'
import User from 'App/Models/User'
import { registerSchema } from 'App/Schema/user'

export default class AuthController {
  public async login ({ request, auth }: HttpContextContract) {
    const email = request.input('email')
    const password = request.input('password')

    try {
      const token = await auth.use('api').attempt(email, password)
      const connectedApps = auth?.user?.token?.map(({ type }) => type) || []

      return {
        status: 'ok',
        data: { ...token.toJSON(), user: auth?.user?.toJSON(), connectedApps },
      }
    } catch (error) {
      if (error.code === 'E_INVALID_AUTH_UID') {
        // unable to find user using email address
        throw new BaseException('Invalid email address.', 401, error.code)
      }

      if (error.code === 'E_INVALID_AUTH_PASSWORD') {
        throw new BaseException('Invalid password.', 401, error.code)
      }
    }
  }

  public async register ({ request }: HttpContextContract) {
    const validated = await request.validate({
      schema: registerSchema,
    })

    const { username, name, email, password } = validated

    try {
      const user = await User.create({ username, name, email, password })
      return { status: 'ok', data: user.toJSON() }
    } catch (error) {
      throw new BaseException('Invalid request.', 400, error.code)
    }
  }
}
