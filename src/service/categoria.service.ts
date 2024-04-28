import CategoriaModel from '../schemas/categoria.schema'
import { CategoriaInterface } from '../schemas/interfaces/categoria.interface';

export class CategoriaService {

    async create(categoria: CategoriaInterface) {
        const createdCategoria = await CategoriaModel.create(categoria);

        return createdCategoria;
    }

    async findById(id: any) {
        const findedCategoria = await CategoriaModel.findById(id);
        return findedCategoria;
    }

    async findAllByUsuario(usuarioId: any) {

        const categorias = await CategoriaModel.find({ usuarioAssociado: usuarioId });

        return categorias;
    }

    async updateCategoria(categoriaId: any, updateCategoria: CategoriaInterface) {
        const categoria = await CategoriaModel.updateOne({ _id: categoriaId }, updateCategoria, { new: true })
        return categoria
    }

    async deleteCategoria(categoriaId: any) {
        const categoria = await CategoriaModel.deleteOne(categoriaId)

        return categoria;
    }


}