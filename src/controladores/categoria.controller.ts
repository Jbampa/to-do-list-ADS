import { Request, Response } from 'express'
import { CategoriaService } from '../service/categoria.service'

class CategoriaController {

    async create(req: Request, res: Response) {
        const tarefa = await new CategoriaService().create(req.body);
        res.status(201);
        return res.json(tarefa);
    }

    async findById(req: Request, res: Response) {
        const tarefa = await new CategoriaService().findById(req.params.id)
        return res.json(tarefa)
    }

    async findAllByUsuario(req: Request, res: Response) {
        const tarefas = await new CategoriaService().findAllByUsuario(req.params.usuarioId)
        return res.json(tarefas)
    }

    async updateTarefa(req: Request, res: Response) {
        const tarefa = await new CategoriaService().updateCategoria(req.params.id, req.body)
        return res.json(tarefa)
    }

    async deleteTarefa(req: Request, res: Response) {
        const tarefa = await new CategoriaService().deleteCategoria(req.params.id)
        return res.json(tarefa)
    }

}

export default new CategoriaController()