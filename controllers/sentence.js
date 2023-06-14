import { utilMessage, utilError, utilData } from '../utils/message.js'
import axios from 'axios'
import Nilai from '../models/nilai.js'
import Soal from '../models/soal.js'
import jwt from "jsonwebtoken"

export const getAnswer = async(req, res) => {
    try {
        const authHeader = req.headers['authorization']
        const token = authHeader && authHeader.split(' ')[1]
        if (token == null) return utilMessage(res, 401, 'Token invalid')
        jwt.verify(token, process.env.PRIVATE_KEY, (error, decoded) => {
            if (error) return utilMessage(res, 401, 'Token expired')
            req.username = decoded.userUsername
        })
        const username = req.username
        const input = req.body

        if (!Array.isArray(input)) {
          return utilMessage(res, 400, 'Invalid input format. Expecting an array.');
        }
        const jawabanUser = input.map((item) => {
          return {
            mata_pelajaran: item.mata_pelajaran,
            soal: item.soal,
            jawaban: item.jawaban,
          };
        });
        console.log(jawabanUser)
    // Mengolah data jawaban dari database
    const hasil = [];
    for (let i = 0; i < jawabanUser.length; i++) {
      const jawaban = jawabanUser[i];
      const data = await Soal.findOne({
        where: {
          mata_pelajaran: jawabanUser[i].mata_pelajaran,
          soal: jawabanUser[i].soal,
        },
      });

      if (data) {
        hasil.push({
          data: data.jawaban,
          answer: jawaban.jawaban,
        });
      }
    }
    console.log(hasil)
    const config = {
      method: 'post',
      url: 'https://api-model-sentences-t7eb73gi3q-et.a.run.app/predict',
      headers: { 
              'Authorization': `Bearer ${token}`,
                 'Content-Type': 'application/json'
               },
      data: hasil
    }
    axios(config)
      .then((response) => {
        for (let i = 0; i < hasil.length; i++) {
          const updatedNilai = Nilai.update({ nilai: response.data }, { where: { username, mata_pelajaran } })
          if (!updatedNilai) return utilMessage(res, 400, 'Nilai gagal diunggah')
          }
            return utilData(res, 200, response.data)
      })
      .catch((error) => {
      return utilError(res, error)
      })
    // axios.post('https://api-model-sentences-t7eb73gi3q-et.a.run.app/', res.json(hasil))
    // .then((response) => {
    //   for (let i = 0; i < response.length; i++) {
    //   const updatedNilai = Nilai.update({ nilai: data.nilai }, { where: { username, mata_pelajaran: mata_pelajaran } })
    //   if (!updatedNilai) return utilMessage(res, 400, 'Nilai gagal diunggah')
    //   }
    //     return utilData(res, 200, response.data)
    // })
    // .catch((error) => {
    // return utilError(res, error)
    // })
  }catch (error) {
        return utilError(res, error)
    }}