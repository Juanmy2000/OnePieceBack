module.exports = (express, checkToken, Wiki) => {
    const router = express.Router()

    router.get('/'), async (req, res, next) => {
        try{
            console.log('getting characters')
            const response = await Wiki.getCharacters(req.body)
            res.json(response)
            console.log(res.json(response))
        }catch(e){
            res.status(400).json({ succes: false, message: e.message || e})
        }
    }

    return router;

}