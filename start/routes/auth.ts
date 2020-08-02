import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
  Route.post('/login', 'AuthController.login')
  Route.post('/register', 'AuthController.register')
  Route.get('/user', 'UsersController.user')
}).prefix('/api/v1/auth')
