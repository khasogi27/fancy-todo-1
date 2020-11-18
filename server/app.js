require('dotenv').config()
const cors = require('cors')
const express = require('express')
const routes = require('./routers')
const errorHandler = require('./middlewares/errorHandler')
const app = express()
const port = process.env.PORT || 3000

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(routes)
app.use(errorHandler)

app.listen(port, () => {
  console.log(`App running on port ${port}`)
})