import UsuarioModel from '../schemas/usuario.schema'

export class UsuarioService {
    async create(book: any) {
        const createdBook = await UsuarioModel.create(book)

        return createdBook
    }

    async findById(id: any) {
        const findedBook = await UsuarioModel.findById(id)
        return findedBook
    }
}