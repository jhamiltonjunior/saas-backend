import { Router, Request, Response } from 'express'
import { routeAdapterToAuthenticate } from '../adapters/express/routeAdapterToAuthenticate'
import { routeAdapterToRegister } from '../adapters/express/routeAdapterToRegister'
import { routeAdapterToShowUser } from '../adapters/express/routeAdapterToShow'
import { routeAdapterToDelete } from '../adapters/express/routeAdapterToDelete'
import { makeAuthUserController } from '../factories/authenticate'
import { makeDeleteUserController } from '../factories/delete'
import { makeRegisterUserController } from '../factories/register'
import { makeShowUniqueUserController } from '../factories/showUnique'
import { auth } from '../middleware/authOnly'
import { routeAdapterToUpdate } from '../adapters/express/routeAdapterToUpdate'
import { makeUpdateUserController } from '../factories/update'

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
