const express = require('express')
const routes = require('./routers')
const app = express()
const port = 3000

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(routes)

app.listen(port, () => {
  console.log(`App running on port ${port}`)
})
