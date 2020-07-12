import { IocContract } from '@adonisjs/fold'

export default class AppProvider {
  constructor (protected $container: IocContract) {
  }

  public register () {
    // Register your own bindings
  }

  public boot () {
    // IoC container is ready
  }

  public shutdown () {
    // Cleanup, since app is going down
  }

  public async ready () {
    const App = await import('@ioc:Adonis/Core/Application')

    if (App.default.environment === 'web') {
      await import('../start/spotify')
    }
  }
}
