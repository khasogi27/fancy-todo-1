require('dotenv').config()
const cors = require('cors')
const express = require('express')
const routesUser = require('./routers/user')
const routes = require('./routers/index')
const app = express()
const port = process.env.PORT

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(routesUser)
app.use(routes)

app.listen(port, () => {
  console.log(`App running on port ${port}`)
})