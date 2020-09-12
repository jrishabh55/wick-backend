import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import BaseException from 'App/Exceptions/Base'
import Token from 'App/Models/Token'
import spotifyApi from '../../../start/spotify'

export default class SpotifyController {
  public async save ({ request, auth }: HttpContextContract) {
    await auth.authenticate()
    if (auth.user) {
      const $token = request.input('token')
      const search: any = { user_id: auth.user.id, type: 'spotify' }

      // spotifyApi.setAccessToken($token)

      const res = await spotifyApi.authorizationCodeGrant($token)

      if (res.statusCode !== 200) {
        throw new BaseException('Invalid Spotify auth token')
      }

      const tokenObj: any = { user_id: auth.user.id, type: 'spotify', ...res.body }
      const token = await Token.updateOrCreate(search, tokenObj)

      return { data: token.toJSON(), status: 'ok' }
    }
  }

  public async getSongs ({ auth }: HttpContextContract) {
    await auth.authenticate()
    const user = auth.user
    await user?.preload('token')
    if (user) {
      const spotifyObj = user.token.find(tk => tk.type === 'spotify')
      if (spotifyObj) {
        spotifyApi.setAccessToken(spotifyObj?.token)

        spotifyApi.refreshAccessToken()
      }
    }
  }
}
