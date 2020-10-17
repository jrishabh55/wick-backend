import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
  Route.get('/cards', 'CardController.cards')
}).prefix('/api/v1')
