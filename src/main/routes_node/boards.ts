import { Router } from 'express'
import { adapterRouteShowBoards } from '../adapters/express/boards/routeAdapterShowUnique'
import { adapterRouteWithAuthentication } from '../adapters/express/boards/routeAdapterWithAuthentication'
import { makeCreateBoardsController } from '../factories/boards/create'
import { makeShowUniqueBoardsConstroller } from '../factories/boards/showUnique'
import { makeShowAllBoardsController } from '../factories/boards/showAll'
import { makeDeleteBoardsController } from '../factories/boards/delete'
import { makeUpdateBoardsController } from '../factories/boards/update'
import { auth } from '../middleware/express/authOnly'

export default (router: Router): void => {
  router.get('/boards', adapterRouteShowBoards(makeShowAllBoardsController()))
  router.get('/boards/find/:url', adapterRouteShowBoards(makeShowUniqueBoardsConstroller()))

  router.post('/boards/create', adapterRouteWithAuthentication(makeCreateBoardsController()))

  router.post('/boards/verify', auth, (_, res) => res.status(200).json({ message: 'ok' }))

  router.put('/boards/edit/:url', adapterRouteWithAuthentication(makeUpdateBoardsController()))

  router.delete('/boards/delete/:url', adapterRouteWithAuthentication(makeDeleteBoardsController()))
}
