import express from 'express'
import { register, login, forgotPassword, resetPassword } from '../controllers/user.js'
import { runValidation, validationRegister } from '../utils/validation.js'
import { createMataPelajaran, showMataPelajaran, deleteMataPelajaran, editMataPelajaran } from "../controllers/mata_pelajaran"
import { createNilai, showNilai, deleteNilai, editNilai } from '../controllers/nilai.js'
import { createSoal, showSoal, deleteSoal, editSoal } from '../controllers/soal.js'
import { authenticateToken } from "../middleware/authentication"

const ayoPintar = express.Router()

ayoPintar.post('/register', validationRegister, runValidation, register)
ayoPintar.post('/login', login)
ayoPintar.put('/forgotPassword', forgotPassword)
ayoPintar.put('/resetPassword/', resetPassword)

ayoPintar.get('/mataPelajaran', authenticateToken, showMataPelajaran)
ayoPintar.post('/mataPelajaran', authenticateToken, createMataPelajaran)
ayoPintar.delete('/mataPelajaran', authenticateToken, deleteMataPelajaran)
ayoPintar.put('/mataPelajaran', authenticateToken, editMataPelajaran)

ayoPintar.get('/nilai', authenticateToken, showNilai)
ayoPintar.post('/nilai', authenticateToken, createNilai)
ayoPintar.delete('/nilai', authenticateToken, deleteNilai)
ayoPintar.put('/nilai', authenticateToken, editNilai)

ayoPintar.get('/soal', authenticateToken, showSoal)
ayoPintar.post('/soal', authenticateToken, createSoal)
ayoPintar.delete('/soal', authenticateToken, deleteSoal)
ayoPintar.put('/soal', authenticateToken, editSoal)

export default ayoPintar