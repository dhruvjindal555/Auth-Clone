const connectToMongo = require('./DB/db')
const express = require('express')
const app = express()
const port = 8000
var cors = require('cors')

connectToMongo();
app.use(cors())
app.use(express.json())
app.use('/auth', require('../backend/Routes/auth'))

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})


