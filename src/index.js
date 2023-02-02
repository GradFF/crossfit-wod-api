const express = require('express')
const bodyParser = require('body-parser')

const v1Router = require('./v1/routes')
const v1WorkoutRouter = require('./v1/routes/workoutRoutes')

const app = express()
const PORT = process.env.PROT || 3000

app.use(bodyParser.json())

app.get('/', (req, res) => {
  res.send("<h2>It's Working!</h2>")
})

app.use('/api/v1', v1Router)
app.use('/api/v1/workouts', v1WorkoutRouter)

app.listen(PORT, () => {
  console.log(`API  is listening on port ${PORT}`)
})
