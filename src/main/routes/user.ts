import { Router, Request, Response } from 'express'
import { routeAdapterToAuthenticate } from '../adapters/express/users/routeAdapterToAuthenticate'
import { routeAdapterToRegister } from '../adapters/express/users/routeAdapterToRegister'
import { routeAdapterToShowUser } from '../adapters/express/users/routeAdapterToShow'
import { routeAdapterToDelete } from '../adapters/express/users/routeAdapterToDelete'
import { makeAuthUserController } from '../factories/users/authenticate'
import { makeDeleteUserController } from '../factories/users/delete'
import { makeRegisterUserController } from '../factories/users/register'
import { makeShowUniqueUserController } from '../factories/users/showUnique'
import { auth } from '../middleware/express/authOnly'
import { routeAdapterToUpdate } from '../adapters/express/users/routeAdapterToUpdate'
import { makeUpdateUserController } from '../factories/users/update'

export default (router: Router): void => {
  router.post('/user/register', routeAdapterToRegister(makeRegisterUserController()))
  router.post('/user/auth', routeAdapterToAuthenticate(makeAuthUserController()))

  router.get('/user/test', (req: Request, res: Response) => {
    res.json({
      message: 'Funcionando!'
    })
  })

  router.get('/user/find/:id', auth, routeAdapterToShowUser(makeShowUniqueUserController()))

  router.put('/user/edit/:id', auth, routeAdapterToUpdate(makeUpdateUserController()))

  router.delete('/user/delete/:id', auth, routeAdapterToDelete(makeDeleteUserController()))
}
