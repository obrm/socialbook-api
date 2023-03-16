const mongoose = require('mongoose')

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URL, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    })

    console.log(
      `MongoDB connected: ${conn.connection.host}`.green.underline.bold
    )
  } catch (err) {
    console.error(`💥💥💥 Error: ${err.message}`.red.bold)
    process.exit(1)
  }
}

module.exports = connectDB
