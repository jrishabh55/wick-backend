import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
  Route.post('/netflix', 'NetflixController.save')
  Route.get('/netflix', 'NetflixController.getHistory')
}).prefix('/api/v1')
