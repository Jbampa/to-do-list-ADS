import { Router } from 'express';
import categoriaController from '../controladores/categoria.controller';

const categoriaRoutes = Router();

categoriaRoutes.post('/', categoriaController.create);
categoriaRoutes.get('/usuario/:usuarioId', categoriaController.findAllByUsuario);
categoriaRoutes.get('/:id', categoriaController.findById);
categoriaRoutes.patch('/:id', categoriaController.updateTarefa);
categoriaRoutes.delete('/:id', categoriaController.deleteTarefa);

export default categoriaRoutes;
