import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Token from 'App/Models/Token'
import spotifyApi from '../../../start/spotify'

export default class SpotifyController {
  public async save ({ request, auth, response }: HttpContextContract) {
    await auth.authenticate()
    if (auth.user) {
      const $token = request.input('token')
      const search: any = { user_id: auth.user.id, type: 'spotify' }
      const newObj: any = { user_id: auth.user.id, type: 'spotify', token: $token }
      // const token = await Token.updateOrCreate(search, newObj)

      // spotifyApi.setAccessToken($token)

      console.log($token)

      spotifyApi.authorizationCodeGrant($token)
        .then((res) => {
          console.log(res)
          response.json(res)
        }).catch(err => {
          console.log({err})
          response.json(err)
        })

      // return { data: $token }

      // console.log(token)

      // return { data: token.toJSON(), status: 'ok' }
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
