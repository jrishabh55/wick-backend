import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
// import User from 'App/Models/User'

export default class UsersController {
  public async user ({ auth }: HttpContextContract) {
    await auth.authenticate()
    return auth.user
  }
}
