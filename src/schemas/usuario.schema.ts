import { Schema, model } from 'mongoose'

const usuario = new Schema({
    nome: String,
    peso: Number,
    senha: String,
    email: String,
},
    {
        timestamps: true
    })

export default model('Usuario', usuario)

