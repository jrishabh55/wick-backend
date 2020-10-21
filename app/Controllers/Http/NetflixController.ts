import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Netflix from 'App/Models/Netflix'
import Token from 'App/Models/Token'

export default class NetflixController {
  public async save ({ request, auth }: HttpContextContract) {
    await auth.authenticate()

    await auth.user?.preload('token')

    if (!auth.user?.token.find((tk) => tk.type === 'netflix')) {
      await Token.create({
        userId: auth?.user?.id,
        type: 'netflix',
        accessToken: 'null',
      })
    }

    const items = request
      .post()
      .map((it: object) => ({ ...it, user_id: auth.user?.id }))

    await Netflix.createMany(items)

    return { status: 'success', data: items }
  }

  public async getHistory ({ auth }: HttpContextContract) {
    await auth.authenticate()

    const items = await Netflix.query().where({ user_id: auth.user?.id })

    return { status: 'success', data: items }
  }
}
