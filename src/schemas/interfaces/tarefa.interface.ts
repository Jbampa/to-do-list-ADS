import { Status } from "../enum/status"
import { CategoriaInterface } from "./categoria.interface"
import { UsuarioInterface } from "./usuario.interface"

export interface TarefaInterface {
    title: string,
    descricao: string,
    data_criacao: Date,
    data_conclusao: Date,
    tipo: string,
    categoria: CategoriaInterface,
    status: Status,
    usuarioAssociado: UsuarioInterface
}