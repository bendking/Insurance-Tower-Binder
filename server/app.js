const express = require('express')

const towerRouter = require('./routes/tower')

const app = express()
const port = 5000

// Middleware
app.use(express.json())

// Routes
app.use('/tower', towerRouter)

// Listen
app.listen(port, () => {
  console.log(`Listening on port ${port}`)
})