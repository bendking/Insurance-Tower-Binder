const express = require('express')
const cors = require('cors')

const towerRouter = require('./routes/tower')

const app = express()
const port = 5000

// Cors
const whitelist = ['http://localhost:3000']
const corsOptions = {
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  }
}
app.use(cors(corsOptions))

// Middleware
app.use(express.json())

// Routes
app.use('/tower', towerRouter)

// Listen
app.listen(port, () => {
  console.log(`Listening on port ${port}`)
})