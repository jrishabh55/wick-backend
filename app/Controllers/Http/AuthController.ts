import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User'

export default class AuthController {
  public async login ({ request, response, auth }: HttpContextContract) {
    const email = request.input('email')
    const password = request.input('password')

    const token = await auth.use('api').attempt(email, password)
    try {
      const token = await auth.use('api').attempt(email, password)
      return { status: 'ok', data: { ...token.toJSON() } }
    } catch (error) {
      if (error.code === 'E_INVALID_AUTH_UID') {
        // unable to find user using email address
        return response.status(401).json({ status: 'error', code: error.code, error: 'Invalid email address' })
      }

      if (error.code === 'E_INVALID_AUTH_PASSWORD') {
        // password mis-match
        return response.status(401).json({ status: 'error', code: error.code, error: 'Invalid password' })
      }
    }

    return { status: 'ok', data: { ...token.toJSON() } }
  }

  public async register ({ request, response }: HttpContextContract) {
    const email = request.input('email')
    const password = request.input('password')
    try {
      const user = await User.create({ email, password })
      return { status: 'ok', data: user.toJSON() }
    } catch (error) {
      return response
        .status(400)
        .json({ status: 'error', code: error.code, error: 'Invalid request', stack: error.stack })
    }
  }
}
