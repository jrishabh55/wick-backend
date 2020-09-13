import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import spotifyApi from 'start/spotify'
import BaseException from 'App/Exceptions/Base'
import Spotify from 'App/Models/Spotify'
import Token from 'App/Models/Token'
import User from 'App/Models/User'
import { serializePlaylists, serializeTracks } from 'App/utils'

export default class SpotifyController {
  public async save ({ request, auth }: HttpContextContract) {
    await auth.authenticate()
    if (auth.user) {
      const $token = request.input('token')
      const search: any = { user_id: auth.user.id, type: 'spotify' }
      const res = await spotifyApi.authorizationCodeGrant($token)

      if (res.statusCode !== 200) {
        throw new BaseException('Invalid Spotify auth token')
      }

      const tokenObj: any = { user_id: auth.user.id, type: 'spotify', ...res.body }
      const token = await Token.updateOrCreate(search, tokenObj)

      return { data: token.toJSON(), status: 'ok' }
    }
  }

  public async getMe ({ auth }: HttpContextContract) {
    await auth.authenticate()
    const user = auth.user as User
    await user.preload('token')
    const spotifyObj = user.token.find(tk => tk.type === 'spotify')
    if (!spotifyObj) {
      throw new Error('Spotify token doesn\'t exist')
    }
    spotifyApi.setCredentials(await spotifyObj.getCredentials())
    const spotifyProfileData = (await spotifyApi.getMe()).body as any
    const data = await Spotify.updateOrCreate({
      userId: user.id,
      spotifyId: spotifyProfileData.id,
    }, spotifyProfileData)
    return { data, status: 'ok' }
  }

  public async getSongs ({ request, auth }: HttpContextContract) {
    await auth.authenticate()
    const user = auth.user
    if (!user) {
      return
    }

    const after = request.input('after', undefined)
    const before = request.input('before', undefined)
    const playlistId = request.input('playlistId', undefined)

    await user.preload('token')

    const spotifyObj = user.token.find(tk => tk.type === 'spotify')
    if (!spotifyObj) {
      throw new BaseException('Spotify is not connected.')
    }

    spotifyApi.setCredentials(await spotifyObj.getCredentials())

    if (playlistId) {
      const data = await spotifyApi.getPlaylistTracks(playlistId)

      return { data: data.body, status: 'ok' }
    }

    const data = await spotifyApi.getMyRecentlyPlayedTracks({ before, after, limit: 50 })

    const responseData = serializeTracks(data.body)

    return { data: responseData, status: 'ok' }
  }

  public async getPlaylist ({ auth }: HttpContextContract) {
    await auth.authenticate()
    const user = auth.user
    if (!user) {
      return
    }

    await user.preload('token')

    const spotifyObj = user.token.find(tk => tk.type === 'spotify')
    if (!spotifyObj) {
      throw new BaseException('Spotify is not connected.')
    }

    spotifyApi.setCredentials(await spotifyObj.getCredentials())

    const data = await spotifyApi.getUserPlaylists()

    return { data: serializePlaylists(data.body), status: 'ok' }
  }
}
