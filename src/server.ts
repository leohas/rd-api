import express, { Request, Response } from 'express'
import cors from 'cors'
import bodyParser from 'body-parser'
import multer from 'multer'
import { checkApiKey } from './services/middlewares'

const app = express()

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(multer().single(''))

app.use(cors())
app.use(checkApiKey)

app.get('/', (req: Request, res: Response) => {
    return res.json({ status: 'ok' })
})

app.listen(1234, () => {
    console.log('server is already running at localhost:' + 1234)
})
