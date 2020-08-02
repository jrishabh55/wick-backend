// import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import querystring from 'querystring'
import Env from '@ioc:Adonis/Core/Env'

export default class ConfigsController {
  public async global () {
    const qs = querystring.stringify({
      response_type: 'code',
      client_id: process.env.SPOTIFY_CLIENT_ID,
      scope: 'user-read-private user-read-email',
      redirect_uri: `${Env.get('APP_FRONTEND')}/spotify/callback`,
    })

    return ({
      status: 'ok',
      data: {
        netflix: {
          authorizationType: 'loginCookies',
          login: 'https://www.netflix.com/in/login',
          fetchCSV: 'https://www.netflix.com/api/shakti/ve0d6d2cb/viewingactivitycsv',
        },
        spotify: {
          authorizationType: 'serverOAuthQuery',
          oAuthUrl: `https://accounts.spotify.com/authorize?${qs}`,
          successQueryParameter: 'code',
          failureQueryParameter: '',
        },
      },
    })
  }
}
