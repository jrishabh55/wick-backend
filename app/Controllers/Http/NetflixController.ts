import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Netflix from 'App/Models/Netflix'

export default class NetflixController {
  public async save ({ request, auth }: HttpContextContract) {
    await auth.authenticate()

    await auth.user?.preload('token')

    if (!auth.user?.token.find((tk) => tk.type === 'netflix')) {
      await auth.user?.token.client.create({
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
