module.exports = (express, checkToken, User) => {
  const router = express.Router()

  router.get('/', async (req, res, next) => {
    try {
      console.log('getting users')
      const response = await User.getUsers(req.body)
      res.json(response)
    } catch(e) {
      res.status(400).json({ success: false, message: e.message || e })
    }
  })

  router.get('/user', checkToken, async (req, res, next) => {
    try {
      const response = await User.getUser(req.user)
      res.json(response)
    } catch(e) {
      res.status(400).json({ success: false, message: e.message || e })
    }
  })

  router.post('/', async (req, res, next) => {
    try {
      console.log(req.body)
      const response = await User.create(req.body)
      res.json(response)
    } catch(e) {
      res.status(400).json({ success: false, message: e.message || e })
    }
  })

  router.put('/', async (req, res, next) => {
    try {
      const response = await User.modify(req.body.id, req.body.user)
      res.json(response)
    } catch(e) {
      res.status(400).json({ success: false, message: e.message || e })
    }
  })

  return router
}

// POST http://servidor/api/users
// http://servidor/api/users

/**
 * CRUD
 * GET / -> sacar una lista de todo lo que hay (puede estar paginado)
 * POST / -> agregar un elemento
 * PUT /id -> update de un elemento concreto
 * DELETE /id -> eliminar un elemento concreto
 * GET /id -> sacar un elemento concreto
 */