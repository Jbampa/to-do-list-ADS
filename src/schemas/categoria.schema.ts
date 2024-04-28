import { Schema, model } from "mongoose"

const categoria = new Schema({
    nome: String,
    cor: String,
    usuarioAssociado: { type: Schema.Types.ObjectId, ref: 'Usuario' },
}, {
    timestamps: true
})

export default model('categoria', categoria)