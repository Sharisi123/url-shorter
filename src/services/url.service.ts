import { Request, Response } from 'express'
import Url from '../models/url.model'
import isValidHttpUrl from '../utils/isValidUrl'

export const getShortUrl = async (req: Request, res: Response) => {
  try {
    const urlRecord = await Url.findOne({
      user: req.user._id,
      shortUrl: req.params.shortUrl
    })
    if (urlRecord) res.redirect(urlRecord.fullUrl)
    else res.sendStatus(404)
  } catch (err) {
    console.error(err)
    res.status(500).json('Server error')
  }
}

export const getUserShortUrls = async (req: Request, res: Response) => {
  try {
    const urlRecords = await Url.findOne({
      user: req.user._id
    })
    if (urlRecords) res.json(urlRecords)
    else res.status(404).send('No records')
  } catch (err) {
    console.error(err)
    res.status(500).json('Server error')
  }
}

export const createShortUrl = async (req: Request, res: Response) => {
  try {
    const { fullUrl } = req.body

    if (!isValidHttpUrl(fullUrl)) {
      res.status(401).json({ msg: 'Wrong url' })
      return
    }
    let shortedUrlRecord = await Url.findOne({ fullUrl })
    if (shortedUrlRecord) {
      res.json(shortedUrlRecord)
      return
    }

    shortedUrlRecord = await Url.create({ fullUrl, user: req.user._id })
    res.json(shortedUrlRecord)
  } catch (err) {
    console.error(err)
    res.status(500).json('Server error')
  }
}
