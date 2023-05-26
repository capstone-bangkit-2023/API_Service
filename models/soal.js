import { Sequelize } from "sequelize";
import { db } from '../config/database.js'
import Mata_Pelajaran from "./mata_pelajaran.js";
const { DataTypes } = Sequelize

const Soal = db.define('soal', {
    id_soal: {
        type: DataTypes.INTEGER,
        required: true,
        unique: true
    },
    mata_pelajaran: {
        type: DataTypes.STRING,
        required: true,
        FOREIGNKEYS: true,
        references: Mata_Pelajaran.mata_pelajaran
    },
    soal: {
        type: DataTypes.TEXT,
        required: true,
        unique: true,
    },
    jawaban: {
        type: DataTypes.TEXT,
        required: true,
    },
}, {
    freezeTableName: true
})

export default Soal