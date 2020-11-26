import express, { Request, Response } from 'express'

const app = express()

app.get('/', (req: Request, res: Response) => {
    return res.json({ status: 'ok' })
})

app.listen(1234, () => {
    console.log('server is already running at localhost:' + 1234)
})
