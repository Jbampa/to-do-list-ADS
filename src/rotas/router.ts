import { Router } from 'express';
import usuarioRoutes from './usuarioRoutes';
import tarefaRoutes from './tarefaRoutes';
import categoriaRoutes from './categoriaRoutes';

const router = Router();

router.use('/usuario', usuarioRoutes);
router.use('/tarefa', tarefaRoutes);
router.use('/categoria', categoriaRoutes);

export default router;
