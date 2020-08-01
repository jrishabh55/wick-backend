import querystring from 'querystring'
import Route from '@ioc:Adonis/Core/Route'
import Env from '@ioc:Adonis/Core/Env'

Route.group(() => {
  Route.get('/config/global', async ({ response }) => {
    const qs = querystring.stringify({
      response_type: 'code',
      client_id: process.env.SPOTIFY_CLIENT_ID,
      scope: 'user-read-private user-read-email',
      redirect_uri: `${Env.get('APP_FRONTEND')}/spotify/callback`,
    })

    response.json({
      status: 'ok',
      data: {
        netflix: {
          authorizationType: 'loginCookies',
          login: 'https://www.netflix.com/in/login',
          fetchCSV:
          'https://www.netflix.com/api/shakti/ve0d6d2cb/viewingactivitycsv',
        },
        spotify: {
          authorizationType: 'serverOAuthQuery',
          oAuthUrl: `https://accounts.spotify.com/authorize?${qs}`,
          successQueryParameter: 'code',
          failureQueryParameter: '',
        },
      },
    })
  })
}).prefix('/api/v1')
