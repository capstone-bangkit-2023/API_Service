import { Sequelize } from "sequelize";
import { db } from '../config/database.js'

const { DataTypes } = Sequelize

const Mata_Pelajaran = db.define('mata_pelajaran', {
    id_matapelajaran: {
        type: DataTypes.STRING,
        required: true,
        unique: true
    },
    mata_pelajaran: {
        type: DataTypes.STRING,
        required: true,
        unique: true,
    },
    kelas: {
        type: DataTypes.STRING,
        required: true,
    },
}, {
    freezeTableName: true
})

export default Mata_Pelajaran