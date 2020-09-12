import { getOAuthUrl } from 'start/spotify'

// import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
export default class ConfigsController {
  public async global () {
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
          oAuthUrl: getOAuthUrl(),
          successQueryParameter: 'code',
          failureQueryParameter: '',
        },
      },
    })
  }
}
