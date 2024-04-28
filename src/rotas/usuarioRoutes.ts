import { Router } from 'express';
import usuarioController from '../controladores/usuario.controller';

const usuarioRoutes = Router();

usuarioRoutes.post('/', usuarioController.create);
usuarioRoutes.get('/:id', usuarioController.findById);

export default usuarioRoutes;
