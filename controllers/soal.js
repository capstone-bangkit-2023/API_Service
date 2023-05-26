import Soal from '../models/soal.js'
import { utilMessage, utilError } from '../utils/message.js'

export const createSoal = async(req, res) => {
    try {
        const {
            soal,
            jawaban,
            mata_pelajaran
        } = req.body
        const postSoal = await Soal.create({ id_soal: null, soal, jawaban, mata_pelajaran })
        if (postSoal) return utilMessage(res, 200, 'Post soal berhasil')
        return utilMessage(res, 403, 'Post soal gagal')
    }catch (error) {
        return utilError(res, error)
    }
}

export const showSoal = async(req, res) => {
    try {
        const {
            soal
        } = req.body
        const cekSoal = await Soal.findOne({ where: { soal }})
        if (!cekSoal) return utilMessage(res,400, 'Soal tidak ada')
        if (cekSoal) return res.status(200).json({
            status: true,
            soal: Soal.soal,
            jawaban: Soal.jawaban,
            mata_pelajaran: Soal.mata_pelajaran,
            message: 'Soal berhasil ditampilkan'
        })
        return utilMessage(res, 403, 'Soal gagal ditampilkan')
    }catch (error) {
        return utilError(res, error)
    }
}

export const editSoal = async(req, res) => {
    try {
        const {
            soal,
            jawaban,
            mata_pelajaran
        } = req.body
        const cekSoal = await Soal.findOne({ where: { soal }})
        if (!cekSoal) return utilMessage(res,400, 'Soal tidak ada')
        const editSoal = await Soal.edit({soal: soal, jawaban: jawaban, mata_pelajaran: mata_pelajaran},{ where: { soal } })
        if (editSoal) return utilMessage(res, 200, 'Edit soal berhasil')
        return utilMessage(res, 403, 'Edit soal gagal')
    }catch (error) {
        return utilError(res, error)
    }
}

export const deleteSoal = async(req, res) => {
    try {
        const {
            soal
        } = req.body
        const cekSoal = await Soal.findOne({ where: { soal }})
        if (!cekSoal) return utilMessage(res,400, 'Soal tidak ada')
        const deleteSoal = await Soal.delete({ where: { soal } })
        if (deleteSoal) return utilMessage(res, 200, 'Post soal berhasil')
        return utilMessage(res, 403, 'Post soal gagal')
    }catch (error) {
        return utilError(res, error)
    }
}