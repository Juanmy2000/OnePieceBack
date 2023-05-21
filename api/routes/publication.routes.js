module.exports = (express, checkToken, Publication) => {
    const router = express.Router()

    router.get('/char', async (req, res, next) => {
      try{
        console.log('getting characters')
        const response = await Publication.getCharacters()
        res.json(response)
      }catch(e){
          res.status(400).json({ succes: false, message: e.message || e})
      }
    })

    router.get('/personaje', async (req, res, next) => {
      try{
        console.log('getting info character')
        const response = await Publication.getChar(req.query.id)
        res.json(response)
      }catch(e){
          res.status(400).json({ succes: false, message: e.message || e})
      }
    })
  
    router.get('/', async (req, res, next) => {
      try {
        console.log('getting PUBLICATIONS')
        const response = await Publication.getPublications(req.body)
        res.json(response)
      } catch(e) {
        res.status(400).json({ success: false, message: e.message || e })
      }
    })

    router.get('/publication', async (req, res, next) => {
      try {
        const response = await Publication.getPublication(req.query.id)
        res.json(response)
      } catch(e) {
        res.status(400).json({ success: false, message: e.message || e })
      }
    })

    router.get('/site', async (req, res, next) => {
      try {
        const response = await Publication.getPublicationsBySite(req.query.regionId, req.query.prefectureId)
        res.json(response)
      } catch(e) {
        res.status(400).json({ success: false, message: e.message || e })
      }
    })

    router.get('/comments', async (req, res, next) => {
      try {
        const response = await Publication.getComments(req.query.publicationId)
        res.json(response)
      } catch(e) {
        res.status(400).json({ success: false, message: e.message || e })
      }
    })

    router.post('/comment', checkToken, async (req, res, next) => {
      try {
        const response = await Publication.createComment(req.body, req.user)
        res.json(response)
      } catch(e) {
        res.status(400).json({ success: false, message: e.message || e })
      }
    })

    router.post('/favourite', checkToken, async (req, res, next) => {
      try {
        const response = await Publication.saveFavourite(req.body, req.user)
        res.json(response)
      } catch(e) {
        res.status(400).json({ success: false, message: e.message || e })
      }
    })

    router.get('/prefectures', async (req, res, next) => {
      try {
        const response = await Publication.getPrefectures(req.query.regionId)
        res.json(response)
      } catch(e) {
        res.status(400).json({ success: false, message: e.message || e })
      }
    })

    router.get('/region', async (req, res, next) => {
      try {
        const response = await Publication.getRegion(req.query.regionId)
        res.json(response)
      } catch(e) {
        res.status(400).json({ success: false, message: e.message || e })
      }
    })

    router.get('/regions', async (req, res, next) => {
      try {
        const response = await Publication.getRegions()
        res.json(response)
      } catch(e) {
        res.status(400).json({ success: false, message: e.message || e })
      }
    })
  
    router.post('/', checkToken, async (req, res, next) => {
      try {
        if (req.user && req.user.userType != 'admin') {
          res.status(401).json({ success: false, message: 'Esta acción es solo para administradores' })
        } else {
          const response = await Publication.create(req.body, req.user)
          res.json(response)
        }
      } catch(e) {
        res.status(400).json({ success: false, message: e.message || e })
      }
    })

    router.post('/delete', async (req, res, next) => {
      try {
        console.log(req.body)
        const response = await Publication.delete(req.body.id)
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