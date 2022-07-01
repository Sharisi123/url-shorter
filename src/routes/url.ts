import express from 'express'
import Url from '../models/model'
import isValidHttpUrl from '../utils/isValidUrl'

const router = express.Router()

router.get('/shortUrls', async (req, res) => {
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

router.post('/shortUrls', async (req, res) => {
  try {
    const { fullUrl } = req.body
    const urlRecords = await Url.find()

    if (!isValidHttpUrl(fullUrl)) {
      res.render('index', { msg: 'Wrong url', urlRecords })
      return
    }
    let shortedUrlRecord = await Url.findOne({ fullUrl })
    if (shortedUrlRecord) {
      res.render('index', { urlRecords, shortedUrlRecord })
      return
    }

    shortedUrlRecord = await Url.create({ fullUrl })
    res.render('index', { urlRecords, shortedUrlRecord })
  } catch (err) {
    console.error(err)
    res.status(500).json('Server error')
  }
})

export default router
