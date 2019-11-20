const express = require('express')
const app = express()
const employee = require('./routes/employee')

require('./startup/db')()

app.use(express.urlencoded({ extended: false }))
app.use(express.json())
app.use('/api/employee', employee)

let port = process.env.PORT || 5000
app.listen(port, () => console.log(`The app is listening on port : ${port}`))
