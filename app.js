import express from 'express'
import dotenv from 'dotenv'
import { database } from './config/connection.js'
import ayoPintar from './routes/app.js'
import User from './models/user.js'

dotenv.config()
database()

const app = express()
const PORT = process.env.PORT || 5000

// try {
//     await User.sync({ force: true })
// } catch (error) {
//     console.log(`error : ${error.message}`)
// }

app.use(express.urlencoded({ extended: false }))
app.use(express.json())
app.use(ayoPintar)

app.listen(PORT, () => console.log(`Server berjalan pada port: ${PORT}`))