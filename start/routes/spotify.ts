import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
  Route.post('/', 'SpotifyController.save')
  Route.get('/', 'SpotifyController.getMe')
  Route.get('/get-songs', 'SpotifyController.getSongs')
  Route.get('/get-playlists', 'SpotifyController.getPlaylist')
}).prefix('/api/v1/spotify')
