import jwt from 'jsonwebtoken'
import User from '../models/user.js'
import { utilMessage, utilData, utilError } from '../utils/message.js'
import bcrypt from 'bcrypt'
import { kirimEmail } from '../utils/nodemailer.js'

export const register = async(req, res) => {
    try {
        const {
            username,
            password,
            confirmPassword,
            nama,
            namaSekolah = null, // optional
            email,
        } = req.body
        const dataUser = await User.findOne({ where: { username } })
        if (dataUser) return utilMessage(res, 400, 'Username sudah digunakan')
            // cek, apakah nomer tlpn valid? +62821 OK / +50? OK ATAU GAGAL?
        
        //if (cekEmail===false) return (res, 400, 'Email tidak valid')
        const dataEmail = await User.findOne({ where: { email } })
        if(dataEmail) return utilMessage(res, 400, 'Email sudah digunakan')
        const matchPassword = password === confirmPassword ? true : false
        if (!matchPassword) return utilMessage(res, 400, 'Password dan Confirm password tidak sesuai')
        const saltRound = Number(process.env.SALT_ROUND) || 10
        const hashPassword = await bcrypt.hash(password, saltRound)
        const foto = process.env.LINK_FOTO
        const postUser = await User.create({ username, password: hashPassword, nama, namaSekolah, foto, email })
        if (postUser) return utilMessage(res, 200, 'Registrasi berhasil')
        return utilMessage(res, 403, 'Registrasi gagal, Access ditolak')
    } catch (error) {
        return utilError(res, error)
    }
}

export const login = async(req, res) => {
    try {
        const { username, password } = req.body
        const dataUser = await User.findOne({ where: { username } })
        if (!dataUser) return utilMessage(res, 404, 'Username/password salah')
        const userUsername = dataUser.username
        const userPassword = dataUser.password
        const matchPassword = await bcrypt.compare(password, userPassword)
        if (!matchPassword) return utilMessage(res, 404, 'Username/password salah')
        const accessToken = jwt.sign({ userUsername }, process.env.PRIVATE_KEY, { expiresIn: '3d' })
        return utilData(res, 200, { accessToken })
    } catch (error) {
        return utilError(res, error)
    }
}

export const forgotPassword = async(req,res) => {
    try{
        const { email } = req.body
        
        const user = await User.findOne({ where: { email } })
        if(!user){
            return res.status(200).json({
                status: false,
                message: 'Email tidak tersedia'
            })
        }
        
        const token = jwt.sign({
            iduser: user._id
        }, process.env.PRIVATE_KEY)
        
        await User.update({ resetPasswordLink: token }, { where: { email } })
  
        const templateEmail = {
            from: 'Ayo Pintar',
            to: email,
            subject: 'Link Reset Password',
            html: `<p>Silahkan klik link dibawah untuk reset password </p> <p>${process.env.CLIENT_URL}/resetpassword/${token}</p>`
        }

        kirimEmail(templateEmail)

        return res.status(200).json({
            status: true,
            message: "Link reset password berhasil dikirim"
        })
    }catch(error){
        return utilError(res, error)
    }
}

export const resetPassword = async(req,res) => {
    const {token, password} = req.body

    const user = await User.findOne({resetPasswordLink: token})
    
    if(user){
        const saltRound = Number(process.env.SALT_ROUND) || 10
        const hashPassword = await bcrypt.hash(password, saltRound)
        user.password = hashPassword
        await user.save()
        return res.status(200).json({
            status: true,
            message: 'Password berhasil diganti'
        })
     }
}