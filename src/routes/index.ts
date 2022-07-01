import express from 'express'
import Url from '../models/model'
const router = express.Router()

router.get('/', async (req, res) => {
  try {
    const urlRecords = await Url.find()
    res.render('index', { urlRecords })
  } catch (err) {
    console.error(err)
    res.status(500).json('Server error')
  }
})

router.get('/:shortUrl', async (req, res) => {
  try {
    const urlRecord = await Url.findOne({
      shortUrl: req.params.shortUrl
    })

    if (urlRecord) res.redirect(urlRecord.fullUrl)
    else res.sendStatus(404)
  } catch (err) {
    console.error(err)
    res.status(500).json('Server error')
  }
})

export default router
