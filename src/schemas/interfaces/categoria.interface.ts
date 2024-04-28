import { ObjectId } from "mongoose";
import { UsuarioInterface } from "./usuario.interface";

export interface CategoriaInterface{
    _id:ObjectId,
    nome: string,
    cor: string,
    usuario: UsuarioInterface,
}