import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
  Route.get('/config/global', 'ConfigsController.global')
}).prefix('/api/v1')
