const express = require('express')
const cors = require('cors')

const towerRouter = require('./routes/tower')

const app = express()
const port = 5000

// CORS
app.use(cors({origin: 'http://localhost:3000'}))

// Middleware
app.use(express.json())

// Routes
app.use('/tower', towerRouter)

// Listen
app.listen(port, () => {
  console.log(`Listening on port ${port}`)
})