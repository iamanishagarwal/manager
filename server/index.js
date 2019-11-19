const express = require('express')
const app = express()

require('./startup/db')()

let port = process.env.PORT || 3000
app.listen(port, () => console.log(`The app is listening on port : ${port}`))
