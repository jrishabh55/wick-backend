import SpotifyWebApi from 'spotify-web-api-node'
import Env from '@ioc:Adonis/Core/Env'

export const scopes: string[] = [
  'user-read-private', 'user-read-email',
]

export const spotifyApi = new SpotifyWebApi({
  clientId: Env.get('SPOTIFY_CLIENT_ID') as string,
  clientSecret: Env.get('SPOTIFY_CLIENT_SECRET') as string,
  redirectUri: `${Env.get('APP_FRONTEND')}/spotify/callback`,
})

export const getOAuthUrl = (state: string = Math.random() + '') => spotifyApi.createAuthorizeURL(scopes, state)

export default spotifyApi
