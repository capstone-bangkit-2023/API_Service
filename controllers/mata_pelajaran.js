import Mata_Pelajaran from '../models/mata_pelajaran.js'
import { utilMessage, utilError } from '../utils/message.js'

export const createMataPelajaran = async(req, res) => {
    try {
        const {
            mata_pelajaran,
            kelas,
        } = req.body
        const postmataPelajaran = await Mata_Pelajaran.create({ id_matapelajaran: null, mata_pelajaran, kelas })
        if (postmataPelajaran) return utilMessage(res, 200, 'Post Mata Pelajaran berhasil')
        return utilMessage(res, 403, 'Post mata pelajaran gagal')
    }catch (error) {
        return utilError(res, error)
    }
}

export const showMataPelajaran = async(req, res) => {
    try {
        const {
        mata_pelajaran
        } = req.body
        const cekmataPelajaran = await Mata_Pelajaran.findOne({ where: { mata_pelajaran }})
        if (!cekmataPelajaran) return utilMessage(res,400, 'mata pelajaran tidak ada')
        if (cekmataPelajaran) return res.status(200).json({
            status: true,
            kelas: Mata_Pelajaran.kelas,
            mata_pelajaran: Mata_Pelajaran.mata_pelajaran,
            message: 'Mata pelajaran berhasil ditampilkan'
        })
        return utilMessage(res, 403, 'Mata Pelajaran gagal ditampilkan')
    }catch (error) {
        return utilError(res, error)
    }
}

export const editMataPelajaran = async(req, res) => {
    try {
        const {
            mata_pelajaran,
            kelas
        } = req.body
        const cekmataPelajaran = await Mata_Pelajaran.findOne({ where: { mata_pelajaran }})
        if (!cekmataPelajaran) return utilMessage(res,400, 'mata pelajaran tidak ada')
        const editmataPelajaran = await Mata_Pelajaran.edit({mata_pelajaran: mata_pelajaran, kelas: kelas},{ where: { mata_pelajaran } })
        if (editmataPelajaran) return utilMessage(res, 200, 'Edit mata pelajaran berhasil')
        return utilMessage(res, 403, 'Editmata pelajaran gagal')
    }catch (error) {
        return utilError(res, error)
    }
}

export const deleteMataPelajaran = async(req, res) => {
    try {
        const {
        mata_pelajaran
        } = req.body
        const cekmataPelajaran = await Mata_Pelajaran.findOne({ where: { mata_pelajaran }})
        if (!cekmataPelajaran) return utilMessage(res,400, 'mata pelajaran tidak ada')
        const deletemataPelajaran = await Mata_Pelajaran.delete({ where: { mata_pelajaran } })
        if (deletemataPelajaran) return utilMessage(res, 200, 'Post mata pelajaran berhasil')
        return utilMessage(res, 403, 'Post mata pelajaran gagal')
    }catch (error) {
        return utilError(res, error)
    }
}