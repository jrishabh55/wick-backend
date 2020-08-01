import Route from '@ioc:Adonis/Core/Route'

Route.get('/config/global', async (ctx) => {
  ctx.response.json({
    netflix: {
      authorizationType: 'loginCookies',
      login: 'https://www.netflix.com/in/login',
      fetchCSV:
        'https://www.netflix.com/api/shakti/ve0d6d2cb/viewingactivitycsv',
    },
    spotify: {
      authorizationType: 'serverOAuthQuery',
      oAuthUrl: 'google.com',
      successQueryParameter: 'code',
      failureQueryParameter: '',
    },
  })
})
