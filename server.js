const express = require('express')
const dotenv = require('dotenv')
const helmet = require('helmet')
const morgan = require('morgan')
const colors = require('colors')
const connectDB = require('./config/db')
const userRoute = require('./routes/users')
const authRoute = require('./routes/auth')
const postsRoute = require('./routes/posts')
const { errorHandler } = require('./middleware/errorMiddleware')

dotenv.config();

const app = express()

connectDB()

app.use(express.json())
app.use(helmet())
app.use(morgan("common"))
app.use(errorHandler)

app.use("/api/users", userRoute)
app.use("/api/auth", authRoute)
app.use("/api/posts", postsRoute)

const PORT = process.env.PORT || 8800

app.listen(
  PORT,
  console.log(
    `Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold
  )
)