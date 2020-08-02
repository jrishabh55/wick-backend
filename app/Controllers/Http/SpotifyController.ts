import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Token from 'App/Models/Token'

export default class SpotifyController {
  public async save ({ request, auth }: HttpContextContract) {
    await auth.authenticate()
    if (auth.user) {
      const $token = request.input('token')
      const search: any = { user_id: auth.user.id, type: 'spotify' }
      const newObj: any = { user_id: auth.user.id, type: 'spotify', token: $token }
      const token = await Token.updateOrCreate(search, newObj)

      return { data: token.toJSON(), status: 'ok' }
    }
  }
}
