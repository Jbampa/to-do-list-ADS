import { Request, Response } from 'express'
import { UsuarioService } from '../service/usuario.service'

class UsuarioController {

    async create(req: Request, res: Response) {
        const usuario = await new UsuarioService().create(req.body);
        res.status(201);
        return res.json(usuario);
    }

    async findById(req: Request, res: Response) {
        const usuario = await new UsuarioService().findById(req.params.id);
        return res.json(usuario);
    }

}

export default new UsuarioController();