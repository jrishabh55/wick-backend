import querystring from 'querystring'
import Route from '@ioc:Adonis/Core/Route'

Route.get('/oauth/spotify', async (ctx) => {
  ctx.response.redirect(
    'https://accounts.spotify.com/authorize?' +
      querystring.stringify({
        response_type: 'code',
        client_id: process.env.SPOTIFY_CLIENT_ID,
        scope: 'user-read-private user-read-email',
        redirect_uri: 'http://localhost:3000/shopify/callback',
      })
  )
})
