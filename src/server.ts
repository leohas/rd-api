import express from 'express'

const app = express()
const port = 1234

app.get('/', (req, res) => {
    return res.json({ status: 'ok' })
})

app.listen(port, () => {
    console.log('server is already running at localhost:' + port)
})
