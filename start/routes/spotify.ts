import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
  Route.post('/spotify', 'SpotifyController.save')
}).prefix('/api/v1')
