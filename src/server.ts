import express, { Request, Response } from 'express'
import cors from 'cors'
import bodyParser from 'body-parser'
import multer from 'multer'
import { fbRef } from './services/firebase'


const app = express()

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(multer().single(''))

app.use(cors())

app.get('/', (req: Request, res: Response) => {
    return res.json({ status: 'ok' })
})

app.get('/version', (req: Request, res: Response) => {
    const version = require('../package.json').version; 
    
    res.send(`Versão atual:${version}`);
    
})
app.post('/teste', async (req: Request, res:Response) => {
    await fbRef.child('/teste').set('teste');
    return res.send('Funcionou');
})
app.listen(1234, () => {
    console.log('server is already running at localhost:' + 1234)
})
