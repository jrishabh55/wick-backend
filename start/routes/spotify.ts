import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
  Route.post('/spotify', 'SpotifyController.save')
  Route.get('/spotify', 'SpotifyController.getMe')
}).prefix('/api/v1')
