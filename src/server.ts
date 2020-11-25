import express from 'express'

const app = express()

app.get('/', (req, res) => {
    return res.json({ status: 'ok' })
})

app.listen(1234, () => {
    console.log('server is already running at localhost:' + 1234)
})
