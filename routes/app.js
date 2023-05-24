import express from 'express'
import { register, login, forgotPassword, resetPassword } from '../controllers/user.js'
import { runValidation, validationRegister } from '../utils/validation.js'

const ayoPintar = express.Router()

ayoPintar.post('/register', validationRegister, runValidation, register)
ayoPintar.post('/login', login)
ayoPintar.put('/forgotPassword', forgotPassword)
ayoPintar.put('/resetPassword/', resetPassword)

export default ayoPintar